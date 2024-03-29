<template>
    <header class="header">
        <div class="header-container" :class="{'header-admin' : isAdmin}">
            <div class="header-container-1">  
                <!-- <h2>{{$t("gifts")}}</h2>           -->
                <v-icon icon="$giftIcon" />
            </div>
            <v-btn class="header-container-2"  
                @click="toggleTheme">
                <!-- {{$t("toggleTheme")}} -->
                <v-icon icon="$theme" />
            </v-btn>
            <v-btn v-if="isAuthenticated" 
                type="button" 
                class="header-container-3" 
                @click="logOut"> 
                <!-- {{$t("logoutBtn")}}  -->
                <v-icon icon="mdi-logout" />
            </v-btn>            
            <v-btn v-if="!isAuthenticated" 
                type="button" 
                class="header-container-3" 
                @click="login"> 
                <!-- {{$t("loginBtn")}}  -->
                <v-icon icon="mdi-login" />
            </v-btn>
            <tabs class="header-container-4" :tabs="tabs" />
            <div v-if="isAdmin" class="header-admin-container">{{isAdmin}}</div>
        </div>        
    </header>
</template>


<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import Tabs from '@/components/elements/TabsWithActiveLine.vue';
import { Role } from '@/roles/roles';

export default defineComponent({
    name: 'AppHeader',
    components: {
        Tabs
    },
    data() {
        return {
            tabs: [
                { 
                    title: this.$t("home"),
                    value: '/'
                },
                { 
                    title: this.$t("about"),
                    value: '/about'
                },
            ]
        }
    },
    methods:{
        logOut() {
            this.logout();
            this.$keycloak.logout({
                redirectUri:  `${window.location.origin}/`
            });
        },
        login() {
            this.$keycloak.login()
        },
        toggleTheme() {
            this.TOGGLE_THEME();
        },
        ...mapMutations('appManagement', ['TOGGLE_THEME']),
        ...mapActions('authorization', ['logout'])
    },
    computed: {
        isLoggedIn(): boolean {
            return this.isAuthenticated;
        },
        isAdmin(): boolean {
            const roles = this.getRole;
            return this.$_.includes(roles, Role.AdminUser);
        },
        ...mapGetters('authorization', ['isAuthenticated', 'getRole'])
    }
})
</script>

<style lang="scss" scoped>
    .header {
        top: 0;
        position: sticky;
        width: 100%;
        height: auto;
        z-index: 2;
        background: linear-gradient(white, white);

        &-container {
            background-color: transparentize(#4285f4, $amount: .2);
            width: inherit;
            height: inherit;
            color: black;
            line-height: 1;
            display: inline-grid;
            grid-template-columns: 1fr 1fr 1fr 1fr;
            grid-template-rows: 1fr 1fr;
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
                grid-row: 2;
                justify-self: center;
            }
            &-3 {
                grid-column: 4;
                grid-row: 1;            
                justify-self: center;
            }
            &-4 {
                grid-column: 1 / -1;
                grid-row: 2;          
                justify-self: center;
            }
        }   
        &-admin {
            grid-template-rows: 1fr 1fr 1fr;
            padding-bottom: 0;
            &-container {
                background-color: #e0ae0a; 
                grid-row: 3;
                grid-column: span 4;
            }
        }     
    }
</style>