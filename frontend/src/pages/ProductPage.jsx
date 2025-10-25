import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import searchIcon from '../assets/icons/magnifying-glass.png'
import "./ProductPage.css"

export function ProductPage() {
  return (
    <>
      <title>Products</title>

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
          <div className="product-container">
            <div className="product-image-container">
              <img className="product-image" src="" />
            </div>
            <div className="product-name">Dell OptPlex 5060 Micro Core</div>

            <div className="product-rating-container">
              <img className="product-rating-stars" src="" />
              <div className="product-rating-count link-primary"> </div>
            </div>

            <div className="product-price">45,000FCFA</div>
          </div>
        </div>

        <div className="update">
          <span className="line"><hr /></span>
          <h4>Stay Up To Date!</h4>
          <span className="line"><hr /></span>
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
