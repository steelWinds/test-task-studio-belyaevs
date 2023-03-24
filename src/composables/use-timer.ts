import { ref, computed } from 'vue'

export const useTimer = (startPoint: StartPoint, ms: number = 1000) => {
  let _start = 0
  let _timeoutId: NodeJS.Timer
  const _timer = ref(new Date().setHours(...startPoint))

  const isRunning = ref(false)

  const formatTime = computed(() => {
    const formatStr = new Intl.DateTimeFormat('en', {
      minute: "numeric",
      second: "numeric",
      hour: "numeric",
      formatMatcher: 'basic',
      hourCycle: 'h23'
    }).format(_timer.value)

    const result = formatStr.match(/[0-9][1-9]+|[1-9][0-9]+|[0-9]+$$/gms)?.join(':')

    return result
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

      _timeoutId = setTimeout(cl, ms)
    }

    _timeoutId = setTimeout(cl, ms)
  }

  const stop = () => {
    isRunning.value = false

    clearTimeout(_timeoutId)

    _timer.value = new Date().setHours(...startPoint)
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
