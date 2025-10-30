import axios from "axios";
import { useState, useEffect } from "react";
import "./CartPage.css";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export function CartPage() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Fetching cart items from backend
    const fetchCartItems = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/cart");
        setCartItems(response.data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  return (
    <>
      <title>Cart Page</title>
      <Header />
      <div className="cart-page">
        <div className="directory">
          <p>Home&gt;Checkout&gt;Cart</p>
        </div>
        <div className="checkout">
          <table className="order-summary-table">
            <thead>
              <tr>
                <th>PRODUCT</th>
                <th>PRICE</th>
                <th>QUANTITY</th>
                <th>SUBTOTAL</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => {
                return (
                  <tr key={item.id}>
                    <td>
                      <div className="product-image-container">
                        <img
                          className="product-image"
                          src={item.product_id.image_url}
                        />
                        <div className="product-details">
                          <p>{item.product_id.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="product-price">
                      {item.product_id.price} FCFA
                    </td>
                    <td className="product-quantity">
                      <button className="quantity-button">-</button>
                      <span className="quantity-number">{item.quantity}</span>
                      <button className="quantity-button">+</button>
                    </td>
                    <td className="product-subtotal">
                      {item.product_id.price * item.quantity} FCFA
                    </td>
                    <td>
                      <button className="remove-button">Delete</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="payment-summary">
            <div className="summary-header">
              <h3>Cart Totals</h3>
              <div className="subtotal-row">
                <h5>Subtotal</h5>
                <p>200,000 FCFA</p>
              </div>
            </div>
            <div className="delivery-options">
              <div>Shipping</div>
              <div className="options">
                <input type="radio" name="shipping" /> Free Shipping: 0 FCFA
                <br />
                <input type="radio" name="shipping" /> Flat Rate: 5,000 FCFA
                <br />
                <input type="radio" name="shipping" /> Local pickup: 0 FCFA
                <br />
                <a href="#">Change address</a>
              </div>
            </div>
            <div className="total-row">
              <h4>Total</h4>
              <h4>205,000 FCFA</h4>
            </div>
            <button className="proceed-button">Proceed to Checkout</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
