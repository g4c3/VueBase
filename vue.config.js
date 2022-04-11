const { defineConfig } = require('@vue/cli-service')
const mix = require('laravel-mix');

module.exports = defineConfig({
  publicPath: process.env.VUE_APP_BASE_URL,
  transpileDependencies: true
})

mix.webpackConfig(webpack => { return {
  plugins: [new webpack.DefinePlugin({ '__VUE_OPTIONS_API__': 'true', '__VUE_PROD_DEVTOOLS__': 'false' })],
}});