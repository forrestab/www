// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here requires a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
	siteName: "Forrest Brown",
	plugins: [
		{
			use: "@gridsome/source-filesystem",
			options: {
				path: "content/posts/**/*.md",
				typeName: "Post",
				route: "posts/:slug",
				refs: {
					tags: {
						typeName: "Tag",
						route: "/tag/:id",
						create: true
					}
				},
				remark: {
					plugins: [
						["gridsome-plugin-remark-shiki", { theme: "nord" }]
					]
				}
			}
		},
		{
			use: "gridsome-plugin-netlify-cms",
			options: {
				configPath: "static/admin/config.yml",
				publicPath: "/admin"
			}
		}
	],
	chainWebpack: (config) => {
		const svgRule = config.module.rule('svg');

		svgRule.uses.clear();
		svgRule
			.use("vue-svg-loader")
			.loader("vue-svg-loader");
	}
}
