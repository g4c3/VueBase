<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <img v-svg-inline class="icon" src="../assets/logo.svg" alt="example svg image" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
    <button type="button" @click="logOut">
    Block Button
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

export default defineComponent({
  name: 'HomeView',
  components: {
    HelloWorld,
  },
  methods:{
    logOut(){
      console.log(this.$keycloak)
      this.$keycloak.logout()
    }
  }

});
</script>
