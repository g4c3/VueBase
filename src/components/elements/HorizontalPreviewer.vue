<template>
    <div class="container">
        <v-btn             
            elevation="4" 
            icon 
            class="container-btn container-btn-left"
            :class="{'inactive': !hasPrev}"
            @click.stop="prev">
            <v-icon icon="mdi-chevron-left"/>
        </v-btn>        
        <div class="container-preview" ref="preview">
            <div class="item justify-center ma-4" v-for="item in items" :key="item.i">
                <v-card  
                    elevation="4">
                    <v-img
                        height="200"
                        src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
                    ></v-img>
                    <v-card-title>{{item.title}}</v-card-title>
                    <v-card-text>{{item.content}} {{item.i}}</v-card-text>
                </v-card>
            </div>
        </div>
        <v-btn 
            elevation="4" 
            icon 
            class="container-btn container-btn-right" 
            :class="{'inactive': !hasNext}"
            @click.stop="next">
            <v-icon icon="mdi-chevron-right"/>
        </v-btn>
    </div>  
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { VueHorizontalData } from '@/interfaces/intefaces';

const delta = 2.5
export default defineComponent({
    name: 'CardPreviewer',
    data(): VueHorizontalData {
        return {
            left: 0,
            width: 0,
            scrollWidth: 0,
            scrollCompleted: true,
            hasPrev: false,
            hasNext: true,
            firstVisibleEl: 0
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
            //error 'ScrollToOptions' is not defined no-undef
            // const options: ScrollToOptions = { 
            //     left: container.scrollLeft - container.clientWidth, 
            //     behavior: "smooth"
            // }
            const scrollTo = container.scrollLeft - container.clientWidth;
            this.scrollWidth = scrollTo;
            if(this.scrollCompleted) {
                this.scrollCompleted = false;
                container.scrollTo({ 
                    left: scrollTo, 
                    behavior: "smooth"
                });            
                setTimeout(() => {
                    this.scrollCompleted = true;
                    this.hasNext = this.checkIfHasNext();
                    this.hasPrev = this.checkIfHasPrev();
                    this.firstVisibleEl = this.getFirstVisibleElement();
                }, 750);
            }
        },
        next(): void {
            const container = this.$refs.preview as Element;        
            //error 'ScrollToOptions' is not defined no-undef 
            // const options: ScrollToOptions = { 
            //     left: container.scrollLeft + container.clientWidth, 
            //     behavior: "smooth"
            // }            
            const scrollTo = container.scrollLeft + container.clientWidth;
            this.scrollWidth = scrollTo;
            if(this.scrollCompleted) {
                this.scrollCompleted = false;   
                container.scrollTo({ 
                    left: scrollTo, 
                    behavior: "smooth"
                });
                setTimeout(() => {
                    this.scrollCompleted = true;
                    this.hasNext = this.checkIfHasNext();
                    this.hasPrev = this.checkIfHasPrev();
                    this.firstVisibleEl = this.getFirstVisibleElement(); 
                }, 750);             
            }
        },
        checkIfHasNext(): boolean {
            const container = this.$refs.preview as Element;
            return container.scrollWidth >= container.scrollLeft + container.clientWidth + delta;
        },
        checkIfHasPrev(): boolean {
            const container = this.$refs.preview as Element;
            if (container.scrollLeft === 0) {
                return false;
            } else {
                return true;
            }
        },
        resizeHandler() {
            const container = this.$refs.preview as Element;
            const scrollPos = (container.children[0].scrollWidth + 32) * this.firstVisibleEl;
            
            container.scrollTo({ 
                left: scrollPos, 
                behavior: "auto"
            });
            this.hasNext = this.checkIfHasNext();
            this.hasPrev = this.checkIfHasPrev();
        },
        getFirstVisibleElement(): number {
            const container = this.$refs.preview as Element;
            return Math.round(container.scrollLeft / (container.children[0].scrollWidth + 32));
        }
    },
    created() {
        window.addEventListener("resize", this.resizeHandler);
    },
    unmounted() {
        window.removeEventListener("resize", this.resizeHandler);
    },
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
            &-left {
                grid-column:  1;
            }
            &-right {
                grid-column:  3;
            }
        }

        &-preview {
            position: relative;
            display: flex;
            grid-column:  2;
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

    @media (max-width: 450px){
        .container {
            --count: 1;
        }
    }
    @media (min-width: 450px) {
        .container {
            --count: 2;
        }
    }
    @media (min-width: 600px) {
        .container {
            --count: 3;
        }
    }
        @media (min-width: 768px) {
        .container {
            --count: 4;
        }
    }
    @media (min-width: 1024px) {
        .container {
            --count: 5;
        }
    }
    @media (min-width: 1280px) {
        .container {
            --count: 6;
        }
    }
    @media (min-width: 1640px) {
        .container {
            --count: 7;
        }
    }

    .item { 
        width: calc(calc(100% - var(--count) * 2 * 16px)  / var(--count));
    }

    .inactive {
        display: none;
    }
</style>