import { Link } from 'react-router';
import './Header.css'

export default function Header() {
  return (
    <>
      <div className="header">
        <div className="left-section">
          <Link to="/" className="header-link">
            <img className="logo" src={logo} alt='Logo' />
          </Link>
        </div>

        <div className="middle-section">
          <Link to="/">Home</Link>
          <Link to="/products">Shop</Link>
          <Link to="/pages">Pages</Link>
          <Link to="/about">About Us</Link>
        </div>

        <div className="right-section">
          <Link className="cart-link header-link" to="/checkout">
            <img className="cart-icon" src="" alt='Cart' />
            <div className="cart-quantity">1</div>
            <div className="cart-text">Cart</div>
          </Link>
        </div>
      </div>
    </>
  );
}
