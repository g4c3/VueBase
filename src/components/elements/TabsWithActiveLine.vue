<template>
    <nav class="tabs">
      <button
        class="tabs-item"
        type="button"
        v-for="tab in tabs" 
        :key="tab.title" 
        :class="[
            { 'tabs-item-active' : tab.value === currentTab },
            tab.value === currentTab && 'tabs-item-active' ? 'tabs-item-active': ''
        ]"
        :disabled="tab.disabled || false"
        @click="handleClick(tab.value)"
        :ref="tab.value"
        v-html="tab.title"/>
      <div
          class="tabs-active-line"
          :style="{ width: `${activeLineWidth}px`, transform: `translateX(${activeLineOffset}px)` }"
      />
    </nav>
</template>

<script lang="ts">
//TODO: when bach from main does no change the position of the underline

import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'tabs-with-active-line',
  data: () => ({
    activeLineWidth: 0,
    activeLineOffset: 0,
    currentTab: ''
  }),
  props: {
    tabs: {
      type: Array,
      required: true,
    },
    updated: {
      type: [Boolean, String, Array],
      default: undefined,
    }
  },
  computed: {},
  watch: {},
  methods: {
    handleClick(value: string) {
      if(this.currentTab === value) return;
      this.$emit('onClick', value);
      this.moveActiveLine(value);
      this.$router.push(value);
    },
    moveActiveLine(newValue: string) {
      const element = this.$refs[newValue] as HTMLDivElement[]
      this.activeLineWidth = element[0].offsetWidth;
      this.activeLineOffset = element[0].offsetLeft;
      this.currentTab = newValue;
    }
  },
  async mounted() {
    const router = useRouter();
    await router.isReady();
    const route = router.currentRoute.value.path as string;
    this.moveActiveLine(route);
  }
})
</script>

<style lang="scss">
.tabs {
  position: relative;
  margin: 0 auto;

  &-item {
    display: inline-block;
    margin: 0 5px;
    padding: 10px;
    padding-bottom: 8px;
    font-size: 16px;
    &-active {
      color: black;
    }
    &:hover {
      border-bottom: 2px solid gray;
      color: black;
    }
    &:focus {
      outline: none;
      border-bottom: 2px solid gray;
      color: black;
    }
    &:first-child {
      margin-left: 0;
    }
    &:last-child {
      margin-right: 0;
    }
  }
  &-active-line {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    background-color: black;
    transition: transform 0.4s ease, width 0.4s ease;
  }
}
</style>