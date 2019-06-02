<template>
	<ul class="tags">
		<li v-for="(tag, index) in values" :key="tag.id">
			<g-link :to="tag.path">
				{{ tag.title }}<span v-if="showComma(index)">,</span>
			</g-link>
		</li>
	</ul>
</template>

<style scoped lang="scss">
.tags {
	display: flex;
	flex-flow: row nowrap;
	list-style: none;
	margin: 0;
	padding: 0;

	& > *:not(:last-child) {
		margin-right: (1rem / 2);
	}
}
</style>

<script>
export default {
	props: {
		values: Array
	},
	methods: {
		showComma(index) {
			return this.values.length > 1 && index < this.values.length - 1;
		}
	}
}
</script>
