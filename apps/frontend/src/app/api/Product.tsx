import axios from "axios";
import AuthService from "./Auth";

class ProductService {
  add(title: string, price: number, currency: string, description?: string) {
    return axios
      .post(process.env.NX_APP_API_URL + '/product/add', {
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

  myProducts() {
    return axios
      .post(process.env.NX_APP_API_URL + '/product/my-products', {
        "owner": AuthService.getCurrentUser()
      })
      .then(response => {
        if (response.data.redis) {
          const products: string[] = Object.values(response.data.redis);
          return products.map((product) => {
            return JSON.parse(product);
          })
        }
        return response.data;
      });
  }
}

export default new ProductService();
