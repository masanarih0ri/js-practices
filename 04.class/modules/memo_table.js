const memoTableName = 'memos'
const CommonDatabase = require('./common_database.js')
const Enquirer = require('enquirer')

module.exports = class MemoTable {
  static async createTable () {
    const db = CommonDatabase.get()
    return new Promise((resolve, reject) => {
      try {
        db.run(`create table if not exists ${memoTableName} (
            id integer primary key autoincrement,
            body text
          )`)
        return resolve()
      } catch (error) {
        return reject(error)
      }
    })
  }

  static async save (input) {
    const db = CommonDatabase.get()
    return new Promise((resolve, reject) => {
      try {
        db.run(`insert into ${memoTableName}(body) values(?)`, input)
        return resolve()
      } catch (error) {
        return reject(error)
      }
    })
  }

  static async list () {
    const db = CommonDatabase.get()
    return new Promise((resolve, reject) => {
      try {
        db.each('select * from memos', (_err, row) => {
          console.log(`${row.body.split('\n')[0]}`)
        })
        return resolve()
      } catch (error) {
        return reject(error)
      }
    })
  }

  static async show () {
    const db = CommonDatabase.get()
    return new Promise((resolve, reject) => {
      try {
        db.all('select * from memos', (_err, rows) => {
          resolve(rows)
        })
      } catch (error) {
        return reject(error)
      }
    }).then((rows) => {
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
    const db = CommonDatabase.get()
    return new Promise((resolve, reject) => {
      try {
        db.all('select * from memos', (_err, rows) => {
          resolve(rows)
        })
      } catch (error) {
        return reject(error)
      }
    }).then((rows) => {
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
      return new Promise((resolve, reject) => {
        try {
          db.run(`delete from ${memoTableName} where id = ?`, answer.memo)
          return resolve()
        } catch (error) {
          return reject(error)
        }
      })
    })
  }
}
