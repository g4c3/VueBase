<template>
    <div class="preview">
        <v-btn elevation="4" icon class="left" @click="prev">
            <v-icon icon="mdi-chevron-left"/>
        </v-btn>        
        <div class="preview-container" ref="container">
            <div class="item" v-for="item in items" :key="item.i">
                <div class="card">
                    <h1>{{item.title}}</h1>
                    <h5>{{item.content}} {{item.i}}</h5>
                </div>
            </div>
        </div>
        <v-btn elevation="4" icon class="right" @click="next">
            <v-icon icon="mdi-chevron-right"/>
        </v-btn>
    </div>  
</template>

<script lang="ts">
import { defineComponent } from 'vue';
const delta = 2.5

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
            const container = this.$refs.container as Element
            const scrollTo = container.scrollLeft - container.clientWidth - 25;            
            container.scrollTo({ left: scrollTo, behavior: "smooth" })
            
            // console.log("clientWidth " + container.clientWidth)
            // console.log("scrollWidth " + container.scrollWidth)
            // console.log("children width " + container.children[0].clientWidth)
            // console.log("scrollLeft " + container.scrollLeft)

        },
        next(): void {
            const container = this.$refs.container as Element
            // console.log("before clientWidth " + container.clientWidth)
            // console.log("before scrollWidth " + container.scrollWidth)
            // console.log("before scrollLeft " + container.scrollLeft)
            // console.log(window.innerWidth - document.body.offsetWidth)  // scrollbar width
            const scrollTo = container.scrollLeft + container.clientWidth + 25;
            // console.log(container.scrollWidth - (container.scrollLeft + container.clientWidth + 17))
            // if((container.scrollLeft + container.clientWidth + 17) <= container.scrollWidth) {                
                container.scrollTo({ left: scrollTo, behavior: "smooth" })
                console.log("before scrollLeft " + container.scrollLeft)
            // }
        }
    }
})
</script>

<style lang="scss" scoped>
    //buttons and icon styles
    .v-icon {
        height: 32px;
        width: 32px;
        font-size: 32px;
    }
    @media (min-width: 1024px) and (max-width: 1280px) {
        .v-btn.left {
            left: 1vw;
        }
        .v-btn.right {
            right: 1vw;
        }
    }
    @media (max-width: 1024px)
    {
        .v-btn {
            height: 32px;
            width: 32px;
        }
        .v-btn.left {
            left: 2vw;
        }
        .v-btn.right {
            right: 2vw;
        }
        .v-icon {
            height: 24px;
            width: 24px;
            font-size: 24px;
        }
    }
    @media (max-width: 768px) {
        .v-btn.right {
            right: 3vw;
        }
    }
    @media (max-width: 640px) {
        .v-btn.right {
            right: calc(3vw + 17px);
        }
    }
    @media (max-width: 480px) {
        .v-btn.right {
            right: calc(4vw + 17px);
        }
    }

    //main container style
    .preview {
        --count: 1;
        --gap: 16px;
        --margin: 24px;
        position: relative;                
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        &-container {
            display: flex;
            position: relative;
            max-width: 90vw;
            height: 100%;
            margin: 0;
            padding: 0;
            border: none;
            box-sizing: content-box;
            overflow-x: scroll;
            overflow-y: hidden;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
        }
        &-container > * {
            flex-shrink: 0;
            box-sizing: border-box;
            min-height: 1px;
        }
        &-container:not(.preview-scroll) {
            scrollbar-width: none;
            -ms-overflow-style: none;
            clip-path: inset(0 0 0 0);
        }
        &-container:not(.preview-scroll)::-webkit-scrollbar {
            width: 0 !important;
            height: 0 !important;
        }
    }


    @media (min-width: 640px) {
        .preview {
            --count: 2;
        }
    }
    @media (min-width: 768px) {
        .preview {
            --count: 3;
            --margin: 0;
        }
    }
    @media (min-width: 1024px) {
        .preview {
            --count: 4;
        }
    }
    @media (min-width: 1280px) {
        .preview {
            --gap: 24px;
            --count: 6;
        }
    }

    //item styles
    @media (max-width: 767.98px) {
        .item {
            width: calc((100% - (var(--margin) * 2) + var(--gap)) / var(--count));
            padding: 0 calc(var(--gap) / 2);
        }

        .item:first-child {
            width: calc((100% - (var(--margin) * 2) + var(--gap)) / var(--count) + var(--margin) - (var(--gap) / 2));
            padding-left: var(--margin);
        }

        .item:last-child {
            width: calc((100% - (var(--margin) * 2) + var(--gap)) / var(--count) + var(--margin) - (var(--gap) / 2));
            padding-right: var(--margin);
        }

        .item:only-child {
            width: calc((100% - (var(--margin) * 2) + var(--gap)) / var(--count) + var(--margin) * 2 - var(--gap));
        }

        //TODO: check these
        // .preview {
        //     margin: 0 var(--margin);
        // }

        .preview >>> .preview-container {
            scroll-padding: 0 calc(var(--margin) - (var(--gap) / 2));
        }

        .preview >>> .prev-btn {
            display: none;
        }
    }

    @media (min-width: 768px) {
        .item {
                width: calc((100% - ((var(--count) - 1) * var(--gap))) / var(--count));
                margin-right: var(--gap);
            }     
        }
       .item:last-child {
            margin-right: 0;
            padding-right: 0;
        }
        .item:first-child {
            margin-left: 0;
            padding-left: 0;
        }
</style>