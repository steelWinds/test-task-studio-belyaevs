export const useFormatNumber = (symbol: string = '0') => {
  const format = (num: number, pad: number = 2) => {
    return num.toString().padStart(pad, symbol);
  }

  return {
    format
  }
}
