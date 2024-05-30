import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./Component/Sidebar.jsx";
import Product from "./Pages/Product.jsx";
import ProductType from "./Pages/ProductType.jsx";
import Transaction from "./Pages/Transaction.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
import ReportTransaction from "./Pages/ReportTransaction.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Sidebar>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<Product />} />
          <Route path="/productTypes" element={<ProductType />} />
          <Route path="/transactions" element={<Transaction />} />
          <Route path="/reportTransactions" element={<ReportTransaction />} />
        </Routes>
      </Sidebar>
    </BrowserRouter>
  );
};

export default App;
