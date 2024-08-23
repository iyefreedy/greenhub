import { LoginCredential, RegisterCredential } from "@/types";

export default {
  async register(credential: RegisterCredential) {
    return await fetch("http://localhost:5000/api/register", {
      method: "POST",
      body: JSON.stringify(credential),
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  async login(credential: LoginCredential) {
    return await fetch("http://localhost:5000/api/login", {
      method: "POST",
      body: JSON.stringify(credential),
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  async authorize(accessToken?: string) {
    return await fetch("http://localhost:5000/api/authorize", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
  async createSeller(data: any, accessToken?: string) {
    const response = await fetch("http://localhost:5000/api/sellers", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response;
  },
  async createProduct(data: FormData, accessToken?: string) {
    const response = await fetch("http://localhost:5000/api/products", {
      method: "POST",
      body: data,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response;
  },
  async getProductsSeller(accessToken?: string) {
    const response = await fetch("http://localhost:5000/api/seller/products", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response;
  },
  async getProducts(query?: string) {
    console.log(query);

    const response = await fetch(
      `http://localhost:5000/api/products?query=${query}`
    );
    return response;
  },
  async getProduct(id: number) {
    const response = await fetch(`http://localhost:5000/api/products/${id}`);

    return response;
  },
};
