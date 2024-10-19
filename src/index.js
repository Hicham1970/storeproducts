import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import ProductList from "./store/ProductList";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <ProductList />
  </>
);
