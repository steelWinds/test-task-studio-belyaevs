<script setup lang="ts">
import { useTimer } from '@/composables/use-timer'
// @ts-ignore
import PlayIcon from '@/assets/triangle.svg?component'
// @ts-ignore
import StopIcon from '@/assets/square.svg?component'
// @ts-ignore
import PauseIcon from '@/assets/pause.svg?component'

interface Props {
  startPoint?: StartPoint;
}

const props = defineProps<Props>()

const {
  isRunning,
  formatTime,
  pause: onPause,
  start: onStart,
  stop: onStop,
} = useTimer(props.startPoint ?? [0, 0, 0, 0])
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
      <time class="text-[22px] text-gray transition-colors duration-200" :class="{'text-white': isRunning}">
        {{ formatTime || '00' }}
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

<style scoped lang="postcss">
.fade-enter-active,
.fade-leave-active {
  transition: all .2s linear;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
