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
    <HorizontalPreviewer>
      <v-card class="card" 
        v-for="item in items" 
        :key="item.title">
          <div class="card-item">
          <h3>{{ item.title }}</h3>
          <p>{{ item.content }}</p>
        </div>
      </v-card>
    </HorizontalPreviewer>
    {{height}} {{ }} {{width}}
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
    <WellcomeView msg="And from welcome page"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import HelloWorld from '@/components/HelloWorld.vue';
import WellcomeView from '../components/WellcomeView.vue';
// import VueHorizontal from "vue-horizontal";
import HorizontalPreviewer from "@/components/elements/HorizontalPreviewer.vue";
import { useDisplay } from 'vuetify'

export default defineComponent({
  name: 'HomeView',
  components: {
    HelloWorld, 
    WellcomeView, 
    // VueHorizontal
    HorizontalPreviewer

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
  mounted () {

  },
  setup () {
      const { name } = useDisplay()

      const height = computed(() => {
        // name is reactive and
        // must use .value
        switch (name.value) {
          case 'xs': return 220
          case 'sm': return 400
          case 'md': return 500
          case 'lg': return 600
          case 'xl': return 800
          case 'xxl': return 1200
          default : return 0
        }
      });

      const width = computed(() => {
        switch (name.value) {
          case 'xs': return 220
          case 'sm': return 400
          case 'md': return 500
          case 'lg': return 600
          case 'xl': return 800
          case 'xxl': return 1200
          default : return 0
        }
      })

      return { height, width }
    }
});
</script>

<style lang="scss" scoped>
$previewerHeight: 100px;

.card {
  margin: 0px 25px 0px 25px; 
  max-height: $previewerHeight;
  display: flex;
  flex-direction: row;
  &-item {
    padding: 8px;
    border-radius: 3px;
    background: #f5f5f5;
    max-width: 200px;
  }
}
@media (min-width: 800px) {
  .card {
    flex-shrink: 1 !important;
  }
}

// .item {
//   padding: 8px;
//   border-radius: 3px;
//   background: #f5f5f5;
//   max-width: 200px;
// }

section {
  padding: 16px 8px;
  // max-width: calc(100% - (16px + 16px));
  // max-width: 90%;
}
// @media (min-width: 640px) {
//   .v-hl-container {
//     flex-shrink: 1 !important;
//   }
// }

</style>
