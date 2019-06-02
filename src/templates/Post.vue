<template>
	<Layout>
		<article class="post">
			<h1 class="post-title">{{ $page.post.title }}</h1>
			<PostMeta :post="$page.post" />
			<div v-html="$page.post.content"></div>
		</article>
	</Layout>
</template>

<style scoped lang="scss">
.post {
	margin-bottom: 2rem;

	&-title {
		color: #303030;
		margin-top: 0;
	}
}
</style>

<script>
import PostMeta from "~/components/PostMeta.vue";

export default {
	components: {
		PostMeta
	},
	metaInfo() {
		return {
			title: this.$page.post.title
		};
	}
};
</script>

<page-query>
query Post ($path: String!) {
	post (path: $path) {
		title
		date (format: "MMMM D YYYY")
		tags {
			id
			title
			path
		}
		timeToRead
		credit
		content
	}
}
</page-query>
