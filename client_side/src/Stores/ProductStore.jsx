import apiService from "../Utils/apiService";

const useProductStore = () => {
  const getProduct = async () => {
    try {
      const response = await apiService.byGetData("api/products");
      return response.data; // Ensure data is correctly returned
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  };

  const getProductId = async (id) => {
    try {
      const response = await apiService.byGetData("api/products/" + id);
      return response.data;
    } catch (error) {
      console.error("Error fetching product:", error);
      throw error;
    }
  };

  const deleteProduct = async (id) => {
    try {
      const response = await apiService.byDeleteData(`api/products/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error Deleting Product:", error);
      throw error;
    }
  };

  const createProduct = async (productData) => {
    try {
      const response = await apiService.byPostData("api/products", productData);
      return response.data;
    } catch (error) {
      console.error("Error creating product:", error);
      throw error;
    }
  };

  const updateProduct = async (id, updatedData) => {
    try {
      const response = await apiService.byPutData(
        `api/products/${id}`,
        updatedData
      );
      return response.data;
    } catch (error) {
      console.error("Error updating product:", error);
      throw error;
    }
  };

  return {
    getProduct,
    createProduct,
    deleteProduct,
    updateProduct,
    getProductId,
  };
};

export default useProductStore;
