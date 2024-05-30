import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import useProductStore from "../Stores/ProductStore";
import useProductTypeStore from "../Stores/ProductTypeStore";
import { Button, Modal, Form } from "react-bootstrap";
import { toast } from "react-toastify";

function TableProduct() {
  const { getProduct, createProduct, updateProduct, deleteProduct } =
    useProductStore();
  const { getProductType } = useProductTypeStore();
  const [products, setProducts] = useState([]);
  const [productTypes, setProductTypes] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({
    id: null,
    name: "",
    stock: "",
    id_product_type: "",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    fetchProducts();
    fetchProductTypes();
  }, []);

  const fetchProducts = async () => {
    try {
      const productList = await getProduct();
      setProducts(productList);
      setFilteredProducts(productList);
    } catch (error) {
      toast.error("Error fetching products");
    }
  };

  const fetchProductTypes = async () => {
    try {
      const productTypeList = await getProductType();
      setProductTypes(productTypeList);
    } catch (error) {
      toast.error("Error fetching product types");
    }
  };

  const handleEdit = (product) => {
    setEditMode(true);
    setCurrentProduct(product);
    handleShow();
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      fetchProducts();
      toast.success("Product deleted successfully");
    } catch (error) {
      toast.error("Error deleting product");
    }
  };

  const handleSubmit = async () => {
    try {
      if (editMode) {
        await updateProduct(currentProduct.id, currentProduct);
        toast.success("Product updated successfully");
      } else {
        await createProduct(currentProduct);
        toast.success("Product created successfully");
      }
      fetchProducts();
      handleClose();
    } catch (error) {
      toast.error(`Error ${editMode ? "updating" : "creating"} product`);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    if (e.target.value !== "") {
      const filteredData = products.filter((product) => {
        const searchString = e.target.value.toLowerCase();
        return (
          product.name.toLowerCase().includes(searchString) ||
          product.product_type.name.toLowerCase().includes(searchString) ||
          product.stock.toString().includes(searchString)
        );
      });
      setFilteredProducts(filteredData);
    } else {
      setFilteredProducts(products);
    }
  };

  const columns = [
    {
      name: "No",
      selector: (row, index) => index + 1,
      //   sortable: true,
    },
    {
      name: "Nama",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Stock",
      selector: (row) => row.stock,
      sortable: true,
    },
    {
      name: "Jenis Barang",
      selector: (row) => row.product_type.name,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div>
          <Button
            variant="warning"
            onClick={() => handleEdit(row)}
            style={{ marginRight: "10px" }}
          >
            Edit
          </Button>
          <Button variant="danger" onClick={() => handleDelete(row.id)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Button
        variant="primary"
        onClick={() => {
          setEditMode(false);
          setCurrentProduct({
            id: null,
            name: "",
            stock: "",
            id_product_type: "",
          });
          handleShow();
        }}
      >
        Add Product
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
          data={filteredProducts}
          fixedHeader
          pagination
        />
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? "Edit Product" : "Add Product"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formProductName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                value={currentProduct.name}
                onChange={(e) =>
                  setCurrentProduct({ ...currentProduct, name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formProductStock">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter stock"
                value={currentProduct.stock}
                onChange={(e) =>
                  setCurrentProduct({
                    ...currentProduct,
                    stock: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formProductType">
              <Form.Label>Product Type</Form.Label>
              <Form.Control
                as="select"
                value={currentProduct.id_product_type}
                onChange={(e) =>
                  setCurrentProduct({
                    ...currentProduct,
                    id_product_type: e.target.value,
                  })
                }
              >
                <option value="">Select Product Type</option>
                {productTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {editMode ? "Update" : "Save"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default TableProduct;
