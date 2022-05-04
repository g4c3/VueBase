<template>
    <div class="container">
        <v-btn elevation="4" icon class="container-btn" @click.stop="prev">
            <v-icon icon="mdi-chevron-left"/>
        </v-btn>        
        <div class="container-preview" ref="preview">
            <div class="item" v-for="item in items" :key="item.i">
                <div class="card">
                    <h1>{{item.title}}</h1>
                    <h5>{{item.content}} {{item.i}}</h5>
                </div>
            </div>
        </div>
        <v-btn elevation="4" icon class="container-btn" @click.stop="next">
            <v-icon icon="mdi-chevron-right"/>
        </v-btn>
    </div>  
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useDisplay } from 'vuetify'

interface VueHorizontalData {
  left: number;
  width: number;
  scrollWidth: number;
  hasPrev: boolean;
  hasNext: boolean;
  debounceId?: number | undefined;
}

export default defineComponent({
    name: 'CardPreviewer',
    data(): VueHorizontalData {
        return {
            left: 0,
            width: 0,
            scrollWidth: 0,
            hasPrev: true,
            hasNext: true,
            debounceId: undefined,
        }
    },
    props: {
        items: {
            type: Array,
            required: true,
        },
        button: {
            type: Boolean,
            default: () => true,
        },
        buttonBetween: {
            type: Boolean,
            default: () => true
        },
    },
    methods: {
        prev(): void {
            const container = this.$refs.preview as Element;
            const scrollTo = container.scrollLeft - container.clientWidth;   
            container.scrollTo({ left: scrollTo, behavior: "smooth" });
        },
        next(): void {
            const container = this.$refs.preview as Element;
            const scrollTo = container.scrollLeft + container.clientWidth;             
            container.scrollTo({ left: scrollTo, behavior: "smooth" });
        }
    },
    computed: {
        itemsCount() {
            const { name } = useDisplay()

            const height = () => {
                // name is reactive and
                // must use .value
                switch (name.value) {
                    case 'xs': return 220
                    case 'sm': return 400
                    case 'md': return 500
                    case 'lg': return 600
                    case 'xl': return 800
                    case 'xxl': return 1200
                    default : return 0
                }
            }

            return height;
        }
    }
})
</script>

<style lang="scss" scoped>
    .container {
        --count: 1;
        --btnContainer: 64px;
        --itemsContainer: calc(100% - 2 * var(--btnContainer));
        
        position: relative;
        display: grid;
        width: 100%;
        grid-template-columns: var(--btnContainer) var(--itemsContainer) var(--btnContainer);

        &-btn {
            position: relative;
            margin: auto;
        }

        &-preview {
            position: relative;
            display: flex;
            box-sizing: content-box;
            overflow-x: scroll;
            overflow-y: hidden;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
        }
        &-preview > * {
            flex-shrink: 0;
            box-sizing: border-box;
            min-height: 1px;
        }
        &-preview:not(.container-preview-scroll) {
            scrollbar-width: none;
            -ms-overflow-style: none;
            clip-path: inset(0 0 0 0);
        }
        //hides the scrollbar 
        &-preview:not(.container-preview-scroll)::-webkit-scrollbar {
            width: 0 !important;
            height: 0 !important;
        }
    }

    @media (max-width: 480px){
        .container {
            --count: 1;
        }
    }
    @media (min-width: 640px) {
        .container {
            --count: 2;
        }
    }
    @media (min-width: 768px) {
        .container {
            --count: 3;
        }
    }
    @media (min-width: 1024px) {
        .container {
            --count: 4;
        }
    }
    @media (min-width: 1280px) {
        .container {
            --count: 6;
        }
    }

    .item { 
        width: calc(100%  / var(--count));
    }
</style>