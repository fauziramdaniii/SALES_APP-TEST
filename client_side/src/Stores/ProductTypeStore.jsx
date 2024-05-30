import apiService from "../Utils/apiService";

const useProductTypeStore = () => {
  const getProductType = async () => {
    try {
      const response = await apiService.byGetData("api/product_type");
      return response.data; // Ensure data is correctly returned
    } catch (error) {
      console.error("Error fetching product_type:", error);
      throw error;
    }
  };

  const getProductTypeId = async (id) => {
    try {
      const response = await apiService.byGetData("api/product_type/" + id);
      return response.data;
    } catch (error) {
      console.error("Error fetching product:", error);
      throw error;
    }
  };

  const deleteProductType = async (id) => {
    try {
      const response = await apiService.byDeleteData(`api/product_type/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error Deleting Product:", error);
      throw error;
    }
  };

  const createProductType = async (productData) => {
    try {
      const response = await apiService.byPostData(
        "api/product_type",
        productData
      );
      return response.data;
    } catch (error) {
      console.error("Error creating product:", error);
      throw error;
    }
  };

  const updateProductType = async (id, updatedData) => {
    try {
      const response = await apiService.byPutData(
        `api/product_type/${id}`,
        updatedData
      );
      return response.data;
    } catch (error) {
      console.error("Error updating product:", error);
      throw error;
    }
  };

  return {
    getProductType,
    createProductType,
    deleteProductType,
    updateProductType,
    getProductTypeId,
  };
};

export default useProductTypeStore;
