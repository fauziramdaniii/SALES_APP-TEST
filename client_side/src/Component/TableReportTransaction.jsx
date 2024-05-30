import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { Button, Form } from "react-bootstrap";
import useReportTransactionStore from "../Stores/reportTransactionStore";

function TableReportTransactionStore() {
  const { getReportTransaction } = useReportTransactionStore();
  const [reportData, setReportData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const fetchReportData = async () => {
    try {
      const data = await getReportTransaction(startDate, endDate);
      console.log(data);
      setReportData(data);
    } catch (error) {
      console.error("Error fetching report data:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchReportData();
  };

  const columns = [
    {
      name: "Product Type",
      selector: (row) => row.product_type_name,
      sortable: true,
    },
    {
      name: "Total Transactions",
      selector: (row) => row.total_transactions,
      sortable: true,
    },
  ];

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formStartDate">
          <Form.Label>Start Date</Form.Label>
          <Form.Control
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formEndDate">
          <Form.Label>End Date</Form.Label>
          <Form.Control
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Generate Report
        </Button>
      </Form>

      <div className="my-5">
        <DataTable columns={columns} data={reportData} fixedHeader pagination />
      </div>
    </>
  );
}

export default TableReportTransactionStore;
