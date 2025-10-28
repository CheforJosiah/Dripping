import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useEffect, useState } from "react";
import searchIcon from "../assets/icons/magnifying-glass.png";
import axios from "axios";
import "./ProductPage.css";

export function ProductPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get("http://localhost:4000/api/products");
      setProducts(response.data);
      console.log(response.data);
    };
    fetchProducts();
  }, []);

  return (
    <>
      <title>Shop Page</title>

      <Header />
      <div className="product-page">
        <div className="search">
          <div>
            <select className="select">
              <option value="1">Accessories</option>
              <option value="2">Laptop</option>
              <option value="3">Desktop</option>
              <option value="4">Gaming</option>
            </select>
          </div>
          <input className="search-bar" type="text" placeholder="Search" />

          <button className="search-button">
            <img className="search-icon" src={searchIcon} alt="Search" />
          </button>
        </div>

        <div className="directory">
          <h5>Accessories</h5>
          <p>Home&gt;Shop Page&gt;Accessories</p>
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
                  <img className="product-rating-stars" src={product.rating_url} />
                  <div className="product-rating-count link-primary">{product.rating_count}</div>
                </div>

                <div className="product-price">{product.price}</div>

                <button className="add-to-cart-button button-primary">
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
