<template>
  <div class="page">
    <HorizontalPreviewer :items="items" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
    <WellcomeView msg="And from welcome page"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import HelloWorld from '@/components/HelloWorld.vue';
import WellcomeView from '../components/WellcomeView.vue';
import HorizontalPreviewer from "@/components/elements/HorizontalPreviewer.vue";

export default defineComponent({
  name: 'HomeView',
  components: {
    HelloWorld, 
    WellcomeView,
    HorizontalPreviewer
  },
  data() {
    return {
      //mocked
      items: [...Array(12).keys()].map((i) => {
        return {i, title: `Responsive`, content: `Content`};
      }),
    }
  }
});
</script>
<style scoped>
</style>