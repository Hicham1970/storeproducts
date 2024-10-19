/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import Product from "./Product";
import Search from "./Search";
export default function ProductList() {
  const [productList, setProductList] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  // display products in the table
  const displayProducts = () => {
    const productTemp = productList.filter(
      (product) =>
        product.title.toLowerCase().startsWith(searchInput.toLowerCase()) ||
        product.id.toString().startsWith(searchInput) ||
        product.description.toLowerCase().startsWith(searchInput.toLowerCase())
    );
    return productTemp.map((product, key) => {
      return <Product key={key} product={product} />;
    });
  };

  // fetch products from the Api
  const getProducts = () => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((res) => setProductList(res))
      .catch((error) =>
        console.error("Erreur lors de la récupération des produits:", error)
      );
  };
  useEffect(() => {
    getProducts();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const searchValue = document.querySelector("#search").value;
    setSearchInput(searchValue);
  };

  return (
    <div className="container-fluide mx-auto w-75 my-3">
      <h2>Search :</h2>
      <form>
        <div className="row g-3 align-items-center">
          <div className="col-auto">
            <label className="col-form-label">Search</label>
          </div>
          <div className="col-auto">
            <input type="text" id="search" className="form-control" />
          </div>
          <div className="col-auto">
            <input
              className="btn btn-primary"
              type="submit"
              value="Search"
              onClick={handleSearch}
            />
          </div>
        </div>
      </form>
      <h1>Products :</h1>

      <table className="table">
        <thead>
          <tr>
            <th>#Id</th>
            <th>Title</th>
            <th>Price</th>
            <th>Description</th>
            <th>Category</th>
            <th>Image</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>{displayProducts()}</tbody>
      </table>
      <Product />
    </div>
  );
}
