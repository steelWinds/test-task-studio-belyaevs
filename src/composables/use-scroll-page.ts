export const useScrollPage = () => {
  const scrollToFullSize = () => {
    const scrollPageSize = Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    );
    const pageYSize = document.documentElement.clientHeight + window.scrollY

    if (scrollPageSize <= pageYSize) return

    window.scrollBy({
      top: scrollPageSize - pageYSize,
      behavior: 'smooth'
    })
  }

  return {
    scrollToFullSize
  }
}
