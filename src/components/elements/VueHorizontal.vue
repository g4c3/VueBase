
<template>
  <div class="vue-horizontal" style="position: relative; display: flex;">
    <div class="v-hl-btn v-hl-btn-prev" 
        v-if="button && hasPrev" 
        @click.stop="prev" 
        role="button"
        :class="{'v-hl-btn-between': buttonBetween}">
        <slot name="btn-prev">
            <svg class="v-hl-svg" viewBox="0 0 24 24" aria-label="horizontal scroll area navigate to previous button">
                <path d="m9.8 12 5 5a1 1 0 1 1-1.4 1.4l-5.7-5.7a1 1 0 0 1 0-1.4l5.7-5.7a1 1 0 0 1 1.4 1.4l-5 5z"/>
            </svg>
        </slot>
    </div>

    <div class="v-hl-btn v-hl-btn-next" 
        v-if="button && hasNext" 
        @click.stop="next" 
        role="button"
        :class="{'v-hl-btn-between': buttonBetween}">
        <slot name="btn-next">
            <svg class="v-hl-svg" viewBox="0 0 24 24" aria-label="horizontal scroll area navigate to next button">
                <path d="m14.3 12.1-5-5a1 1 0 0 1 1.4-1.4l5.7 5.7a1 1 0 0 1 0 1.4l-5.7 5.7a1 1 0 0 1-1.4-1.4l5-5z"/>
            </svg>
        </slot>
    </div>

    <div class="v-hl-container" ref="container" @scroll.passive="onScroll" :class="{
        'v-hl-responsive': responsive,
        'v-hl-scroll': scroll,
        'v-hl-snap-start': snap === 'start',
        'v-hl-snap-center': snap === 'center',
        'v-hl-snap-end': snap === 'end'}">

        <slot></slot>
    </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: "VueHorizontalComponent",
    data() {
        return {

        }
    }
})

</script>