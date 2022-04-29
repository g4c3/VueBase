<template>
  <div class="page">
    <HorizontalPreviewer :items="items">   
    </HorizontalPreviewer>
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
    <WellcomeView msg="And from welcome page"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import HelloWorld from '@/components/HelloWorld.vue';
import WellcomeView from '../components/WellcomeView.vue';
import HorizontalPreviewer from "@/components/elements/HorizontalPreviewer.vue";
import { useDisplay } from 'vuetify'

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
      items: [...Array(13).keys()].map((i) => {
        return {i, title: `Responsive`, content: `Content`};
      }),
    }
  },
  setup () {
      const { name } = useDisplay()

      const height = computed(() => {
        // name is reactive and
        // must use .value
        switch (name.value) {
          case 'xs': return 220
          case 'sm': return 400
          case 'md': return 500
          case 'lg': return 600
          case 'xl': return 800
          case 'xxl': return 1200
          default : return 0
        }
      });

      const width = computed(() => {
        switch (name.value) {
          case 'xs': return 220
          case 'sm': return 400
          case 'md': return 500
          case 'lg': return 600
          case 'xl': return 800
          case 'xxl': return 1200
          default : return 0
        }
      })

      return { height, width }
    }
});
</script>
<style scoped>
</style>