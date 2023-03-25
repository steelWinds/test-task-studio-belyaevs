<script setup lang="ts">
import { computed } from 'vue'

import { useStopwatch } from '@/composables/use-stopwatch'
import { useFormatNumber } from '@/composables/use-format-number'
import PlayIcon from '@/assets/triangle.svg?component'
import StopIcon from '@/assets/square.svg?component'
import PauseIcon from '@/assets/pause.svg?component'

interface Props {
  elapsed?: number;
}

const props = defineProps<Props>()

const { format } = useFormatNumber()
const {
  isRunning,
  time,
  pause: onPause,
  start: onStart,
  stop: onStop,
} = useStopwatch({
  elapsed: props.elapsed,
})

const formatTime = computed(() => time.formatTime(format, ':').replace(/^[0+:?]+/gms, ''))
</script>

<template>
  <article class="w-full max-w-[225px] grid grid-rows-2 bg-dark-gray">
    <div
      id="timer"
      class="counter border-b-2 border-gray w-full grid place-content-center transition-colors duration-300"
      :class="{'border-white': isRunning}"
      role="timer"
      aria-controls="btn-group"
    >
      <time
        class="text-[22px] text-gray transition-colors duration-200 grid stopwatch-grid"
        :class="{'text-white': isRunning}"
      >
        {{ formatTime || '0' }}
      </time>
    </div>

    <div
      id="btn-group"
      role="controls"
      class="grid grid-cols-2 gap-12 place-self-center"
      aria-labelledby="timer"
    >
      <Transition name="fade" mode="out-in">
        <button
          v-if="isRunning"
          class=""
          @click="onPause"
        >
          <PauseIcon class="fill-gray transition-colors duration-200" :class="{'fill-white': isRunning}" />
        </button>

        <button
          v-else
          class=""
          @click="onStart"
        >
          <PlayIcon class="fill-gray transition-colors duration-200" :class="{'fill-white': isRunning}" />
        </button>
      </Transition>

      <button
        class=""
        :disabled="!isRunning"
        @click="onStop"
      >
        <StopIcon class="fill-gray transition-colors duration-200" :class="{'fill-white': isRunning}" />
      </button>
    </div>
  </article>
</template>

<style scoped>
.stopwatch-grid {
  grid-template-columns: repeat(4, auto);
}
</style>
