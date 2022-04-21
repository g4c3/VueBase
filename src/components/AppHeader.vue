<template>
    <header class="header">
        <h1 class="header-1">Podaryci za vseki</h1>
        <v-btn class="header-2"  @click="toggleTheme">toggle theme</v-btn>
        <v-btn v-if="isAuthenticated" 
            type="button" 
            class="header-3" 
            @click="logout"> 
            {{$t("logoutBtn")}} 
            <v-icon icon="mdi-logout" />
        </v-btn>            
        <v-btn v-if="!isAuthenticated" 
            type="button" 
            class="header-3" 
            @click="login"> 
            {{$t("loginBtn")}} 
            <v-icon icon="mdi-login" />
        </v-btn>
</header>
</template>


<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';

export default defineComponent({
    name: 'AppHeader',  
    data() {
        return {}
    },
    methods:{
        logout() {
            this.$store.dispatch('authorization/logout');
            this.$keycloak.logout({
                redirectUri:  `${window.location.origin}/`
            });
        },
        login() {
            this.$keycloak.login()
        },
        toggleTheme() {
            this.$store.commit('authorization/TOGGLE_THEME')
        },
    },
    computed: {
        isLoggedIn(): boolean {
            return this.isAuthenticated;
        },
        ...mapGetters('authorization', ['isAuthenticated', 'loginRole'])
    }
})
</script>


<style lang="scss" scoped>
    .header {
        background-color: #e0ae0a;
        top: 0;
        position: sticky;
        color: black;
        width: 100%;
        height: 160px;
        line-height: 1;
        display: inline-grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-template-rows: 1fr 1fr 1fr;
        grid-row-gap: 10px;
        grid-column-gap: 3px;
        padding-bottom: 10px;
        padding-top: 10px;
        grid-row: start;
        &-1 {
            grid-column:  1;
            grid-row: 1;            
            justify-self: center;
        }
        &-2 {
            grid-column: 4;
            grid-row: 3;
            justify-self: center;
        }
        &-3 {
            grid-column: 4;
            grid-row: 1;            
            justify-self: center;
        }
        &-buttons {
            position: sticky;
            top:0;
            right:0;
        }
    }
</style>