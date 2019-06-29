---
title: Adding a dockerfile stage for all environments
date: 2019-06-29T03:13:00.000Z
tags:
  - docker
  - visual-studio
credit: ''
---
I recently needed to add a certificate copy stage to the Visual Studio generated Dockerfile and I thought it would be simple, just add the stage and I was done. But what I found out was the newly added stage never fired when building the project in debug. This has to do with Visual Studio using additional "global" yaml files when it executes the `docker-compose` command. Below we will walk through adding a stage and making sure it fires when building in debug.

## Adding a new stage

Using the certificate copy stage from above as an example, I want to make sure this stage fires just after the base stage. So I'll use the `base` stage as a starting point:

```dockerfile
FROM base AS cert
COPY ./*.crt /usr/local/share/ca-certificates/
RUN update-ca-certificates
```

The `cert` stage above just copies all *.crt files in the current directory to the specific certificate directory for linux and then executes the `update-ca-certificates` command to register them.

Now we should be able to run the project in debug and see our new stage included. But what actually happens is the build stops at the `base` stage. Why is that? 

```shell
docker-compose  -f "<solution path>\docker-compose.yml" -f "<solution path>\docker-compose.override.yml" -f "<solution path>\obj\Docker\docker-compose.vs.debug.g.yml" -p dockercompose4193079649979835183 --no-ansi up -d
```

If we look close at the command above we'll see Visual Studio includes a global override file, _docker-compose.vs.debug.g.yml_, in addition to the project's files. This global override file contains configuration such as volume mounts, environment variables, etc required for debugging in the container. But there is a very specific entry that stops Docker from including our `cert` stage:

```yaml
build:
  target: base
```

The [`target`](https://docs.docker.com/compose/compose-file/#target) entry, tells `docker-compose` to stop at the configured stage. So now that we figured out the problem, how do we solve it?

## Including the `cert` stage in debug

Essentially our solution will be to override the global override file. The way we do this is by creating a _docker-compose.vs.debug.yml_ file with the following content:

```yaml
version: '3.4'

services:
  <project name>:
    build:
      target: cert
```

And we will want to include this file in our docker project by editing the _docker-compose.dcproj_ file.

```xml
<Project ...>
    <ItemGroup>
        <None Include="docker-compose.vs.debug.yml">
            <DependentUpon>docker-compose.yml</DependentUpon>
        </None>
    </ItemGroup>
</Project>
```

So now that we've created our new override file specifically targeting our new `cert` stage and told the docker project where to find it, our new stage should be included in the build. If we look at the `docker-compose` command again, we should see our new file included at the end and our `cert` stage included in the Docker output window.

```shell
docker-compose  -f "<solution path>\docker-compose.yml" -f "<solution path>\docker-compose.override.yml" -f "<solution path>\obj\Docker\docker-compose.vs.debug.g.yml" -f "<solution path>\docker-compose.vs.debug.yml" -p dockercompose4193079649979835183 --no-ansi up -d
```
