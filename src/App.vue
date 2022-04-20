<template>
  <v-app id="app">
    <v-main>
      <AppHeader/>
      <nav>
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
      </nav>
      <router-view/>
      <!-- <HelloWorld/> -->
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// import HelloWorld from './components/HelloWorld.vue'
import AppHeader from '@/components/AppHeader.vue';

export default defineComponent({
  name: 'App',

  components: {
    AppHeader       // HelloWorld, 
  },

  data () {
    return {
      //
    }
  },
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