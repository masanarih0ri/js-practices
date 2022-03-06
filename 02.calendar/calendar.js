const argv = require('minimist')(process.argv.slice(2));
const year = argv.y ? argv.y : new Date().getFullYear()
const month = argv.m ? argv.m : new Date().getMonth() + 1
const weekday = ['日', '月', '火', '水', '木', '金', '土']
const month_last_day = new Date(year, month, 0).getDate()

const header = () => {
  return `      ${month}月  ${year}`
}

const weekdays = () => {
  let weekdays = ''
  for (let i = 0; i < weekday.length; i++) {
    suffix = weekday[i] === '土' ? '' : ' '
    weekdays += `${weekday[i]}${suffix}`
  }
  return weekdays
}

const days = () => {
  let day = 1
  let display_days = ''
  display_days += first_blank()
  for (let i = 1; i <= month_last_day; i++) {
    display_days += display_day(day)
    day++
  }
  return display_days
}

const display_day = (day) => {
  const suffix = is_sunday(day) ? "\n" : ' '
  return  `${padding(day.toString(), 2)}${suffix}`
}

const padding = (target, n) => String(target).padStart(n, ' ')

const is_sunday = (day) => {
  return new Date(`${year}-${month}-${day}`).getDay() === 6
}

const first_blank = () => {
  let blank = ''
  // 月の初日の曜日を表す数値を取得することで、余白の計算に利用する
  const repeat_count = new Date(`${year}-${month}-1`).getDay()
  if (repeat_count === 0) return ''
  for (let i = 0; i < repeat_count; i++) {
    blank += '   '
  }
  return blank
}

console.log(header())
console.log(weekdays())
console.log(days())