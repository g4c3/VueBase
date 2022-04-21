<template>
    <header class="header">
        <div class="header-container">

            <h1>Podaryci za vseki</h1>
            <div>
                <button v-if="isAuthenticated" 
                    type="button" 
                    class="header-buttons" 
                    @click="logout"> 
                    {{$t("logoutBtn")}} 
                    <v-icon icon="mdi-logout" />
                </button>            
                <button v-if="!isAuthenticated" 
                    type="button" 
                    class="header-buttons" 
                    @click="login"> 
                    {{$t("loginBtn")}} 
                    <v-icon icon="mdi-login" />
                </button>
            </div>
            
        </div>
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
            this.$keycloak.login().then((success) => {
                console.log("success " + success)
            })
        }
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
        height: auto;
        line-height: 1;
        display: inline-flex;
        &-buttons {
            position: absolute;
            top:0;
            right:0;
            border: none
        }
    }
</style>