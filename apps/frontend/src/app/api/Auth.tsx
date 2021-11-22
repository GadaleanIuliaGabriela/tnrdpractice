import axios from "axios";

const API_URL_LOGIN: string = "http://localhost:3001/api/auth/login";

class AuthService {
  login(username: string, password: string) {
    return axios
      .post(API_URL_LOGIN, {
        "username": username,
        "password": password
      })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data.token));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }
}

export default new AuthService();
