import { App } from 'vue';

// Global Styles
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'font-awesome/css/font-awesome.min.css'

// Styles
import { aliases as mdAlliases, md } from 'vuetify/lib/iconsets/md'
import { fa as faAlliases, fa } from 'vuetify/lib/iconsets/fa'
import { mdi as mdiAlliases, mdi } from 'vuetify/lib/iconsets/mdi'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

// Vuetify
import { createVuetify } from 'vuetify'

// Themes
import { lightTheme, Themes } from './themes'
import giftIcon from '@/assets/icons/card_giftcard_black_24dp.vue'
import theme from '@/assets/icons/theme-light-dark.vue'
const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases: {
      ...mdAlliases,
      ...faAlliases,
      ...mdiAlliases,
      giftIcon: giftIcon, //use as <v-icon icon="$customIcon" />
      theme: theme
    },
    sets: {
      mdi, fa, md 
    },
  },
  theme: {
    defaultTheme: Themes.Light,
    themes: {
      lightTheme
    }
  }
});

export default vuetify

export function loadFontAwesome(app: App) {
  app.component('font-awesome-icon', FontAwesomeIcon);
  library.add(fas);
}

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
