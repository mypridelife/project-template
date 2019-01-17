export function getZuijin() {
  var zuijin = localStorage.getItem('zuijin')
  var zuijinArr = []
  if (zuijin) {
    zuijinArr = JSON.parse(zuijin)
  }
  return zuijinArr
}
export function setZuijin(val) {
  localStorage.setItem('zuijin', JSON.stringify(val))
}
