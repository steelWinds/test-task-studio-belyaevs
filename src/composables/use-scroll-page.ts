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
    if (!w?.document) return

    let pageScrollSize = Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    )
    const pageClientSize = document.documentElement.clientHeight
    const scrollTop = document.body.scrollTop

    const isTotallyScrolled = Math.abs(pageScrollSize - pageClientSize - scrollTop) < 1

    console.log(pageScrollSize, pageClientSize, scrollTop)

    if (isTotallyScrolled) return

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
