<template>
  <div>
    <v-row dense no-gutters>
      <v-col cols="auto" class="mr-auto pa-2 pa-sm-3 pa-md-4">
        <task-icon-container
          type="image"
          :color="'indigo accent-1'"
          :isActive="vm.isHuntingProcessStarted && state === 0"
        />
      </v-col>
      <v-col>
        <div class="pa-2 pa-sm-4">
          <div class="text-body-1 font-weight-600">
            {{ name }} <span v-if="!required">(Optional)</span>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon size="12" v-on="on" v-bind="attrs">mdi-help-circle-outline</v-icon>
              </template>
              <div style="max-width: 300px">
                <span style="font-family: roboto">{{ tooltip }}</span>
              </div>
            </v-tooltip>
          </div>
          <div class="text-caption mt-1" style="word-break: break-word">
            {{ description }}
          </div>
        </div>
        <div
          class="px-2 px-sm-3 px-md-4 mb-3 mb-md-4"
          v-if="vm.isHuntingProcessStarted && task.activeStep && !task.finished"
          v-show="$vuetify.breakpoint.smAndUp"
        >
          <app-file-upload
            isImageFile
            :rules="[$rules.maxSize(MAX_IMAGE_FILE_SIZE), $rules.isImage, $rules.required]"
            :value="$_get(vm.projectInfo, 'projectCover', null)"
            @change="onValueChange"
          />
          <v-btn
            elevation="0"
            tile
            class="fill-width white--text text-none linear-background-blue-main text-caption rounded"
            @click="submitLink"
            :loading="!task.finished && vm.isTaskUpdating"
            :disabled="vm.shouldDisableTaskProcessing"
          >
            Submit
          </v-btn>
        </div>
      </v-col>
      <v-col cols="auto" class="ml-auto">
        <div class="pa-2 pa-sm-3 pa-md-4">
          <v-sheet
            height="24"
            width="24"
            class="rounded-circle greenSenamatic--bg"
            style="padding: 1px"
            v-if="task.finished"
          >
            <v-sheet class="fill-height fill-width neutral100--bg rounded-circle flex-center-box">
              <v-icon size="18" color="greenSenamatic" v-if="task.finished">mdi-check</v-icon>
            </v-sheet>
          </v-sheet>
          <v-sheet
            height="24"
            width="24"
            class="rounded-circle neutral20--bg"
            style="padding: 1px"
            v-else-if="!vm.isHuntingProcessStarted"
          >
            <v-sheet class="fill-height fill-width neutral100--bg rounded-circle flex-center-box"> </v-sheet>
          </v-sheet>
          <v-sheet
            height="24"
            width="24"
            class="rounded-circle"
            :class="{
              'linear-background-blue-main': state === 0,
              'greenSenamatic--bg': state === 1,
              'neutral20--bg': state === -1,
            }"
            style="padding: 1px"
            v-else
          >
            <v-sheet class="fill-height fill-width neutral100--bg rounded-circle flex-center-box">
              <v-icon size="18" color="greenSenamatic" v-if="task.finished">mdi-check</v-icon>
            </v-sheet>
          </v-sheet>
        </div>
      </v-col>
      <v-col
        cols="12"
        class="mb-3"
        v-show="$vuetify.breakpoint.xsOnly"
        v-if="vm.isHuntingProcessStarted && task.activeStep && !task.finished"
      >
        <app-file-upload
          isImageFile
          :rules="[$rules.maxSize(MAX_IMAGE_FILE_SIZE), $rules.isImage, $rules.required]"
          :value="$_get(vm.projectInfo, 'projectCover', null)"
          @change="onValueChange"
        />
        <v-btn
          elevation="0"
          tile
          class="fill-width white--text text-none linear-background-blue-main text-caption rounded"
          @click="submitLink"
          :loading="!task.finished && vm.isTaskUpdating"
          :disabled="vm.shouldDisableTaskProcessing"
        >
          Submit
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { MAX_IMAGE_FILE_SIZE } from '@/constants'
import { snackController } from '@/components/snack-bar/snack-bar-controller'
import { TWEET_MIN_WORDS_COUNT } from '@/constants'
import { BountyDetailViewModel } from '@/modules/bounty/viewmodels/bounty-detail-viewmodel'
import { get } from 'lodash-es'
import { Observer } from 'mobx-vue'
import { Component, Inject, Prop, Vue } from 'vue-property-decorator'
import { apiService } from '@/services/api-service'

@Observer
@Component({
  components: {
    'chain-logo': () => import('@/components/chain-logo.vue'),
    'task-icon-container': () => import('@/modules/bounty/components/bounty-detail/task-icon-container.vue'),
    'app-file-upload': () => import('@/components/app-file-upload.vue'),
  },
})
export default class ImageUploadTask extends Vue {
  TWEET_MIN_WORDS_COUNT = TWEET_MIN_WORDS_COUNT
  MAX_IMAGE_FILE_SIZE = MAX_IMAGE_FILE_SIZE
  @Inject() vm!: BountyDetailViewModel
  @Prop({ required: true }) task!: any
  @Prop({ required: true }) step!: number
  type = get(this.task, 'type', '')
  value: any = null
  hashtags = get(this.task, 'hashtag', [])
  content = get(this.task, 'content', '')
  mentions = get(this.task, 'mentions', [])
  link = get(this.task, 'link', [])
  isLinkRequired = get(this.task, 'isLinkRequired', false)
  description = get(this.task, 'description', '')
  page = get(this.task, 'page', '')
  name = get(this.task, 'name', '')
  requiredContent = get(this.task, 'requiredContent', '')
  startDate = get(this.task, 'startDate', '')
  tooltip = get(this.task, 'tooltip', '')
  required = get(this.task, 'required', false)
  title = ''

  async onValueChange(value: File) {
    this.value = value
    console.log(this.value)
    const formData = new FormData()
    formData.append('files', this.value)
    formData.append('field', 'image')
    try {
      const res = await apiService.uploadFile(formData)
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

  openLink(link: string) {
    const url = link.trim()
    if (url.startsWith('https://') || url.startsWith('http://')) window.open(url, '_blank')
    else window.open('https://' + url, '_blank')
  }

  async submitLink() {
    console.log(this.value)
    if (!this.required) {
      await this.vm.submitLink('optional', '', this.step)
      return
    }
    if (this.value == null) snackController.error('Image cannot be empty')
    else {
      const formData = new FormData()
      formData.append('files', this.value)
      formData.append('field', 'image')
      try {
        this.vm.changeTaskUpdating(true)
        const res = await apiService.uploadFile(formData)
        console.log(res)
        console.log(res[0].url)
        await this.vm.submitLink('optional', res[0].url, this.step)
      } catch (error) {
        console.log(error)
      } finally {
        this.vm.changeTaskUpdating(true)
      }
    }
  }

  finishTask() {
    this.vm.submitLink('optional', '', this.step)
  }

  get state() {
    if (this.vm.isUserTaskCompleted || this.vm.isTaskProcessFinish) return 1
    if (this.vm.isHuntingProcessStarted && this.task.activeStep) return 0
    else if (this.task.finished) return 1
    else return -1
  }
}
</script>
<style scoped>
.greenSenamatic--bg {
  background: var(--v-greenSenamatic-base);
}
.neutral20--bg {
  background: var(--v-neutral20-base);
}
.v-btn--disabled {
  background-image: none !important;
}
</style>
