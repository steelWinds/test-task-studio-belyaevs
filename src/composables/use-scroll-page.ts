import { useWindowScroll, useWindowSize } from '@vueuse/core'
import { computed } from 'vue'

export const useScrollPage = () => {
  const w = globalThis as any as Window

  const { y: windowYScroll } = useWindowScroll()
  const { height: wYSize } = useWindowSize()

  const overscrollY = computed(() => Math.floor(wYSize.value / 3) <= windowYScroll.value)

  const scrollToTop = () => {
    w?.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const scrollToFullSize = () => {
    const pageScrollSize = w?.document.documentElement.scrollHeight ?? 0

    if (pageScrollSize <= wYSize.value) return

    w?.scrollTo({
      top: pageScrollSize,
      behavior: 'smooth'
    })
  }

  return {
    scrollToFullSize,
    scrollToTop,
    overscrollY
  }
}
