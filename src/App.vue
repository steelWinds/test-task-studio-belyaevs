<script setup lang="ts">
import { ref, watch } from 'vue'
import { useScrollPage } from '@/composables/use-scroll-page'
import VCounterCard from '@/components/VCounterCard.vue'
// @ts-ignore
import PlusSvg from '@/assets/plus.svg?component'

const { scrollToFullSize } = useScrollPage()

const timers = ref<number[]>([
  432_000_000,
  160_000,
  1_532_000,
  5_415_000,
  4_833_000,
  3_546_600
])

const onAddTimer = async () => {
  timers.value.push(0)
}

watch(timers, scrollToFullSize, { deep: true, flush: 'post' })
</script>

<template>
  <main class="h-auto w-full flex place-content-center p-3 py-12">
    <article class="counters-grid grid gap-[50px]">
      <TransitionGroup name="list-slide">
        <VCounterCard
          v-for="(elapsed, id) of timers"
          :key="id"
          :elapsed="elapsed"
        />

        <button
          key="btn"
          class="w-full max-w-[225px] grid bg-dark-gray place-content-center"
          @click="onAddTimer"
        >
          <PlusSvg class="fill-gray" />
        </button>
      </TransitionGroup>
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
