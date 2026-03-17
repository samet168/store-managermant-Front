import api from "./api";

export const getProducts = async () => {
    try {
        const response = await api.get("/products");
        return response.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};


export const getCategories = async () => {
    try {
        const response = await api.get("/categories");
        return response.data;
    } catch (error) {
        console.error("Error fetching product:", error);
        throw error;
    }
};

// ProductServices.js

export const AppProducts = async (formData, token) => {
  try {
    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description || "");
    data.append("price", formData.price);
    data.append("quantity", formData.quantity);
    data.append("category_id", formData.category_id);
    data.append("status", formData.status || "active");
    if (formData.image) data.append("image", formData.image);

    const response = await api.post("/admin/products", data, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}` // ប្រសិនបើ Laravel API ត្រូវ auth
      },
    });

    return response.data;
  } catch (error) {
    console.error("Add product failed:", error);
    throw error;
  }
};