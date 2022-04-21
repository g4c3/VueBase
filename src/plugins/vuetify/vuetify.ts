// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'font-awesome/css/font-awesome.min.css'
import 'vuetify/styles'

import { aliases, md } from 'vuetify/lib/iconsets/md'
import { fa } from 'vuetify/lib/iconsets/fa'
import { mdi } from 'vuetify/lib/iconsets/mdi'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

// Vuetify
import { createVuetify } from 'vuetify'

import { App } from 'vue';

const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi, md, fa
    },
  },
});

export default vuetify

export function loadFontAwesome(app: App) {
  app.component('font-awesome-icon', FontAwesomeIcon);
  library.add(fas);
}

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
