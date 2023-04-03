import { useWindowScroll, useWindowSize } from '@vueuse/core'
import { computed } from 'vue'

export const useScrollPage = () => {
  const { y: windowYScroll } = useWindowScroll()
  const { height: wYSize } = useWindowSize()

  const overscrollY = computed(() => Math.floor(wYSize.value / 3) <= windowYScroll.value)

  const scrollToTop = () => {
    self?.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const scrollToFullSize = () => {
    if (!self?.document) return

    let pageScrollSize = Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    )
    const pageClientSize = document.documentElement.clientHeight
    const scrollTop = document.body.scrollTop

    const isTotallyScrolled = Math.abs(pageScrollSize - pageClientSize - scrollTop) < 1

    if (isTotallyScrolled) return

    self?.scrollTo({
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
