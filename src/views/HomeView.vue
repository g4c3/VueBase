<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <img v-svg-inline class="icon" src="../assets/logo.svg" alt="example svg image" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
    {{time}}
    <button type="button" @click="logOut"> Logout Button </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HelloWorld from '@/components/HelloWorld.vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    HelloWorld,
  },
  methods:{
    logOut(){
      this.$keycloak.logout()
    }    
  },
  computed: {
    time(): string{
      let currentTime = this.$lx.DateTime.now().toString()
      return currentTime
    }
  }
});
</script>