import axios from "axios";
import jwt_decode from "jwt-decode";

type DecodedToken = {
  email: string,
  id: number,
  iat: number
}

class AuthService {
  login(username: string, password: string) {
    return axios
      .post(process.env.NX_APP_API_URL + '/api/v1/auth/login', {
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

  register(username: string, password: string) {
    return axios
      .post(process.env.NX_APP_API_URL + '/api/v1/auth/register', {
        "username": username,
        "password": password
      })
      .then(response => {
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  getCurrentUser(): { email: string, id: number } | void {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      const decoded = jwt_decode(JSON.parse(userStr)) as DecodedToken;
      return {email: decoded.email, id: decoded.id};
    }
  }

  activateAccount(token: string) {
    return axios.get(process.env.NX_APP_API_URL + `/api/v1/auth/activate?token=${token}`);
  }
}

export default new AuthService();
