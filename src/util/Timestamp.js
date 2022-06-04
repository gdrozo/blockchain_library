function toStringDate(date) {
  return new Date(date._hex * 1000).toDateString()
}

function getDate(date) {
  return new Date(date._hex * 1000)
}

export { toStringDate, getDate }
