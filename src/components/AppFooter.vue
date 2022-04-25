<template>
    <footer class="footer">
        <div class="footer-container">
            <ul class="footer-list">
                <li v-for="link in internalLinks" :key="link.name">
                    <router-link :to="{name: link.name}" v-if="link.name">{{ link.title }}</router-link>
                    <a :href="link.url" v-else-if="link.url" target="_blank">{{ link.title }}</a>
                </li>
            </ul>
            <ul class="footer-socialmedia">
                <li v-for="link in socialLinks" :key="link.name">
                    <a target="_blank" :href="link.url">
                        <img :src="require(`@/assets/icons/socialmedia/${link.name}.svg`)" :alt="`${link.name} icon`">
                    </a>
                </li>
            </ul>
        </div>
    </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'AppFooter',
    data() {
        return {
            internaLinks: [{
                    title: 'Impressum',
                    name:'Impressum',
                }],
            socialLinks: [
                {
                    name: 'linkedin',
                    url: 'https://www.linkedin.com/'
                },
                {
                    name: 'xing',
                    url: 'https://www.xing.com/'

                },
            ]
        }
    }
})
</script>

<style lang="scss" scoped>
.footer {
    color: #d2d8d8;
    background-color: #00469B;
    bottom: 0;
    position: sticky;
    a:focus {
        outline-color: #fff;
    }
    &-container {
        padding: 40px 20px;
        max-width: 1080px;
        margin: 0 auto;
    }
    &-list {
        list-style-type: none;
        li + li {
            margin-top: 20px;
        }
    }
    &-socialmedia {
        margin-top: 40px;
        display: flex;
        li {
            & + li {
                margin-left: 20px;
            }
        }
        img {
            display: block;
            width: 40px;
            height: 40px;
        }
    }
}
</style>