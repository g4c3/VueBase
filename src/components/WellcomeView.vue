<template>
    <div class="wellcome">
        <h1>"Hello"</h1>
        <h1>{{ msg }}</h1>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'WellcomeView',
  props: {
    msg: String,
  },
});
</script>

<style scoped lang="scss">
    // .welcome{
    // margin: 40px 0 0;
    // }
</style>