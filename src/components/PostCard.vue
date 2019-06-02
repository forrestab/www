<template>
	<article class="post-card">
		<h2 class="post-card-title">
			<g-link :to="post.path" class="post-card-link">
				{{ post.title }}
			</g-link>
		</h2>
		<PostMeta :post="post" />
	</article>
</template>

<style scoped lang="scss">
.post-card {
	margin-bottom: 2rem;

	&-title,
	&-title &-link {
		color: #303030;
	}

	&-title {
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
	props: {
		post: {
			type: Object,
			required: true
		}
	}
}
</script>
