<script setup lang="ts">
import { defineProps } from 'vue'
import { useTimer } from '@/composables/use-timer'
import PlayIcon from '@/assets/triangle.svg?component'
import StopIcon from '@/assets/square.svg?component'
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
      class="counter border-b-2 border-gray w-full grid place-content-center"
      :class="{'border-white': isRunning}"
      role="timer"
      aria-controls="btn-group"
    >
      <time class="text-[22px] text-gray" :class="{'text-white': isRunning}">
        {{ formatTime || '00' }}
      </time>
    </div>

    <div
      id="btn-group"
      role="controls"
      class="grid grid-cols-2 gap-12 place-self-center"
      aria-labelledby="timer"
    >
      <button
        v-if="isRunning"
        class=""
        :disabled="!isRunning"
        @click="onPause"
      >
        <PauseIcon class="fill-gray" :class="{'fill-white': isRunning}" />
      </button>

      <button
        v-else
        class=""
        @click="onStart"
      >
        <PlayIcon class="fill-gray" :class="{'fill-white': isRunning}" />
      </button>

      <button
        class=""
        @click="onStop"
      >
        <StopIcon class="fill-gray" :class="{'fill-white': isRunning}" />
      </button>
    </div>
  </article>
</template>
