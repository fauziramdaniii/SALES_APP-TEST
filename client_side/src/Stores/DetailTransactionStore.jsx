import apiService from "../Utils/apiService";

const useDetailTransactionStore = () => {
  const getDetailTransactionByTransactionId = async (idTransaction) => {
    try {
      const response = await apiService.byGetData(
        `api/detail_transactions/${idTransaction}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching detail transactions:", error);
      throw error;
    }
  };

  return {
    getDetailTransactionByTransactionId,
  };
};

export default useDetailTransactionStore;
