import axios from "axios";
import AuthService from "./Auth";

class ProductService {
  add(title: string, price: number, currency: string, description?: string) {
    const user = AuthService.getCurrentUser();
    return axios
      .post(process.env.NX_APP_API_URL + '/api/v1/products', {
        "title": title,
        "price": +price,
        "currency": currency,
        "owner": user?.email ? user.email : "",
        "description": description,
      })
      .then(response => {
        return response.data;
      });
  }

  myProducts() {
    const user = AuthService.getCurrentUser();
    if (user) {
      return axios
        .get(process.env.NX_APP_API_URL + `/api/v1/users/${user.id}/products`)
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
    return null
  }

}

export default new ProductService();
