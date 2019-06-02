<template>
	<Layout>
		<h1 class="tags-title">Tags</h1>

		<ul class="tags">
			<li v-for="{ node } in $page.allTag.edges" :key="node.id" class="tag">
				<g-link :to="node.path" class="tag-link">
					{{ node.title }}
				</g-link>
			</li>
		</ul>
	</Layout>
</template>

<style scoped lang="scss">
.tags {
	list-style: none;
	margin: 0;
	padding: 0;

	&-title {
		margin-bottom: 2rem;
	}
}

@media(min-width: 38em) {

	.tags {
		column-count: 2;
	}
}
</style>

<page-query>
query Tags {
	allTag {
		edges {
			node {
				id
				title
				path
			}
		}
	}
}
</page-query>
