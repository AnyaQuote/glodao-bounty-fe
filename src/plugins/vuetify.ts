import '@fortawesome/fontawesome-free/css/all.css'
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
// import settingsSvg from '../assets/icons/settings.svg'

Vue.use(Vuetify)

export default new Vuetify({
  iconfont: 'fa',
  icons: {
    iconfont: 'fa',
    values: {
      // settings: settingsSvg,
    },
  },
  theme: {
    // dark: !localData.lightmode,
    dark: false,
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: {
          base: '#000000',
        },
        success: {
          base: '#5FCD5B',
          lighten1: '#dff5de',
        },
        secondary: '#424242',
        twitter: '#4686F5',
        accent: '#0EB2E5',
        error: '#F44336',
        info: '#2196F3',
        warning: '#FFC107',
        grey1: '#72687A',
        subtitle: '#969696',
        red1: '#FF0000',
        background: {
          base: '#E5E5E5',
        },
      },
      dark: {
        primary: {
          base: '#FFC107',
        },
        success: {
          base: '#5FCD5B',
        },
        twitter: '#4686F5',
        lightGray: '#969696',
        grey1: '#B9B9B1',
        subtitle: '#969696',
        red1: '#F6616A',
        background: {
          base: '#181718',
        },
      },
    },
  },
})
