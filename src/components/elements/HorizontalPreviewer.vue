<template>
    <div class="preview">
        <div class="prev-btn prev-btn-prev" v-if="button && hasPrev" @click.stop="prev" role="button"
            :class="{'prev-btn-between': buttonBetween}">
            <slot name="btn-prev">
                <svg class="prev-svg" viewBox="0 0 24 24" aria-label="horizontal scroll area navigate to previous button">
                    <path d="m9.8 12 5 5a1 1 0 1 1-1.4 1.4l-5.7-5.7a1 1 0 0 1 0-1.4l5.7-5.7a1 1 0 0 1 1.4 1.4l-5 5z"/>
                </svg>
            </slot>
        </div>
        
        <div class="preview-container">
            <div class="item" v-for="item in items" :key="item.i">
                {{item.title}}
            </div>
        </div>

        <div class="prev-btn prev-btn-next" v-if="button && hasNext" @click.stop="next" role="button"
            :class="{'prev-btn-between': buttonBetween}">
            <slot name="btn-next">
                <svg class="prev-svg" viewBox="0 0 24 24" aria-label="horizontal scroll area navigate to next button">
                    <path d="m14.3 12.1-5-5a1 1 0 0 1 1.4-1.4l5.7 5.7a1 1 0 0 1 0 1.4l-5.7 5.7a1 1 0 0 1-1.4-1.4l5-5z"/>
                </svg>
            </slot>
        </div>            
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

    }

})
</script>

<style lang="scss" scoped>
    //main container style
    .preview {
        --count: 1;
        --gap: 16px;
        --margin: 24px;
        position: relative;
        overflow: hidden;        
        max-width: 98vw;        //only temporary to fix the glitch with the buttons

        &-container {
            display: flex;
            flex-direction: row;
            min-width: 95%;
            position: relative;
            left: 2.5%;
            right: 2.5%;
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

    .horizontal {
        margin: 0 calc(var(--margin) * -1);
    }

    .horizontal >>> .v-hl-container {
        scroll-padding: 0 calc(var(--margin) - (var(--gap) / 2));
    }

    .horizontal >>> .v-hl-btn {
        display: none;
    }
    }

    @media (min-width: 768px) {
        .item {
            width: calc((100% - ((var(--count) - 1) * var(--gap))) / var(--count));
            margin-right: var(--gap);
        }
    }

    //button styles
    .prev-btn {
        position: absolute;
        align-self: center;
        z-index: 1;
        top: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        cursor: pointer;
    }
    .prev-btn-prev {
        left: 16px;
    }
    .prev-btn-prev.prev-btn-between {
        transform: translateX(-50%);
    }
    .prev-btn-next {
        right: 16px;
    }
    .prev-btn-next.prev-btn-between {
        transform: translateX(50%);
    }

    .prev-svg {
        width: 40px;
        height: 40px;
        margin: 6px;
        padding: 6px;
        border-radius: 20px;
        box-sizing: border-box;
        background: white;
        color: black;
        fill: currentColor;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    }
</style>