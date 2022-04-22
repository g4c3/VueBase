<template>
  <v-app id="app" :theme="getTheme">
    <v-main>
      <AppHeader/>
      <router-view/>
      <AppFooter/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';

export default defineComponent({
  name: 'App',
  components: {
    AppHeader, AppFooter
  },
  data() {
    return {}
  },
  methods: {},
  computed: {
    getTheme() {
      const theme = this.$store.getters['appManagement/getUserTheme']
      return theme;
    }
  }
})
</script>
<style lang="scss">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    display: grid;
    grid-template-rows: 1fr auto;
  }
</style>