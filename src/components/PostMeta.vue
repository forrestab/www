<template>
	<div class="post-meta">
		<time>{{ post.date }}</time>
		<template v-if="post.timeToRead">
			<span>&#8226;</span>
			<span>{{ post.timeToRead }} min</span>
		</template>
		<template v-if="post.credit">
			<span>&#8226;</span>
			<a :href="post.credit">credit</a>
		</template>
		<template v-if="post.tags && post.tags.length > 0">
			<span>&#8226;</span>
			<PostTags :values="post.tags" />
		</template>
	</div>
</template>

<style scoped lang="scss">
.post-meta {
	color: #9a9a9a;
	display: flex;
	flex-flow: row nowrap;
	margin-bottom: 1rem;

	& > *:not(:last-child) {
		margin-right: (1rem / 2);
	}
}
</style>

<script>
import PostTags from "~/components/PostTags.vue";

export default {
	components: {
		PostTags
	},
	props: {
		post: Object
	}
}
</script>
