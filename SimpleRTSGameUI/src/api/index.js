import axios from 'axios';

export default class ServiceClient {
  constructor() {
    this.instance = axios.create({
      baseURL: process.env.NODE_ENV === "development" ? "http://localhost:8080" : "http://localhost:8080",
      timeout: 10000, // 10 seconds
    });

    this.userEci = window.localStorage.getItem('rts-user-eci');
    this.token = window.localStorage.getItem('rts-token');
  }

  async register(body) {
    try {
      let response = await this.instance.post('/directory/user/register', body);
      let ret = response.data.directives[1].options;
      this.userEci = ret.eci;
      this.token = ret.token;
      window.localStorage.setItem('rts-user-eci', ret.eci);
      window.localStorage.setItem('rts-token', ret.token);
      return ret;
    }
    catch (e) {
      console.error(e);
    }
  }

  async login(username, password) {
    try {
      let data = {
        username: username,
        password: password
      }
      let response = await this.instance.post('/directory/user/login', data);
      let ret = response.data.directives[0].options;
      console.log(ret);
      this.userEci = ret.eci;
      this.token = ret.token;
      window.localStorage.setItem('rts-user-eci', ret.eci);
      window.localStorage.setItem('rts-token', ret.token);
      return ret;
    }
    catch (e) {
      console.error(e);
    }
  }

  async getUsers(id) {
    try {
      let response = await this.instance.get('/pillage_no_village.directory/users', {
        params: {
          id: id
        }
      })
      return response.data;
    }
    catch (e) {
      console.error(e);
    }
  }

  getGames() {
    return [
      { id: 1, name: 'level1', preview: window.location.origin + '/maps/level1.png', map: window.location.origin + '/maps/level1.json', description: "Simple 2 player map", maxPlayers: 2 },
      { id: 2, name: 'level2', preview: window.location.origin + '/maps/level2.png', map: window.location.origin + '/maps/level2.json', description: "Simple 4 player map", maxPlayers: 4 },
      { id: 3, name: 'level3', preview: window.location.origin + '/maps/level3.png', map: window.location.origin + '/maps/level3.json', description: "Simple 3 player map", maxPlayers: 3 }
    ]
  }

  async getCurrentGames(id) {
    try {
      let response = await this.instance.get('/pillage_no_village.directory/games', {
        params: {
          id: id
        }
      });
      return response.data;
    }
    catch (e) {
      console.error(e);
    }
  }

  async getUserInfo() {
    try {
      let response = await this.instance.get('/sky/cloud/' + this.userEci + '/pillage_no_village.user/user');
      return response.data;
    }
    catch (e) {
      console.error(e);
    }
  }

  async updateUser(attrs) {
    try {
      let data = {...attrs, token: this.token}
      let response = await this.instance.post('/sky/event/' + this.userEci + '/react-app/user/update', data);
      return response.data.directives[0].options;
    }
    catch (e) {
      console.error(e);
    }
  }

  async createGame(game) {
    try {
      let data = {
        token: this.token,
        id: game.id
      }
      let response = await this.instance.post('/sky/event/' + this.userEci + '/react-app/game/create', data)
      return response.data;
    }
    catch (e) {
      console.error(e);
    }
  }

  async joinGame(eci) {
    try {
      let data = {
        token: this.token,
        eci: eci
      }
      let response = await this.instance.post('/sky/event/' + this.userEci + '/react-app/game/join', data);
      return response.data.directives[0].options;
    }
    catch (e) {
      console.error(e);
    }
  }

  async getMyGame() {
    try {
      let response = await this.instance.get('/sky/cloud/' + this.userEci + '/pillage_no_village.user/game');
      return response.data;
    }
    catch (e) {
      console.error(e);
    }
  }
}
