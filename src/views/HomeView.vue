<template>
  <div class="home">
    <!-- <vue-horizontal class="horizontal" responsive>
      <section v-for="item in items" :key="item.title">
        <div class="item">
          <h3>{{ item.title }}</h3>
          <p>{{ item.content }}</p>
        </div>
      </section>
    </vue-horizontal> -->
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
    <WellcomeView msg="And from welcome page"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HelloWorld from '@/components/HelloWorld.vue';
import WellcomeView from '../components/WellcomeView.vue';
//import VueHorizontal from "vue-horizontal";

export default defineComponent({
  name: 'HomeView',
  components: {
    HelloWorld, WellcomeView, 
    //VueHorizontal

  },
  data() {
    return {
      //mocked
      items:[
        { title: 'Ctaegory 1', 
          content: "Description",
        },
        { title: 'Ctaegory 2', 
          content: "Description",
        },
        { title: 'Ctaegory 3', 
          content: "Description",
        },
        { title: 'Ctaegory 4', 
          content: "Description",
        },
        { title: 'Ctaegory 5', 
          content: "Description",
        },
        { title: 'Ctaegory 6', 
          content: "Description",
        },
        { title: 'Ctaegory 7', 
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ac diam ac ex efficitur posuere. Pellentesque cursus pellentesque risus, non.",
        },
        { title: 'Ctaegory 8', 
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ac diam ac ex efficitur posuere. Pellentesque cursus pellentesque risus, non.",
        },
        { title: 'Ctaegory 9', 
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
  margin: 0px 25px 0px 25px; 
}

.item {
  padding: 8px;
  border-radius: 3px;
  background: #f5f5f5;
  max-width: 400px;
}

section {
  padding: 16px 8px;
  // max-width: calc(100% - (16px + 16px));
  max-width: 90%;
}

</style>
