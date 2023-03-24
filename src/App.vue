<script setup lang="ts">
import { ref } from 'vue'
import VCounterCard from '@/components/VCounterCard.vue'
// @ts-ignore
import PlusSvg from '@/assets/plus.svg?component'

const timers = ref<StartPoint[]>([
  [10, 4, 58, 0],
  [15, 20, 20, 0],
  [0, 25, 42, 0],
  [0, 0, 32, 0],
])

const onAddTimer = () => {
  timers.value.push([0, 0, 0, 0])
}
</script>

<template>
  <main class="h-auto w-full flex place-content-center p-3">
    <article class="counters-grid grid gap-[50px] mt-12">
      <VCounterCard
        v-for="(point, id) of timers"
        :key="id"
        :start-point="point"
      />

      <button
        class="w-full max-w-[225px] grid bg-dark-gray place-content-center"
        @click="onAddTimer"
      >
        <PlusSvg class="fill-gray" />
      </button>
    </article>
  </main>
</template>

<style scoped lang="postcss">
.counters-grid {
  grid-template-columns: repeat(3, minmax(auto, 225px));
  grid-auto-rows: minmax(auto, 120px);

  @media (width < 764px) {
    grid-template-columns: repeat(1, minmax(auto, 225px));
  }
}
</style>
