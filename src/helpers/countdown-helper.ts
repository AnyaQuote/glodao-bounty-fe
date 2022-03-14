import { takeWhile, mapTo } from 'rxjs/operators'
import { timer } from 'rxjs'

export class CountdownHelper {
  static setEndDate(endDate: any) {
    const countDownDate = new Date(endDate).getTime()
    let distance = 99999999999
    return timer(0, 1000).pipe(
      takeWhile(() => {
        return distance > 0
      }),
      mapTo(() => {
        const now = new Date().getTime()
        distance = countDownDate - now
        const days = Math.floor(distance / (1000 * 60 * 60 * 24))
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((distance % (1000 * 60)) / 1000)
        return {
          distance,
          days,
          hours,
          minutes,
          seconds,
        }
      })
    )
  }
}
