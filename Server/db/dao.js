// dao.js
const sqlite3 = require('sqlite3')
const Promise = require('bluebird')

class Dao {
  constructor(dbFilePath) {
    this.db = new sqlite3.Database(dbFilePath, (err) => {
      if (err) {
        console.log('Could not connect to database', err)
      } else {
        console.log('Connected to database')
        // create the tables if they don't already exist
        this.db.serialize(() => {
            this.db.run('CREATE TABLE IF NOT EXISTS avatar( avatar_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, happy BLOB, mad BLOB, mocking BLOB )');
            this.db.run('CREATE TABLE IF NOT EXISTS building(building_id INTEGER, owner INTEGER, location_x INTEGER, location_y INTEGER, health INTEGER, name TEXT, PRIMARY KEY(building_id))');
            this.db.run('CREATE TABLE IF NOT EXISTS inventory ( inventory_id INTEGER, owner INTEGER, wood INTEGER, stone INTEGER, gold INTEGER, FOREIGN KEY(owner) REFERENCES user(user_id), PRIMARY KEY(inventory_id))');
            this.db.run('CREATE TABLE IF NOT EXISTS resource ( resource_id INTEGER PRIMARY KEY AUTOINCREMENT, location_x INTEGER, location_y INTEGER, type TEXT, amount INTEGER)');
            this.db.run('CREATE TABLE IF NOT EXISTS troop (troop_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, owner INTEGER, name TEXT, type INTEGER, location_x INTEGER, location_y INTEGER, health INTEGER, speed INTEGER, attack INTEGER, FOREIGN KEY(owner) REFERENCES user(user_id))');
            this.db.run('CREATE TABLE IF NOT EXISTS user ( user_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL UNIQUE, password TEXT NOT NULL, salt TEXT, first_name TEXT, last_name TEXT, email TEXT, avatar_id INTEGER, FOREIGN KEY(avatar_id) REFERENCES avatar(avatar_id) )');
        })
      }
    })
  }

  get(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, (err, result) => {
        if (err) {
          console.log('Error running sql: ' + sql)
          console.log(err)
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  }

  all(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, rows) => {
        if (err) {
          console.log('Error running sql: ' + sql)
          console.log(err)
          reject(err)
        } else {
          resolve(rows)
        }
      })
    })
  }

  run(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function (err) {
        if (err) {
          console.log('Error running sql ' + sql)
          console.log(err)
          reject(err)
        } else {
          resolve({ id: this.lastID })
        }
      })
    })
  }
}

module.exports = Dao
