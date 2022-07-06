<template>
  <v-sheet height="50" class="neutral15">
    <v-breadcrumbs :items="data" class="pa-0">
      <template v-slot:item="{ item }">
        <v-breadcrumbs-item :disabled="item.disabled">
          <template v-slot:default>
            <router-link :to="item.href">
              <span :class="{ 'bluePrimary--text': item.text === 'Bounty hunter' }">{{ item.text }} </span>
            </router-link>
          </template>
        </v-breadcrumbs-item>
      </template>
      <template v-slot:divider>
        <v-icon size="22"> mdi-chevron-right </v-icon>
      </template>
    </v-breadcrumbs>
  </v-sheet>
</template>

<script lang="ts">
import { observer } from 'mobx-vue'
import { Component, Prop, Vue } from 'vue-property-decorator'

const defaultProp = () => []

@observer
@Component
export default class Breadcrumbs extends Vue {
  @Prop({ default: defaultProp }) data!: Breadcrumb[]
}

interface Breadcrumb {
  text?: string
  disabled?: boolean
  href?: string
}
</script>

<style scoped></style>
