<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
    <WellcomeView msg="And from welcome page"/>
    <tabs
      :tabs="tabs"
      :currentTab="currentTab"
      @onClick="handleClick"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HelloWorld from '@/components/HelloWorld.vue';
import WellcomeView from '../components/WellcomeView.vue';
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
  name: 'HomeView',
  components: {
    HelloWorld, WellcomeView, Tabs
  },
  data() {
    return {
      tabs: TABS,
      currentTab: 'tab1',
    }
  },
  methods: {
    handleClick(newTab) {
      this.currentTab = newTab;
    },
  },
  computed: {
  },
});
</script>