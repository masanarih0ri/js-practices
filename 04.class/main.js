process.stdin.setEncoding('utf8')
const MemoTable = require('./modules/memo_table.js')
const argv = require('minimist')(process.argv.slice(2))

MemoTable.createTable()

if (argv.l) {
  MemoTable.list()
} else if (argv.r) {
  MemoTable.show()
} else if (argv.d) {
  MemoTable.delete()
} else {
  const reader = require('readline').createInterface({
    input: process.stdin
  })
  const lines = []
  reader.on('line', (line) => {
    lines.push(line)
  })

  reader.on('close', () => {
    const input = lines.join('\n')
    MemoTable.save(input)
  })
}
