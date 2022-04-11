const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  publicPath: process.env.VUE_APP_BASE_URL,
  lintOnSave: true,
  transpileDependencies: true,
  pages: {},

  pluginOptions: {
    browserExtension: {
      components: {
        background: true,
        contentScripts: true
      },
      componentOptions: {
        background: {
          entry: 'src/background.ts'
        },
        contentScripts: {
          entries: {
            'content-script': [
              'src/content-scripts/content-script.ts'
            ]
          }
        }
      }
    }
  }
})
