import { snackController } from '@/components/snack-bar/snack-bar-controller'
import { apiService } from '@/services/api-service'
import { authStore } from '@/stores/auth-store'
import { keys } from 'lodash-es'
import { action, computed, IReactionDisposer, observable, reaction } from 'mobx'
import moment from 'moment'

export enum HUNTING {
  start,
  hunting,
  finish,
}

export interface SharePerson {
  avatar: string
  name: string
  time: string
  link: string
}

export class BountyDetailViewModel {
  @observable taskId = ''
  @observable status: HUNTING = HUNTING.start
  @observable hunters: any = []

  @observable tasks: any = {}
  @observable hunterId = authStore.user?.hunter?.id ?? ''

  @observable applies: any = {}

  @observable applyStepData: any = {}

  @observable statistical = {
    total: 100,
    daily: 10000,
    twitter: 100000,
  }

  disposes: IReactionDisposer[] = []

  constructor() {
    this.disposes = [
      reaction(
        () => this.taskId,
        () => this.handleTaskIdChange()
      ),
      reaction(
        () => this.hunterId,
        () => this.hunterIdChange()
      ),
    ]
  }

  handleTaskIdChange = async () => {
    try {
      this.tasks = await apiService.tasks.findOne(this.taskId)

      let twitter = this.tasks.data.twitter
      let telegram = this.tasks.data.telegram

      twitter = twitter.map((twitterTask) => {
        return twitterTask.type !== 'follow'
          ? {
              type: twitterTask.type,
              finished: false,
              link: '',
            }
          : {
              type: twitterTask.type,
              finished: false,
            }
      })
      telegram = telegram.map((twitterTask) => {
        return twitterTask.type !== 'follow'
          ? {
              type: twitterTask.type,
              finished: false,
              link: '',
            }
          : {
              type: twitterTask.type,
              finished: false,
            }
      })
      this.applyStepData = {
        twitter,
        telegram,
      }

      await this.initilization()
    } catch (error) {
      snackController.error(error as string)
    }
  }

  async initilization() {
    try {
      if (!this.hunterId) {
        this.status = HUNTING.start
        return
      }
      const res = (await apiService.applies.find({
        'task.id': this.taskId,
        'hunter.id': this.hunterId,
      })) as any
      if (res) {
        this.applies = res[0]
        this.applyStepData = this.applies.data
        this.status = HUNTING.hunting
      }
    } catch (error) {
      snackController.error(error as string)
    }
  }

  @action statusHunting() {
    this.tasks.data.forEach((objects) => {
      const allComplete = Object.values(objects).every((object: any) => object.finished)
      if (allComplete) this.status = HUNTING.finish
    })
  }

  @computed get twitterTasks() {
    const twitter = this.tasks.data?.twitter
    const applies = this.applyStepData?.twitter

    if (applies && twitter) {
      this.applyStepData.twitter.forEach((twitterInfo, index) => {
        twitter[index].finished = twitterInfo.finished
      })
      return twitter
    }
    return []
  }

  @computed get twitters() {
    return this.tasks.data?.twitter ?? []
  }

  getStatus(status: any) {
    if (!status || !this.twitterTasks.status) {
      return false
    }
    return this.twitterTasks.status.finished
  }

  @action injectTaskCompleted() {
    const objectKeys = keys(this.tasks.data)
    objectKeys.forEach((key) => {
      const objects = this.tasks.data[key]
      objects.forEach((object) => {
        const ob = this.applies[key].find((e) => e.type === object.type)
        object.finished = ob.finished
      })
    })
  }

  createApplies() {
    const objectKeys = keys(this.tasks.data)
    this.applies = []
    objectKeys.forEach((key) => {
      const objectTasksByKey = this.tasks.data[key].map((e) => {
        return e.type !== 'follow'
          ? {
              type: e.type,
              finished: false,
              link: '',
            }
          : {
              type: e.type,
              finished: false,
            }
      })
      this.applies[key] = objectTasksByKey
    })
  }

  @action.bound getStatusApply(twitterTask: any) {
    const type = twitterTask.type
    return this.applies.twitterTasks.find((e) => e.type === type).finished
  }

  handleTasksChange() {
    let twitterTasks = this.tasks.data.twitter
    let telegramTasks = this.tasks.data.telegram

    twitterTasks = twitterTasks.map((twitterTask) => {
      return twitterTask.type !== 'follow'
        ? {
            type: twitterTask.type,
            finished: false,
            link: '',
          }
        : {
            type: twitterTask.type,
            finished: false,
          }
    })
    telegramTasks = telegramTasks.map((twitterTask) => {
      return twitterTask.type !== 'follow'
        ? {
            type: twitterTask.type,
            finished: false,
            link: '',
          }
        : {
            type: twitterTask.type,
            finished: false,
          }
    })

    this.applies = { twitterTasks, telegramTasks }
  }

  hunterIdChange() {
    console.log(this.hunterId ?? 'jdfhgiud')
  }

  @action taskIdChange(taskId: string) {
    this.taskId = taskId
  }

  @action.bound startHunting() {
    if (this.status === HUNTING.start) {
      this.status = HUNTING.hunting
      this.hunting()
    }
  }

  async hunting() {
    //
  }

  @action.bound startFlow(type: string) {
    switch (type) {
      case 'follow':
        break
      case 'like':
        this.likeTwitter()
        break
      default:
        break
    }
  }

  likeTwitter() {
    //
  }

  followTwitter() {
    //
  }

  @computed get percent() {
    if (!this.tasks?.maxParticipant) {
      return 0
    }
    return (900 / this.tasks?.maxParticipant) * 100
  }

  @computed get hunterList() {
    return this.hunters.map((hunter) => {
      const info = hunter.hunter
      return {
        avatar: info.metadata.avatar,
        name: info.name,
        time: moment(info.createdAt),
        link: '',
      }
    })
  }
}
