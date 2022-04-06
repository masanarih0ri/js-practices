const sqlite3 = require('sqlite3')

let database

module.exports = class CommonDatabase {
  static init () {
    database = new sqlite3.Database('./mydb.sqlite3')
  }

  static get () {
    return database
  }
}
