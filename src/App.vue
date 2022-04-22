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


const TABS = [{
  title: 'Tab 1',
  value: 'tab1',
}, {
  title: 'Tab 2',
  value: 'tab2',
}, {
  title: 'Tab 3',
  value: 'tab3',
}];

export default defineComponent({
  name: 'App',
  components: {
    AppHeader, Tabs
  },
  data() {
    return {
      tabs: TABS,
      // tabs: [
      //   { 
      //     title: this.$t("about"),
      //     value: 'tab1'
      //   },
      // ],
      currentTab: 'tab1',
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