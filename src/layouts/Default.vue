<template>
	<div class="box">
		<header class="masthead grid">
			<nav class="masthead-nav">
				<h3 class="masthead-title">
					<g-link to="/" class="masthead-link">FB.</g-link>
				</h3>
				<g-link to="/tags">Tags</g-link>
			</nav>
		</header>

		<main class="content grid">
			<slot />
		</main>

		<footer class="footer grid">
			<p>&copy; {{ getYear }} {{ $static.metaData.siteName }}</p>
		</footer>
	</div>
</template>

<style lang="scss" scoped>
@import "~/assets/scss/_grid.scss";

.box {
	display: flex;
	flex-flow: column nowrap;
	height: 100%;

	& .content {
		margin-bottom: auto;
	}
}

.masthead {
	border-bottom: 1px solid #eee;
	margin-bottom: 3rem;
	padding-bottom: 1rem;
	padding-top: 1rem;

	&-nav {
		align-items: baseline;
		display: flex;
	}

	&-title {
		color: #505050;
		margin-bottom: 0;
		margin-right: auto;
		margin-top: 0;
	}

	&-link {
		color: #505050;
	}

	&-tagline {
		color: #c0c0c0;
		font-size: 75%;
		font-weight: 400;
		margin-left: (1rem / 2);
	}
}

.footer {
	margin-top: 3rem;
}
</style>

<script>
export default {
	computed: {
		getYear() {
			return new Date().getFullYear();
		}
	}
}
</script>

<static-query>
query {
	metaData {
		siteName
	}
}
</static-query>
