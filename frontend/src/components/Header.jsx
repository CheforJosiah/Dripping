import Logo from '../assets/logo.png'
import MobileLogo from '../assets/mobile-logo.png'
import CartIcon from '../assets/icons/cart-icon.png'
import './Header.css'

export function Header() {
  return (
    <>
      <div className="header">
        <div className="left-section">
          <a href="/" className="header-a">
            <img className="logo" src={Logo} alt='Logo' />
            <img className="mobile-logo" src={MobileLogo} alt="logo"></img>
          </a>
        </div>

        <div className="middle-section">
          <a href="/">Home</a>
          <a href="/shop">Shop</a>
          <a href="/pages">Pages</a>
          <a href="/about">About Us</a>
        </div>

        <div className="right-section">
          <a className="cart-link header-link" href="/cart">
            <img className="cart-icon" src={CartIcon} alt='Cart' />
            <div className="cart-quantity">1</div>
            <div className="cart-text">Cart</div>
          </a>
        </div>
      </div>
    </>
  );
}
