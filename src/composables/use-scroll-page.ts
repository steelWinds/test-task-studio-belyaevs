export const useScrollPage = () => {
  const w = globalThis as any as Window

  const scrollToTop = () => {
    w?.scrollBy({
      top: 0,
      behavior: 'smooth'
    })
  }

  const scrollToFullSize = () => {
    const scrollPageSize = Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    );
    const pageYSize = document.documentElement.clientHeight + window.scrollY

    if (scrollPageSize <= pageYSize) return

    w?.scrollBy({
      top: scrollPageSize - pageYSize,
      behavior: 'smooth'
    })
  }

  return {
    scrollToFullSize,
    scrollToTop
  }
}
