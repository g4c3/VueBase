import VueLuxon from "vue-luxon";
import { App } from 'vue';

export default{
    install:(app: App) => {
        function load(): VueLuxon{
            return VueLuxon;
        }
        app.config.globalProperties.$luxon = load();
    }
}
declare module "@vue/runtime-core" {
    //Bind to `this` keyword
    interface ComponentCustomProperties {
      $luxon: VueLuxon;
    }
}