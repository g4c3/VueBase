<template>
  <v-app id="app" :theme="getTheme">
    <v-main>
      <AppHeader/>
      <tabs
        :tabs="tabs"
        :currentTab="currentTab"
        @onClick="handleClick"
      >        
      </tabs>
      <nav>
        <router-link to="/">{{$t("home")}}</router-link> |
        <router-link to="/about">{{$t("about")}}</router-link>
      </nav>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppHeader from '@/components/AppHeader.vue';
import Tabs from '@/components/elements/TabsWithActiveLine.vue';

export default defineComponent({
  name: 'App',
  components: {
    AppHeader, Tabs
  },
  data() {
    return {
      tabs: [
        { 
          title: this.$t("about"),
          value: 'about'
        },
        { 
          title: this.$t("home"),
          value: '/'
        }
      ],
      currentTab: 'about',
    }
  },
  methods: {
    handleClick(newTab) {
      this.currentTab = newTab;
    },
  },
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