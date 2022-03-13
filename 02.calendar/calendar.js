const argv = require('minimist')(process.argv.slice(2))
const year = argv.y ?? new Date().getFullYear()
const month = argv.m ?? new Date().getMonth() + 1
const weekday = ['日', '月', '火', '水', '木', '金', '土']
const monthLastDay = new Date(year, month, 0).getDate()

const header = () => {
  return `      ${month}月  ${year}`
}

const weekdays = () => {
  let weekdays = ''
  for (let i = 0; i < weekday.length; i++) {
    const suffix = weekday[i] === '土' ? '' : ' '
    weekdays += `${weekday[i]}${suffix}`
  }
  return weekdays
}

const days = () => {
  let day = 1
  let displayDays = ''
  displayDays += firstBlank()
  for (let i = 1; i <= monthLastDay; i++) {
    displayDays += displayDay(day)
    day++
  }
  return displayDays
}

const displayDay = (day) => {
  const suffix = isSunday(day) ? '\n' : ' '
  return `${padding(day.toString(), 2)}${suffix}`
}

const padding = (target, n) => String(target).padStart(n, ' ')

const isSunday = (day) => {
  return new Date(`${year}-${month}-${day}`).getDay() === 6
}

const firstBlank = () => {
  let blank = ''
  // 月の初日の曜日を表す数値を取得することで、余白の計算に利用する
  const repeatCount = new Date(`${year}-${month}-1`).getDay()
  if (repeatCount === 0) return ''
  for (let i = 0; i < repeatCount; i++) {
    blank += '   '
  }
  return blank
}

console.log(header())
console.log(weekdays())
console.log(days())
