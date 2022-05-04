const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  publicPath: process.env.VUE_APP_BASE_URL,
  lintOnSave: true,
  transpileDependencies: true,

  configureWebpack: {
    entry: "./src/main.ts",
    experiments: {
      outputModule: true,
      topLevelAwait: true
    },
    optimization: {
      splitChunks: false,
    },
    output: {
      library: {
        type: "module",
      },
    }
  },

  pluginOptions: {
    vuetify: {
			// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
		}
  }
})
