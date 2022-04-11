const { defineConfig } = require('@vue/cli-service')
const mix = require('laravel-mix');

module.exports = defineConfig({
  publicPath: process.env.VUE_APP_BASE_URL,
  lintOnSave: true,
  transpileDependencies: true,
  // configureWebpack: {
    // configureWebpack: config => {
    //   config.entry = '@/wrapper/main.js'
    //   config.pluginOptions =
    // },
  
    devtool: 'source-map',
    pluginOptions: {
      browserExtension: {
        components: {
          background: true,
          contentScripts: true
        },
        componentOptions: {
          background: {
            entry: './src/assets/background.js'
          },
          contentScripts: {
            entries: {
              'content-script': [
                  './src/assets/contents.js'
              ]
            }
          }
        }
      }
    }
  // },
  
})

mix.webpackConfig(webpack => { return {
  plugins: [new webpack.DefinePlugin({ '__VUE_OPTIONS_API__': 'true', '__VUE_PROD_DEVTOOLS__': 'false' })],
}});