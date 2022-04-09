<template>
  <div>
    <v-list-group
      :append-icon="null"
      no-action
      class="neutral100--bg"
      v-model="expand"
      v-if="$vuetify.breakpoint.smAndUp"
    >
      <template v-slot:activator>
        <v-list-item-icon>
          <v-icon v-if="!expand">mdi-chevron-right</v-icon>
          <v-icon v-if="expand">mdi-chevron-down</v-icon>
        </v-list-item-icon>
        <v-list-item-avatar>
          <v-img :src="data | _get('hunter.metadata.avatar')"></v-img>
        </v-list-item-avatar>
        <v-list-item-content class="row d-flex align-center ml-2">
          <v-list-item-title class="col col-6 text-body-2 font-weight-bold">
            @{{ data | _get('hunter.name', 'TBA') }}
          </v-list-item-title>
          <v-list-item-title class="col col-6 text-body-2 neutral10--text">
            {{ data | _get('updatedAt') | datetime }}
          </v-list-item-title>
        </v-list-item-content>
      </template>
      <v-list-item v-for="(item, index) in linkData" :key="index">
        <v-list-item-content class="row">
          <v-list-item-title class="col col-8 text-body-2 font-weight-600 text-capitalize">
            <v-icon size="16" class="mr-2 ml-3">mdi-check</v-icon>
            {{ item.type }} {{ item.taskCategory }} post
          </v-list-item-title>
          <v-list-item-title class="col col-4">
            <div class="bluePrimary--text cursor-pointer text-body-2" @click="openLink(item.link)">
              Link<v-icon size="14" color="bluePrimary" class="ml-2">mdi-open-in-new</v-icon>
            </div>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-group>
    <v-list-group
      :append-icon="null"
      no-action
      class="neutral100--bg"
      v-model="expand"
      v-if="$vuetify.breakpoint.xsOnly"
    >
      <template v-slot:activator>
        <v-list-item-icon class="mt-7 mr-7">
          <v-icon v-if="!expand">mdi-chevron-right</v-icon>
          <v-icon v-if="expand">mdi-chevron-down</v-icon>
        </v-list-item-icon>
        <v-list-item-content class="row d-flex align-center pb-5 pt-3 pr-2">
          <table class="text-body-2">
            <tr>
              <td>@Account:</td>
              <td class="text-end font-weight-bold text-truncate text-overflow-ellipsis" style="max-width: 100px">
                <v-list-item-avatar size="28" class="mr-2">
                  <v-img :src="data | _get('hunter.metadata.avatar')"></v-img>
                </v-list-item-avatar>
                @{{ data | _get('hunter.name', 'TBA') }}
              </td>
            </tr>
            <tr>
              <td>Time:</td>
              <td class="text-end">{{ data | _get('updatedAt') | ddmmyyyyhhmm }}</td>
            </tr>
          </table>
        </v-list-item-content>
      </template>
      <v-divider></v-divider>
      <v-list-item v-for="(item, index) in linkData" :key="index" class="pl-6">
        <v-list-item-content class="row">
          <v-list-item-title class="col col-8 text-body-2 font-weight-600 text-capitalize">
            <v-icon size="16" class="mr-2">mdi-check</v-icon>
            {{ item.type }} {{ item.taskCategory }} post
          </v-list-item-title>
          <v-list-item-title class="col col-4">
            <div class="bluePrimary--text cursor-pointer text-body-2" @click="openLink(item.link)">
              Link<v-icon size="14" color="bluePrimary" class="ml-2">mdi-open-in-new</v-icon>
            </div>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-group>
    <v-divider></v-divider>
  </div>
</template>

<script lang="ts">
import { Observer } from 'mobx-vue'
import { Component, Prop, Vue } from 'vue-property-decorator'
import * as _ from 'lodash-es'
import { snackController } from '@/components/snack-bar/snack-bar-controller'
@Observer
@Component
export default class ExpandableListItem extends Vue {
  @Prop({ required: true }) data
  expand = false
  linkData: any[] = []

  mounted() {
    console.log(this.data)
    this.flatArray()
  }

  flatArray() {
    const flattenedArr: any[] = []
    for (const [key, value] of Object.entries(this.data.data)) {
      console.log(value, typeof value)
      if (key !== 'twitter') continue
      ;(value as any).forEach((element) => {
        if (element.type === 'follow') return
        flattenedArr.push({ ...element, taskCategory: key })
      })
    }
    console.log(flattenedArr)
    this.linkData = flattenedArr
  }
  openLink(link: string) {
    const url = link.trim()
    if (_.isEmpty(url)) {
      snackController.error('Can not navigate to desired link')
      return
    }
    if (url.startsWith('https://') || url.startsWith('http://')) window.open(url, '_blank')
    else window.open('https://' + url, '_blank')
  }
}
</script>

<style lang="scss" scoped></style>
