// services/api.service.js

const axios = require("axios");

class ApiService {
  constructor() {
    this.api = axios.create({
      baseURL: "https://ih-crud-api.herokuapp.com",
    });
  }

  getAllCharacters = () => {
    return this.api.get("/characters");
  };

  deleteCharacter = (characterId) => {
    return this.api.delete(`/characters/${characterId}`);
  };
}

module.exports = ApiService;
