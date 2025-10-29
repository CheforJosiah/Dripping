import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useEffect, useState } from "react";
import searchIcon from "../assets/icons/magnifying-glass.png";
import axios from "axios";
import "./ProductPage.css";

export function ProductPage() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      let url = "http://localhost:4000/api/products";

      const params = new URLSearchParams();
      if (category !== "All") params.append("category", category);
      if (search.trim() !== "") params.append("search", search);
      if ([...params].length > 0) {
        url += `?${params.toString()}`;
      }
      const response = await axios.get(url);
      setProducts(response.data);
    };
    fetchProducts();
  }, [category, search]);

  const addToCart = async (product) => {
    try {
      await axios.post("http://localhost:4000/cart/add", {
        user_id: "8e979bfa-b949-44c3-b096-0bb83007babc",
        product_id: product.id,
        quantity: 1,
      });
      console.log("Product added to cart");
      alert("Product added to cart");
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <>
      <title>Shop Page</title>

      <Header />
      <div className="product-page">
        <div className="search">
          <div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="select"
            >
              <option value="All">All Categories</option>
              <option value="phone">Phones</option>
              <option value="laptop">Laptop</option>
              <option value="desktop">Desktop</option>
              <option value="gaming">Gaming</option>
            </select>
          </div>
          <input
            className="search-bar"
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button className="search-button">
            <img className="search-icon" src={searchIcon} alt="Search" />
          </button>
        </div>

        <div className="directory">
          <h5>{category.toUpperCase()}</h5>
          <p>Home&gt;Shop Page&gt;{category}</p>
        </div>
        <div className="products-grid">
          {products.map((product) => {
            return (
              <div key={product.id} className="product-container">
                <div className="product-image-container">
                  <img className="product-image" src={product.image_url} />
                </div>
                <div className="product-name">{product.name}</div>

                <div className="product-rating-container">
                  <img
                    className="product-rating-stars"
                    src={product.rating_url}
                  />
                  <div className="product-rating-count link-primary">
                    {product.rating_count}
                  </div>
                </div>

                <div className="product-price">{product.price}</div>

                <button className="add-to-cart-button button-primary" 
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            );
          })}
        </div>

        <div className="update">
          <span className="line">
            <hr />
          </span>
          <h4>Stay Up To Date!</h4>
          <span className="line">
            <hr />
          </span>
        </div>
        <div className="subscribe">
          <h4>Join Our Newsletter</h4>
          <div className="email">
            <input type="text" placeholder="youremail@gmail.com" />
            <button className="subs-btn">Subscribe</button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
