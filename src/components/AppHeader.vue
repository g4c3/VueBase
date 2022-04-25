<template>
    <header class="header">
        <div class="header-1">  
            <h2>{{$t("gifts")}}</h2>          
            <v-icon icon="$giftIcon" />
        </div>
        <v-btn class="header-2"  
            @click="toggleTheme">
            {{$t("toggleTheme")}}
            <v-icon icon="$theme" />
        </v-btn>
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
        <tabs class="header-4"
            :tabs="tabs"
            :currentTab="currentTab"
            @onClick="handleClick"
        />
    </header>
</template>


<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import Tabs from '@/components/elements/TabsWithActiveLine.vue';

export default defineComponent({
    name: 'AppHeader',
    components: {
        Tabs
    },
    data() {
        return {
        tabs: [{ 
            title: this.$t("home"),
            value: '/'
        },
        { 
            title: this.$t("about"),
            value: 'about'
        }],
        currentTab: 'home',
        }
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
            this.$store.commit('appManagement/TOGGLE_THEME')
        },
        handleClick(newTab) {
            this.currentTab = newTab;
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
        background-color: transparentize(#e0ae0a, $amount: .2);
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
        &-4 {
            grid-row: 4;
            grid-column: 1 / -1;          
            justify-self: center;
        }
    }
</style>