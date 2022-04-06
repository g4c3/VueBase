import _, {LoDashStatic} from 'lodash';
import { App } from 'vue';

export default {
  // called by Vue.use(FirstPlugin)
  install:(app: App) => {

    function load(): LoDashStatic{
      return _;
    }

    app.config.globalProperties.$_ = load();
  }
}
declare module "@vue/runtime-core" {
  //Bind to `this` keyword
  interface ComponentCustomProperties {
    $_: LoDashStatic;
  }
}