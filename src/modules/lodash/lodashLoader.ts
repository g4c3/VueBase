import _, {LoDashStatic} from 'lodash';
import { App } from 'vue';

export default {
  install:(app: App) => {
    function load(): LoDashStatic{
      return _;
    }
    app.config.globalProperties.$_ = load();
  }
}
declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $_: LoDashStatic;
  }
}