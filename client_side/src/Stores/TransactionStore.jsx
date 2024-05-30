import apiService from "../Utils/apiService";

const useTransactionStore = () => {
  const getTransactions = async () => {
    try {
      const response = await apiService.byGetData("api/transactions");
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching transactions:", error);
      throw error;
    }
  };

  const createTransaction = async (transactionData) => {
    try {
      const response = await apiService.byPostData(
        "api/transactions",
        transactionData
      );
      return response.data;
    } catch (error) {
      console.error("Error creating transaction:", error);
      throw error;
    }
  };

  return {
    getTransactions,
    createTransaction,
  };
};

export default useTransactionStore;
