export const numberFormatter = number => {
  //parsing to float is okay because we are not multiplying or dividing by decimals
  //used for display purpose only
  return Number(parseFloat(number / 100)).toLocaleString('en', {
    minimumFractionDigits: 2
  })
}
