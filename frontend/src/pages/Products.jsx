import axios from "axios";
import { useState, useEffect } from "react";

export function Products() {
  return (
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

      <button className="add-to-cart-button button-primary" onClick={addToCart}>
        Add to Cart
      </button>
    </div>
  );
}
