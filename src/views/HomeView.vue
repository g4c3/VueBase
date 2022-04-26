<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
    <WellcomeView msg="And from welcome page"/>
    <vue-horizontal class="horizontal" responsive>
        <section v-for="item in items" :key="item.title">
          <div class="item">
            <h3>{{ item.title }}</h3>
            <p>{{ item.content }}</p>
          </div>
        </section>
      </vue-horizontal>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HelloWorld from '@/components/HelloWorld.vue';
import WellcomeView from '../components/WellcomeView.vue';
import VueHorizontal from "vue-horizontal";

export default defineComponent({
  name: 'HomeView',
  components: {
    HelloWorld, WellcomeView, VueHorizontal

  },
  data() {
    return {
      //mocked
      items:[
        { title: `Item 1`, 
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ac diam ac ex efficitur posuere. Pellentesque cursus pellentesque risus, non.",
        },
        { title: `Item 2`, 
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ac diam ac ex efficitur posuere. Pellentesque cursus pellentesque risus, non.",
        },
        { title: `Item 3`, 
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ac diam ac ex efficitur posuere. Pellentesque cursus pellentesque risus, non.",
        },
        { title: `Item 4`, 
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ac diam ac ex efficitur posuere. Pellentesque cursus pellentesque risus, non.",
        },
        { title: `Item 5`, 
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ac diam ac ex efficitur posuere. Pellentesque cursus pellentesque risus, non.",
        },
        { title: `Item 6`, 
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ac diam ac ex efficitur posuere. Pellentesque cursus pellentesque risus, non.",
        },
        { title: `Item 7`, 
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ac diam ac ex efficitur posuere. Pellentesque cursus pellentesque risus, non.",
        },
        { title: `Item 8`, 
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ac diam ac ex efficitur posuere. Pellentesque cursus pellentesque risus, non.",
        },
        { title: `Item 9`, 
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ac diam ac ex efficitur posuere. Pellentesque cursus pellentesque risus, non.",
        }
      ].map((i) => {
        return {
          title: i.title,
          content: i.content,
        };
      }),
      options: {
        responsive: [
          { end: 576, size: 1 },
          { start: 576, end: 768, size: 2 },
          { start: 768, end: 992, size: 3 },
          { size: 4 },
        ],
      },
    }
  },
  methods: {},
  computed: {},
});
</script>

<style lang="scss" scoped>
.horizontal {
  scroll-padding-left: 16px;
  scroll-padding-right: 16px;
  margin: 0px 25px 0px 25px; 
}

.item {
  padding: 24px;
  border-radius: 3px;
  background: #f5f5f5;
  max-width: 400px;
}
section {
  max-width: 90%;
  padding: 16px 8px;
}
section:first-child {
  max-width: 90%;
  padding-left: 24px;
}

section:last-child {
  max-width: 90%;
  padding-right: 24px;
}
</style>
