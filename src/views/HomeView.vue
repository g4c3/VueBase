<template>
  <div class="home">
    <img v-svg-inline class="icon" src="../assets/logo-vue.svg" alt="example svg image" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
    <WellcomeView msg="And from welcome page"/>
    <br>
    {{time}}
    <br>
    {{this.$keycloak.authenticated}} - {{'directly'}}
    <br>
    <!-- {{this.$keycloak.token}} -->
    <!-- {{isLogged}}-->
    {{isLogged}} - {{'through computed'}}
    <br>
    {{isAuthenticated}} - {{'through data'}}
    <br>
    <button type="button" @click="logOut"> {{$t("logoutBtn")}} </button>
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
    return {
      isAuthenticated: null as (boolean | null | undefined)
    }
  },
  methods:{
    logOut(){
      this.$keycloak.logout()
    },
    loadAuth(){
      this.isAuthenticated = this.$keycloak.authenticated;
    }  
  },
  computed: {
    time(): string{
      let currentTime = this.$luxeon.DateTime.now().toString()
      return currentTime
    },
    isLogged():boolean|undefined{
      return this.$keycloak.authenticated;
    }
  },
  async created(){
    this.loadAuth();
  }
});
</script>

<style scoped lang="scss">
    .icon{
      height: 20%;
      width: 20%;
    }
</style>