export function getDefaultIndex (arr) {
  let id = -1
  arr.forEach((item, index) => {
    if (item.default) {
      id = index
    }
  })
  return id
}
