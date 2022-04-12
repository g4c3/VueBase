const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  publicPath: process.env.VUE_APP_BASE_URL,
  lintOnSave: true,
  transpileDependencies: true,
  configureWebpack: {
    entry: "./src/main.ts",
    experiments: {
      outputModule: true,
    },
    optimization: {
      splitChunks: false,
    },
    output: {
      library: {
        type: "module",
      },
    },
  }
})
