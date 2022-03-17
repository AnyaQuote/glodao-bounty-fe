<template>
  <v-sheet
    outlined
    class="d-flex justify-space-between align-center pa-6 card-text"
    rounded
    elevation="3"
    style="position: relative"
  >
    <div class="icon-container d-flex justify-center align-center" :class="`custom-bg-${type}`">
      <v-icon color="white"> {{ typeInfo.icon }} </v-icon>
    </div>
    <v-sheet class="d-flex flex-column twitter">
      <v-sheet class="label-font text-end">
        {{ typeInfo.label }}
      </v-sheet>
      <v-sheet class="info-font text-end">
        {{ (type === 'rewards' ? '$' : '') + info }}
      </v-sheet>
    </v-sheet>
  </v-sheet>
</template>

<script lang="ts">
import { Observer } from 'mobx-vue'
import { Component, Vue, Prop } from 'vue-property-decorator'

@Observer
@Component({
  components: {
    'chain-logo': () => import('@/components/chain-logo.vue'),
  },
})
export default class CurrentTask extends Vue {
  @Prop({ required: true }) type!: string
  @Prop({ required: true }) info!: string

  get typeInfo() {
    switch (this.type) {
      case 'missions':
        return {
          icon: 'mdi-marker-check',
          label: 'Total missions',
        }
      case 'rewards':
        return {
          icon: 'mdi-star-circle',
          label: 'Total rewards awarded',
        }
      case 'users':
        return {
          icon: 'mdi-account',
          label: 'Total unique users',
        }
      case 'participants':
        return {
          icon: 'mdi-account-group',
          label: 'Daily participants',
        }
      default:
        return {
          icon: '',
          label: '',
        }
    }
  }
}
</script>

<style scoped lang="scss">
.icon-container {
  width: 48px;
  height: 48px;
  border-radius: 50%;
}
.custom-bg-missions {
  background: linear-gradient(90deg, #0276f0 0%, #00e5ff 113.65%);
}
.custom-bg-rewards {
  background: linear-gradient(90deg, #6c00d8 0%, #de13d6 113.65%);
}
.custom-bg-users {
  background: linear-gradient(90deg, #f06602 0%, #ffc700 113.65%);
}
.custom-bg-participants {
  background: linear-gradient(90deg, #21da6b 0%, #caef62 113.65%);
}
.label-font {
  font-family: 'Proxima Nova Alt';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 150%;
  color: #5f6267;
}
.info-font {
  font-family: 'Proxima Nova Alt';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 130%;
  color: #06032b;
}
</style>
