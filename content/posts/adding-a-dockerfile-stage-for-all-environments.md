---
title: Adding a dockerfile stage for all environments
date: 2019-06-04T23:45:16.857Z
tags:
  - docker
  - visual-studio
credit: ''
---
I recently needed to add a certificate copy stage to the Visual Studio generated Dockerfile and I thought it would be simple, just add the stage and I was done. But what I found out was the newly added stage never fired when building the project in debug. This has to do with Visual Studio using additional "global" yaml files when it executes the docker-compose command. Below we will walk through adding a stage and making sure it fires when building in debug.

## Adding the stage

Using the certificate copy stage from above as an example, I want to make sure this stage fires just after the base stage. So I want to make sure that this stage starts from the base stage:

```
FROM base AS cert
COPY ./*.crt /usr/local/share/ca-certificates/
RUN update-ca-certificates
```

The cert stage above just copies all *.crt files in the current directory to the specific certificate directory for linux and then executes the update-ca-certificates command to register them.
