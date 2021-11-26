import axios from "axios";
import AuthService from "./Auth";

const API_URL: string = "http://localhost:3001/product";

class ProductService {
  add(title: string, price: number, currency: string, description?: string) {
    return axios
      .post(API_URL + '/add', {
        "title": title,
        "price": +price,
        "currency": currency,
        "owner": AuthService.getCurrentUser(),
        "description": description,
      })
      .then(response => {
        return response.data;
      });
  }
}

export default new ProductService();
