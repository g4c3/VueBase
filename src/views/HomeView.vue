<template>
  <div class="home">
    <img v-svg-inline class="icon" src="../assets/logo-vue.svg" alt="example svg image" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
    <WellcomeView msg="And from welcome page"/>
    <br>
    {{time}}
    <br>
    <!-- {{this.keycloak.kcInstance().authenticated}} -->
    <!-- {{this.keycloak.keycloak}} -->
    <button type="button" @click="logout"> {{ $t("logoutBtn") }} </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HelloWorld from '@/components/HelloWorld.vue';
import WellcomeView from '../components/WellcomeView.vue';
// import keycloak from '@/modules/keycloak/keycloak';
// import { IKeycloak, keycloakObject } from '@/services/keycloak'

export default defineComponent({
  name: 'HomeView',
  components: {
    HelloWorld, WellcomeView
  },
  data() {
    return {
      // keycloak: keycloakObject() as IKeycloak
    }
  },
  methods:{
    logout(){
      // this.keycloak!.kcInstance.logout()
      
    }
  },
  computed: {
    time(): string {
      let currentTime = this.$luxeon.DateTime.now().toString()
      return currentTime
    }
  },
});
</script>

<style scoped lang="scss">
    .icon{
      height: 20%;
      width: 20%;
    }
</style>