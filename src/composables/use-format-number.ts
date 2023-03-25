export const useFormatNumber = (pad: number = 2, symbol: string = '0') => {
  const format = (num: number) => {
    return num.toString().padStart(pad, symbol);
  }

  return {
    format
  }
}
