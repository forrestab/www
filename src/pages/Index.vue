<template>
	<Layout>
		<PostCard
			v-for="{ node } in $page.allPost.edges"
			:key="node.id"
			:post="node"
		/>
		<Pager
			:current-page="$page.allPost.pageInfo.currentPage"
			:total-pages="$page.allPost.pageInfo.totalPages"
		/>
	</Layout>
</template>

<script>
import Pager from "~/components/Pager.vue";
import PostCard from "~/components/PostCard.vue";

export default {
	components: {
		Pager,
		PostCard
	},
	metaInfo() {
		return {
			title: "Home"
		};
	}
}
</script>

<page-query>
query Home ($page: Int) {
	allPost (perPage: 5, page: $page) @paginate {
		pageInfo {
			totalPages
			currentPage
		}
		edges {
			node {
				id
				title
				date (format: "MMMM DD YYYY")
				tags {
					id
					title
					path
				}
				path
			}
		}
	}
}
</page-query>
