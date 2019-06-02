<template>
	<nav class="pagination" role="navigation" aria-label="pagination">
		<a
			:href="previousPage(currentPage)"
			class="pagination-previous"
			v-if="currentPage > 1">{{ previousLabel }}</a>
		<span
			class="pagination-previous pagination-disabled"
			v-else>{{ previousLabel }}</span>

		<span class="pagination-position">{{ currentPage }} of {{ totalPages }}</span>

		<a
			:href="nextPage(currentPage)"
			class="pagination-next"
			v-if="currentPage < totalPages">{{ nextLabel }}</a>
		<span
			class="pagination-next pagination-disabled"
			v-else>{{ nextLabel }}</span>
	</nav>
</template>

<style scoped lang="scss">
.pagination {

	&-disabled,
	&-position {
		color: #9a9a9a;
	}

	&-position {
		margin: 1rem;
	}
}
</style>

<script>
export default {
	props: {
		baseUrl: {
			type: String,
			default: ""
		},
		currentPage: Number,
		totalPages: Number
	},
	data() {
		return {
			previousLabel: "Previous",
			nextLabel: "Next"
		};
	},
	methods: {
		previousPage(currentPage) {
			return currentPage === 2 ?
				`${this.baseUrl}/` : `${this.baseUrl}/${this.currentPage - 1}`;
		},
		nextPage(currentPage) {
			return `${this.baseUrl}/${currentPage + 1}`;
		}
	}
}
</script>
