import axios from "axios";

class ApiService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_API_BASE,
    });

    this.api.interceptors.request.use((config) => {
      // Verifica se já temos as informações do usuário logado no localStorage
      const storedUser = localStorage.getItem("loggedInUser");
    
      const loggedInUser = JSON.parse(storedUser || '""');
    
      if (loggedInUser.token) {
        config.headers = {
          Authorization: `Bearer ${loggedInUser.token}`,
        };
      }
    
      return config;
    });
  }

  async signUp(user) {
    return await this.api.post("/signup", user);
  }

  async login(user) {
    return await this.api.post("/login", user);
  }

  async getRooms() {
    try {
      const res = await this.api.get('/rooms');
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }

  async getRoom(id) {
    try {
      const res = await this.api.get('/rooms/' + id);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }

  async createRoom(room) {
    try {
      const res = await this.api.post("/rooms", room);
      return res.data;
    } catch (err) {
      return console.log(err);
    }
  }

  async editRoom(id, room) {
    try {
      const res = await this.api.put("/rooms/" + id, room);
      return res.data;
    } catch (err) {
      return console.log(err);
    }
  }

  async deleteRoom(id) {
    try {
      const res = await this.api.delete("/rooms/" + id);
      return res.data;
    } catch (err) {
      return console.log(err);
    }
  }

  async createReview(id, review) {
    try {
      const res = await this.api.post("/rooms/"+id+"/reviews", review);
      return res.data;
    } catch (err) {
      return console.log(err);
    }
  }
}

export default new ApiService();
