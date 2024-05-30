import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import useProductTypeStore from "../Stores/ProductTypeStore";
import { Button, Modal, Form } from "react-bootstrap";
import { toast } from "react-toastify";

function TableProductType() {
  const {
    getProductType,
    createProductType,
    updateProductType,
    deleteProductType,
  } = useProductTypeStore();
  const [productTypes, setProductTypes] = useState([]);
  const [filteredProductTypes, setFilteredProductTypes] = useState([]);
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentProductType, setCurrentProductType] = useState({
    id: null,
    name: "",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    fetchProductTypes();
  }, []);

  const fetchProductTypes = async () => {
    try {
      const productTypeList = await getProductType();
      setProductTypes(productTypeList);
      setFilteredProductTypes(productTypeList);
    } catch (error) {
      toast.error("Error fetching product types");
    }
  };

  const handleEdit = (productType) => {
    setEditMode(true);
    setCurrentProductType(productType);
    handleShow();
  };

  const handleDelete = async (id) => {
    try {
      await deleteProductType(id);
      fetchProductTypes();
      toast.success("Product type deleted successfully");
    } catch (error) {
      toast.error("Error deleting product type");
    }
  };

  const handleSubmit = async () => {
    try {
      if (editMode) {
        await updateProductType(currentProductType.id, currentProductType);
        toast.success("Product type updated successfully");
      } else {
        await createProductType(currentProductType);
        toast.success("Product type created successfully");
      }
      fetchProductTypes();
      handleClose();
    } catch (error) {
      toast.error(`Error ${editMode ? "updating" : "creating"} product type`);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    if (e.target.value !== "") {
      const filteredData = productTypes.filter((productType) =>
        productType.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setFilteredProductTypes(filteredData);
    } else {
      setFilteredProductTypes(productTypes);
    }
  };

  const columns = [
    {
      name: "No",
      selector: (row, index) => index + 1,
    },
    {
      name: "Name",
      selector: (row) => row.name,
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
          setCurrentProductType({
            id: null,
            name: "",
          });
          handleShow();
        }}
      >
        Add Product Type
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
          data={filteredProductTypes}
          fixedHeader
          pagination
        />
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editMode ? "Edit Product Type" : "Add Product Type"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formProductTypeName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product type name"
                value={currentProductType.name}
                onChange={(e) =>
                  setCurrentProductType({
                    ...currentProductType,
                    name: e.target.value,
                  })
                }
              />
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

export default TableProductType;
