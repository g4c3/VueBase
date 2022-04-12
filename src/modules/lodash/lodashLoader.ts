import _, {LoDashStatic} from 'lodash';
import { App } from 'vue';

export default {
  install:(app: App) => {
    app.config.globalProperties.$_ = Object.assign({}, _)
  }
}
declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $_: LoDashStatic;
  }
}