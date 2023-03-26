import { ref, reactive } from 'vue'
import { TimeData } from '@/composables/use-stopwatch/TimeData'

interface Params {
  elapsed?: number
  msTimeout?: number
  msFixed?: number
}

export const useStopwatch = (params: Params) => {
  const {
    elapsed = 0,
    msTimeout = 10,
    msFixed = 1
  } = params

  let _startTimestamp = 0
  let _timeoutId: NodeJS.Timer
  let _elapsedMs = elapsed


  const time = reactive(new TimeData())
  const isRunning = ref(false)

  const _updateStartPoint = () => _startTimestamp = Date.now()

  const _setTime = (ms?: number) => {
    _elapsedMs = ms ?? _elapsedMs

    const date = new Date(_elapsedMs)

    Object.assign(time, {
      ms: Math.floor(date.getMilliseconds() / 10 ** msFixed),
      s: date.getSeconds(),
      m: date.getMinutes(),
      hr: Math.floor(date.getTime() / (1000 * 60 * 60))
    })
  }

  const _tick = () => {
    _elapsedMs += Date.now() - _startTimestamp

    _setTime()

    _updateStartPoint()
  }

  const start = () => {
    isRunning.value = true

    _updateStartPoint()

    _timeoutId = setTimeout(function cl() {
      _tick()

      _timeoutId = setTimeout(cl, msTimeout)
    }, msTimeout)
  }

  const stop = () => {
    isRunning.value = false

    clearTimeout(_timeoutId)

    _setTime(elapsed)
  }

  const pause = () => {
    isRunning.value = false

    clearTimeout(_timeoutId)
  }

  _setTime()

  return {
    time,
    isRunning,
    start,
    pause,
    stop
  }
}
