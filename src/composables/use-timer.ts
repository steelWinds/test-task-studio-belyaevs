import { ref, computed } from 'vue'
import { useFormatNumber } from '@/composables/use-format-number'

interface Params {
  timestamp?: number
  separator?: string,
  segments?: boolean,
  parse?: TransformFunction,
  msTimeout?: number
}

export const useTimer = (params: Params) => {
  const {
    timestamp = 0,
    separator = ':',
    segments = false,
    parse = String,
    msTimeout = 1000
  } = params

  let _start = 0
  let _timeoutId: NodeJS.Timer
  const _timer = ref(timestamp)

  const isRunning = ref(false)

  const { format } = useFormatNumber()

  const formatTime = computed(() => {
    const dateTime = new Date(_timer.value)

    const seconds = dateTime.getSeconds()
    const minutes = dateTime.getMinutes()
    const hours = Math.floor(_timer.value / (1000 * 60 * 60))

    console.log(format(hours))

    const result = [hours, minutes, seconds].map(format).join(separator)

    return parse(result)
  })

  const _updateStartPoint = () => _start = Date.now()

  const tick = () => {
    _timer.value += Date.now() - _start

    _updateStartPoint()
  }

  const start = () => {
    isRunning.value = true

    _updateStartPoint()

    const cl = () => {
      tick()

      _timeoutId = setTimeout(cl, msTimeout)
    }

    _timeoutId = setTimeout(cl, msTimeout)
  }

  const stop = () => {
    isRunning.value = false

    clearTimeout(_timeoutId)

    _timer.value = timestamp
  }

  const pause = () => {
    isRunning.value = false

    clearTimeout(_timeoutId)
  }

  return {
    formatTime,
    isRunning,
    start,
    pause,
    stop
  }
}
