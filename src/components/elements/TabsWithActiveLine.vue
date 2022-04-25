<template>
    <nav>
        <v-btn
            class="tabs__item"
            type="button"
            v-for="tab in tabs"
            :ref="tab.value"
            :key="tab.title"
            :class="[
                { 'tabs__item_active' : tab.value === currentTab },
                tab.value === currentTab && 'tabs__item_active' ? 'tabs__item_active': '',
                'tabs__item',
            ]"
            :disabled="tab.disabled || false"
            @click="handleClick(tab.value)"
            v-html="tab.title"
        >
        </v-btn>

        <div
            class="tabs__active-line"
            :style="{ width: `${activeLineWidth}px`, transform: `translateX(${activeLineOffset}px)` }"
        />
    </nav>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'tabs-with-active-line',
    props: {
        currentTab: {
            type: String,
            required: true,
        },
        tabs: {
            type: Array,
            required: true,
        },
        updated: {
            type: [Boolean, String, Array],
            default: undefined,
        }
    },
  watch: {
    currentTab(newCurrentTab) {
      if (this.newTab === newCurrentTab) return;
      this.moveActiveLine(newCurrentTab);
      this.newTab = newCurrentTab;
    },
    updated() {
      this.moveActiveLine(this.currentTab);
    },
  },
  data: () => ({
    activeLineWidth: 0,
    activeLineOffset: 0,
    newTab: '',
  }),
  methods: {
    handleClick(value) {
      this.$emit('onClick', value);
      this.moveActiveLine(value);
      this.newTab = value;
      this.$router.push(value);
    },
    moveActiveLine(newValue) {
        if (!this.currentTab) return;
        if(!ref(newValue) || !ref(newValue[0])) {
            return;
        }
        const element = ref(newValue[0]).value
        this.activeLineWidth = element.clientWidth;
        this.activeLineOffset = element.offsetLeft;
    },
  },
  mounted() {
    this.moveActiveLine(this.currentTab);
    this.newTab = this.currentTab;
  },
})
</script>

<style lang="scss">
.tabs {
  position: relative;
  margin: 0 auto;
  &__item {
    margin: 0 5px;
    padding: 10px;
    padding-bottom: 8px;
    font-size: 16px;
    &_active {
      color: black;
    }
    &:first-child {
      margin-left: 0;
    }
    &:last-child {
      margin-right: 0;
    }
  }
  &__active-line {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    background-color: black;
    transition: transform 0.4s ease, width 0.4s ease;
  }
}
.content {
  margin-top: 30px;
  font-size: 20px;
}
</style>