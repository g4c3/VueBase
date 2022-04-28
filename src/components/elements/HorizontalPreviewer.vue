
<template>
  <div class="previewer" style="position: relative; display: flex;">
    <!-- <div class="v-hl-btn v-hl-btn-prev" 
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
    </div> -->

    <!-- :class="{ 'v-hl-responsive': responsive }" -->
    <div class="v-hl-container v-hl-responsive" ref="container" @scroll.passive="onScroll">

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
            button: true,
            hasPrev: false,
            hasNext: false,

        }
    }
})

</script>

<style lang="scss" scoped>
.v-hl-btn {
  position: absolute;
  align-self: center;
  z-index: 1;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  cursor: pointer;
}
.v-hl-btn-prev {
  left: 0;
}
.v-hl-btn-next {
  right: 0;
}

.v-hl-container {
  display: flex;
  width: 100%;
  margin: 0;
  padding: 0;
  border: none;
  box-sizing: content-box;
  overflow-x: scroll;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
}

.v-hl-responsive > * {
  width: 100%;
  margin-right: 24px;
}
.v-hl-responsive > *:last-child {
  margin-right: 0;
}
// @media (min-width: 640px) {
//   .v-hl-responsive > * {
//     width: calc((100% - 24px) / 2);
//   }
// }
// @media (min-width: 768px) {
//   .v-hl-responsive > * {
//     width: calc((100% - 48px) / 3);
//   }
// }
// @media (min-width: 1024px) {
//   .v-hl-responsive > * {
//     width: calc((100% - 72px) / 4);
//   }
// }
// @media (min-width: 1280px) {
//   .v-hl-responsive > * {
//     width: calc((100% - 96px) / 5);
//   }
// }
</style>