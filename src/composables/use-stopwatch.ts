import { ref, computed } from 'vue'
import { useFormatNumber } from '@/composables/use-format-number'

interface Params {
  elapsed?: number
  separator?: string,
  parse?: TransformFunction,
  msTimeout?: number
}

export const useStopwatch = (params: Params) => {
  const {
    elapsed = 0,
    separator = ':',
    parse = String,
    msTimeout = 1000
  } = params

  let _startTimestamp = 0
  let _timeoutId: NodeJS.Timer
  const _elapsedMs = ref(elapsed)

  const isRunning = ref(false)

  const { format } = useFormatNumber()

  const formatTime = computed(() => {
    const dateTime = new Date(_elapsedMs.value)

    const seconds = dateTime.getSeconds()
    const minutes = dateTime.getMinutes()
    const hours = Math.floor(_elapsedMs.value / (1000 * 60 * 60))

    const result = [hours, minutes, seconds].map(format).join(separator)

    return parse(result)
  })

  const _updateStartPoint = () => _startTimestamp = Date.now()

  const tick = () => {
    _elapsedMs.value += Date.now() - _startTimestamp

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

    _elapsedMs.value = elapsed
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
