const bcrypt = require('bcrypt');
const saltRounds = 10;
// Dabase Management System Class

class Dbms {
  constructor(dao) {
    this.dao = dao;
  }
  async loginUser(username, password) {
    let user = await this.getUserByUsername(username);
    let hashedPass = await bcrypt.hash(password, user.salt);
    if (hashedPass === user.password) {
      return user;
    }
    return null;
  }
  async registerUser(username, plainPassword, fName, lName, email) {
    let salt = await bcrypt.genSalt(saltRounds);
    let hashedPass = await bcrypt.hash(plainPassword, salt);

    let sql = `INSERT INTO user
      (username, password, salt, first_name, last_name, email)
      VALUES (?, ?, ?, ?, ?, ?)`;

    // Returns the id of the user
    // looks like this { id: 1 }
    return this.dao.run(sql, [username, hashedPass, salt, fName, lName, email])
  }
  async getUserById(id) {
    return this.dao.get('SELECT * FROM user WHERE id = ?', [id]);
  }
  async getUserByUsername(username) {
    return await this.dao.get('SELECT * FROM user WHERE username = ?', [username]);
  }
  async getUsers() {
    return await this.dao.all('SELECT * FROM user');
  }
  async getTroops() {
    return await this.dao.all('SELECT * FROM troop');
  }
  async getTroop(id) {
    return await this.doa.get('SELECT * FROM troop WHERE troop_id = ?', [id]);
  }
  async addTroop(name, type, health, speed, attack) {
    let sql = `INSERT INTO troop
      (name, type, health, speed, attack)
      VALUES (?, ?, ?, ?, ?)`;
    return this.dao.run(sql, [name, type, health, speed, attack]);
  }
  async getAvatar(id) {
    return await this.dao.get('SELECT * FROM avatar WHERE user_id = ?', [id]);
  }
  async setAvatar(id, happy, mad, mocking) {
    let sql = `INSERT OR REPLACE INTO avatar
      (user_id, happy, mad, mocking)
      VALUES (?, ?, ?, ?)`;
    return await this.dao.run(sql, [id, happy, mad, mocking]);
  }

  async getUser(id) {
    return await this.dao.get('SELECT username, first_name, last_name, email FROM user WHERE user_id = ?', [id]);
  }

  async updateUser(id, firstName, lastName, email) {
    let sql = 'UPDATE user SET first_name = ?, last_name = ?, email = ? WHERE user_id = ?';
    return await this.dao.run(sql, [firstName, lastName, email, id]);
  }
}

module.exports = Dbms;
