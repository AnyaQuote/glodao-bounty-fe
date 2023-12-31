import { localData } from '@/stores/local-data'
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
    dark: !localData.lightmode,
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
        twitter: '#039BE5',
        accent: '#0EB2E5',
        error: '#F44336',
        info: '#2196F3',
        warning: '#FFC107',
        grey1: '#72687A',
        grey2: '#8197BB',
        subtitle: '#969696',
        red1: '#FF0000',
        background: {
          base: '#E5E5E5',
        },
        bluePrimary: {
          base: '#0276F0',
          lighten1: '#E6F1FE',
          lighten2: '#55ACE3',
          lighten3: '#F0F7FF',
        },
        neutral10: {
          base: '#5F6267',
        },
        neutral15: {
          base: '#F9FBFD',
        },
        neutral20: {
          base: '#E5E5E5',
          lighten1: '#F9F9F9',
        },
        neutral100: {
          base: '#FFFFFF',
        },
        greenSenamatic: '#6CE08D',
        redSenamatic: '#E35E55',
        orangeSenamatic: '#F9AF40',
        purple: '#6955E3',
        violet: '#252D72',
        green: {
          base: '#6CE08D',
        },
        red: {
          base: '#E35E55',
        },
        blue: {
          base: '#0276F0',
          lighten1: '#E6F1FE',
          lighten2: '#55ACE3',
          lighten3: '#F0F7FF',
        },
        grey: {
          base: '#F9F9F9',
          lighten1: '#E5E5E5',
        },
        mint: {
          base: '#00E5FF',
        },
      },
      dark: {
        primary: {
          base: '#FFFFFF',
        },
        success: {
          base: '#5FCD5B',
        },
        twitter: '#039BE5',
        lightGray: '#969696',
        grey1: '#B9B9B1',
        grey2: '#8197BB',
        subtitle: '#969696',
        red1: '#F6616A',
        background: {
          base: '#181718',
        },
        bluePrimary: {
          base: '#00E5FF',
          lighten1: '#143973',
          lighten2: '#55ACE3',
          lighten3: '#143973',
        },
        neutral20: {
          base: '#30415C',
          lighten1: '#F9F9F9',
        },
        greenSenamatic: '#6CE08D',
        redSenamatic: '#E35E55',
        orangeSenamatic: '#F9AF40',
        purple: '#6955E3',
        neutral10: {
          base: '#B6B9BE',
        },
        neutral15: {
          base: '#00102A',
        },
        neutral100: {
          base: '#092249',
        },
        green: {
          base: '#6CE08D',
        },
        red: {
          base: '#E35E55',
        },
        blue: {
          base: '#0276F0',
          lighten1: '#E6F1FE',
          lighten2: '#55ACE3',
          lighten3: '#143973',
        },
        mint: {
          base: '#00E5FF',
        },
      },
    },
  },
})
