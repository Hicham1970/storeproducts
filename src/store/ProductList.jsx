import { useState, useEffect, useCallback } from "react";
import Product from "./Product";

export default function ProductList() {
  const [productList, setProductList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [allProducts, setAllProducts] = useState([]);

  // Récupération des données au montage
  useEffect(() => {
    const fetchProducts = async () => {
      const productsRes = await fetch("https://fakestoreapi.com/products");
      const productsData = await productsRes.json();
      setAllProducts(productsData);
      setProductList(productsData);
    };

    const fetchCategories = async () => {
      const categoriesRes = await fetch(
        "https://fakestoreapi.com/products/categories"
      );
      const categoriesData = await categoriesRes.json();
      setCategoriesList(categoriesData);
    };

    fetchProducts();
    fetchCategories();
  }, []);

  // Logique de filtrage
  const applyFilters = useCallback(() => {
    let filteredProducts = [...allProducts]; // Copier le tableau pour éviter de modifier l'original

    if (selectedCategory) {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (searchInput) {
      const searchTerm = searchInput.toLowerCase();
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.title.toLowerCase().includes(searchTerm) ||
          product.id.toString().includes(searchTerm) ||
          product.description.toLowerCase().includes(searchTerm)
      );
    }

    setProductList(filteredProducts);
  }, [selectedCategory, searchInput, allProducts]);

  // Appliquer les filtres à chaque changement
  useEffect(() => {
    applyFilters();
  }, [selectedCategory, searchInput, applyFilters, allProducts]);

  // Gestion du clic sur les catégories
  const filterProductsByCategory = (category) => {
    setSelectedCategory(category);
  };

  // Affichage des catégories
  const displayCategories = () => {
    return categoriesList.map((category) => (
      <button
        key={category}
        className="btn btn-secondary"
        onClick={() => filterProductsByCategory(category)}
      >
        {category}
      </button>
    ));
  };

  // Affichage des produits
  const displayProducts = () => {
    return productList.map((product, key) => (
      <Product key={key} product={product} />
    ));
  };

  // Gestion de la recherche (si nécessaire)
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
        <div className="row g-3 align-items-center">
          <h5>Categories:</h5>
          <hr />
          <div className="btn btn-group">{displayCategories()}</div>
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
    </div>
  );
}
