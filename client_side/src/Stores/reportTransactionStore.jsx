import apiService from "../Utils/apiService";

const useReportTransactionStore = () => {
  const getReportTransaction = async (startDate, endDate) => {
    try {
      const response = await apiService.byGetData(
        `api/transactions-by-product-type?startDate=${startDate}&endDate=${endDate}`
      );
      console.log(response);
      return response.data; // Ensure data is correctly returned
    } catch (error) {
      console.error("Error fetching report transactions:", error);
      throw error;
    }
  };

  return {
    getReportTransaction,
  };
};

export default useReportTransactionStore;
