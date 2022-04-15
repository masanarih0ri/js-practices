const sqlite3 = require('sqlite3')
const memoTableName = 'memos'

module.exports = class CommonDatabase {
  constructor () {
    this.database = new sqlite3.Database('./mydb.sqlite3')
  }

  get () {
    return this.database
  }

  static create (db) {
    return new Promise((resolve, reject) => {
      try {
        db.run(
          `create table if not exists ${memoTableName} (
          id integer primary key autoincrement,
          body text
          )`,
          resolve()
        )
      } catch (error) {
        return reject(error)
      }
    })
  }

  static insert (db, input) {
    return new Promise((resolve, reject) => {
      try {
        db.run(`insert into ${memoTableName}(body) values(?)`, input, resolve())
      } catch (error) {
        return reject(error)
      }
    })
  }

  static selectAll (db) {
    return new Promise((resolve, reject) => {
      try {
        db.all('select * from memos', (_err, rows) => {
          resolve(rows)
        })
      } catch (error) {
        return reject(error)
      }
    })
  }

  static delete (db, answer) {
    return new Promise((resolve, reject) => {
      try {
        db.run(`delete from ${memoTableName} where id = ?`, answer.memo, resolve())
      } catch (error) {
        return reject(error)
      }
    })
  }
}
