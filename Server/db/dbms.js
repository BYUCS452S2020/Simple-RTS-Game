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
    return hashedPass === user.password;
  }
  async registerUser(username, plainPassword, fName, lName, avatarId = 1) {
    let salt = await bcrypt.genSalt(saltRounds);
    let hashedPass = await bcrypt.hash(plainPassword, salt);

    let sql = `INSERT INTO user
      (username, password, salt, first_name, last_name, avatar_id)
      VALUES (?, ?, ?, ?, ?, ?)`;

    // Returns the id of the user
    // looks like this { id: 1 }
    return this.dao.run(sql, [username, hashedPass, salt, fName, lName, avatarId])
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
    return await this.dao.get('SELECT * FROM avatar WHERE avatar_id = ?', [id]);
  }
}

module.exports = Dbms;
