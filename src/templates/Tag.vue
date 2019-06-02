<template>
	<Layout>
		<h1 class="tag-title"># {{ $page.tag.title }}</h1>

		<div class="tag-posts">
			<PostCard
				v-for="{ node } in $page.tag.belongsTo.edges"
				:key="node.id"
				:post="node"
			/>
		</div>
	</Layout>
</template>

<style scoped lang="scss">
.tag {

	&-title {
		color: #303030;
		margin-bottom: 2rem;
	}
}
</style>

<script>
import PostCard from "~/components/PostCard.vue";

export default {
	components: {
		PostCard
	}
}
</script>

<page-query>
query Tag($id: String!) {
	tag(id: $id) {
		title
		belongsTo {
			edges {
				node {
					... on Post {
						id
						title
						path
						date (format: "MMMM DD YYYY")
						timeToRead
					}
				}
			}
		}
	}
}
</page-query>
