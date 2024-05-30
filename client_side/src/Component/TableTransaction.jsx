import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import DataTable from "react-data-table-component";
import useTransactionStore from "../Stores/TransactionStore";
import useProductStore from "../Stores/ProductStore";
import useDetailTransactionStore from "../Stores/DetailTransactionStore";
import { Button, Modal, Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function TableTransaction() {
  const { getTransactions, createTransaction } = useTransactionStore();
  const { getProduct } = useProductStore();
  const { getDetailTransactionByTransactionId } = useDetailTransactionStore();
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  const [detailsShow, setDetailsShow] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState({
    date: "", // Inisialisasi dengan string kosong
    details: [{ id_product: "", quantity: "" }],
  });
  const [detailTransaction, setDetailTransaction] = useState([]);

  const handleClose = () => setShow(false);
  const handleDetailsClose = () => setDetailsShow(false);
  const handleShow = () => setShow(true);
  const handleDetailsShow = () => setDetailsShow(true);

  useEffect(() => {
    fetchTransactions();
    fetchProducts();
  }, []);

  const fetchTransactions = async () => {
    const transactionList = await getTransactions();
    setTransactions(transactionList);
    setFilteredTransactions(transactionList);
  };

  const fetchProducts = async () => {
    const productList = await getProduct();
    setProducts(productList);
  };

  const handleSubmit = async () => {
    // Konversi format tanggal sebelum menyimpan
    const formattedDate = format(
      new Date(currentTransaction.date),
      "dd-MM-yyyy"
    );
    try {
      await createTransaction({ ...currentTransaction, date: formattedDate });
      fetchTransactions();
      handleClose();
      toast.success("Transaction added successfully!");
    } catch (error) {
      toast.error("Failed to add transaction.");
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    if (e.target.value !== "") {
      const filteredData = transactions.filter((transaction) =>
        transaction.date.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setFilteredTransactions(filteredData);
    } else {
      setFilteredTransactions(transactions);
    }
  };

  const handleDetails = async (idTransaction) => {
    const details = await getDetailTransactionByTransactionId(idTransaction);
    setDetailTransaction(details);
    handleDetailsShow();
  };

  const columns = [
    {
      name: "No",
      selector: (row, index) => index + 1,
    },
    {
      name: "Date",
      selector: (row) => row.date, // Tetap gunakan row.date jika ingin menampilkan di format lain
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <Button variant="info" onClick={() => handleDetails(row.id)}>
          Details
        </Button>
      ),
    },
  ];

  return (
    <>
      <ToastContainer />
      <Button
        variant="primary"
        onClick={() => {
          setCurrentTransaction({
            date: "", // Set ulang tanggal
            details: [{ id_product: "", quantity: "" }],
          });
          handleShow();
        }}
      >
        Add Transaction
      </Button>
      <input
        type="search"
        className="form-control-sm border ps-3 position-absolute start-50"
        placeholder="Search"
        value={search}
        onChange={handleSearch}
      />

      <div className="my-5">
        <DataTable
          columns={columns}
          data={filteredTransactions}
          fixedHeader
          pagination
        />
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Transaction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formTransactionDate">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={currentTransaction.date}
                onChange={(e) =>
                  setCurrentTransaction({
                    ...currentTransaction,
                    date: e.target.value,
                  })
                }
              />
            </Form.Group>
            {currentTransaction.details.map((detail, index) => (
              <div key={index}>
                <Form.Group className="mb-3" controlId={`formProduct${index}`}>
                  <Form.Label>Product</Form.Label>
                  <Form.Control
                    as="select"
                    value={detail.id_product}
                    onChange={(e) => {
                      const newDetails = [...currentTransaction.details];
                      newDetails[index].id_product = e.target.value;
                      setCurrentTransaction({
                        ...currentTransaction,
                        details: newDetails,
                      });
                    }}
                  >
                    <option value="">Select Product</option>
                    {products.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlId={`formQuantity${index}`}>
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    value={detail.quantity}
                    onChange={(e) => {
                      const newDetails = [...currentTransaction.details];
                      newDetails[index].quantity = e.target.value;
                      setCurrentTransaction({
                        ...currentTransaction,
                        details: newDetails,
                      });
                    }}
                  />
                </Form.Group>
              </div>
            ))}
            <Button
              variant="success"
              onClick={() => {
                const usedProductIds = currentTransaction.details.map(
                  (detail) => detail.id_product
                );
                const availableProducts = products.filter(
                  (product) => !usedProductIds.includes(product.id)
                );

                if (availableProducts.length === 0) {
                  toast.error("All products have been used.");
                  return;
                }

                setCurrentTransaction({
                  ...currentTransaction,
                  details: [
                    ...currentTransaction.details,
                    { id_product: "", quantity: "" },
                  ],
                });
              }}
            >
              Add Detail
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={detailsShow} onHide={handleDetailsClose}>
        <Modal.Header closeButton>
          <Modal.Title>Transaction Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {detailTransaction.map((detail, index) => (
            <div key={index}>
              <p>Product: {detail.product.name}</p>
              <p>Quantity: {detail.quantity}</p>
              <hr />
            </div>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDetailsClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default TableTransaction;
