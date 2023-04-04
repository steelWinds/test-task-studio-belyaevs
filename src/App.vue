<script setup lang="ts">
import { ref, nextTick, onMounted } from 'vue'
import { useScrollPage } from '@/composables/use-scroll-page'
import { useEventListener, useVibrate } from '@vueuse/core'
import { TimerUnit } from '@/utils/classes/TimerUnit'
import VCounterCard from '@/components/VCounterCard.vue'
import PWAPrompt from '@/components/PWAPrompt.vue'
import VCircleBtn from '@/components/VCircleBtn.vue'
import PlusIcon from '@/assets/plus.svg?component'
import ArrowUpIcon from '@/assets/arrow-up.svg?component'

const { scrollToFullSize, scrollToTop, overscrollY } = useScrollPage()

const timers = ref<TimerUnit[]>([])

const onAddTimer = () => {
  timers.value.push(new TimerUnit(0))

  nextTick(scrollToFullSize)
}

const onRemoveTimer = (id: number) => {
  timers.value.splice(id, 1)
}

onMounted(() => {
  if (!globalThis.document) return

  const { vibrate } = useVibrate({ pattern: 100 })

  useEventListener(globalThis.document, 'pointerup', () => {
    vibrate()
  })
})
</script>

<template>
  <Transition name="fade" mode="out-in">
    <PWAPrompt />
  </Transition>

  <main class="h-auto w-full flex place-content-center p-3 py-12 relative">
    <TransitionGroup
      name="list-slide"
      tag="article"
      class="counters-grid grid gap-[50px]"
    >
      <VCounterCard
        v-for="({elapsed, id}, idx) of timers"
        :key="id"
        :elapsed="elapsed"
        @remove="() => onRemoveTimer(idx)"
      />

      <button
        class="w-full min-h-[120px] max-w-[225px] grid place-content-center bg-dark-gray group/btn"
        @click="onAddTimer()"
      >
        <PlusIcon class="fill-white group-active/btn:scale-75 duration-200" />
      </button>
    </TransitionGroup>

    <Transition name="fade">
      <VCircleBtn
        v-show="overscrollY"
        class="
          w-14 sm:w-16
          fixed
          bottom-6 sm:bottom-8
          left-6 sm:left-8
        "
        @click="scrollToTop"
      >
        <ArrowUpIcon class="fill-white group-active/btn:scale-75 duration-200" />
      </VCircleBtn>
    </Transition>
  </main>
</template>

<style scoped lang="postcss">
.counters-grid {
  grid-template-columns: repeat(3, minmax(auto, 225px));
  grid-auto-rows: minmax(auto, 120px);

  @media (width < 924px) {
    grid-template-columns: repeat(2, minmax(auto, 225px));
  }

  @media (width < 764px) {
    grid-template-columns: repeat(1, minmax(auto, 225px));
  }
}
</style>
