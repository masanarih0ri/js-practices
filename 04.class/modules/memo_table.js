const CommonDatabase = require('./common_database.js')
const Enquirer = require('enquirer')

module.exports = class MemoTable {
  static createTable () {
    const db = new CommonDatabase().get()
    CommonDatabase.create(db)
  }

  static save (input) {
    const db = new CommonDatabase().get()
    CommonDatabase.insert(db, input)
  }

  static list () {
    const db = new CommonDatabase().get()
    CommonDatabase.selectAll(db)
      .then((rows) => {
        rows.forEach(row => {
          console.log(`${row.body.split('\n')[0]}`)
        })
      })
  }

  static async show () {
    const db = new CommonDatabase().get()
    CommonDatabase.selectAll(db)
      .then((rows) => {
        const memos = []
        rows.forEach(row => {
          memos.push(row)
        })
        return memos
      }).then(async (memos) => {
        const choices = []
        memos.forEach((memo) => {
          choices.push({
            id: memo.id,
            name: memo.body.split('\n')[0],
            value: memo.body
          })
        })
        const questions = {
          type: 'select',
          name: 'memo',
          message: 'Choose a note you want to see:',
          choices: choices,
          result () {
            return this.focused.value
          }
        }
        const answer = await Enquirer.prompt(questions)
        console.log(answer.memo)
      })
  }

  static async delete () {
    const db = new CommonDatabase().get()
    CommonDatabase.selectAll(db)
      .then((rows) => {
        const memos = []
        rows.forEach(row => {
          memos.push(row)
        })
        return memos
      }).then(async (memos) => {
        const choices = []
        memos.forEach((memo) => {
          choices.push({
            id: memo.id,
            name: memo.body.split('\n')[0],
            value: memo.body
          })
        })
        const questions = {
          type: 'select',
          name: 'memo',
          message: 'Choose a note you want to delete:',
          choices: choices,
          result () {
            return this.focused.id
          }
        }
        const answer = await Enquirer.prompt(questions)
        CommonDatabase.delete(db, answer)
      })
  }
}
