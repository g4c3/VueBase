<template>
  <div class="home">
    <!-- <img v-svg-inline class="icon" src="../assets/logo-vue.svg" alt="example svg image" /> -->
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
    <WellcomeView msg="And from welcome page"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HelloWorld from '@/components/HelloWorld.vue';
import WellcomeView from '../components/WellcomeView.vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    HelloWorld, WellcomeView
  },
  data() {
    return {}
  },
  methods:{
  },
  computed: {
  },
});
</script>

<style scoped lang="scss">
    .icon{
      height: 20%;
      width: 20%;
    }
</style>