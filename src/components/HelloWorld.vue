<template>
  <div>
    <p>{{ defaultText }}</p>
  </div>
</template>

<script lang="ts">
// import Vue from 'vue'
import App from 'App.vue'
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HelloWorld',
  extends: App,
  mounted () {
    browser.runtime.sendMessage({})
  },
  computed: {
    defaultText () {
      return browser.i18n.getMessage('extName')
    }
  }
})
</script>

<style scoped>
p {
  font-size: 20px;
}
</style>
