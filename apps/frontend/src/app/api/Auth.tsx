import axios from "axios";
import jwt_decode from "jwt-decode";

const API_URL_LOGIN: string = "http://localhost:3001/api/auth/login";
type DecodedToken = {
  email: string,
  iat: number
}

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

  getCurrentUser(): string | void {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      const decoded = jwt_decode(JSON.parse(userStr)) as DecodedToken;
      return decoded.email;
    }
  }
}

export default new AuthService();
