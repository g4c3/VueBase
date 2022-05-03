<template>
  <v-app id="app" :theme="getTheme">
    <AppHeader/>
    <v-main>      
      <router-view/>      
    </v-main>
    <AppFooter/>
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
    return {
    }
  },
  methods: {},
  computed: {
    getTheme() {
      const theme = this.$store.getters['appManagement/getUserTheme']
      return theme;
    }
  },
})
</script>
<style lang="scss">

  #app {
    min-height: 100vh;
    max-width: 100vw;
    margin: 0;
    display: grid;
    grid-template-rows: 1fr auto;
    
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  // .page {
  //   &-container {
  //     position: relative;
  //     padding: 40px 20px 100px;
  //     max-width: 100vw;
  //     margin: 0 auto;

  //     h2 {
  //         margin-top: 1.5rem;
  //     }

  //     // &-inner {
  //     //     max-width: $layout-size-inner;
  //     // }
  //   }
  // }
</style>