import './Footer.css'

export default function Footer() {
  return (
    <div className="footer">
      <div className="left-section">
        <img className="logo" src="" alt="Logo" />
        <div className="contact">
          <p>If you have any questions, please contact us at</p>
          <a href="#">info@dripping.com</a>
          <div className="contact-info">
            <div className="contact-icon"><img className='icon' src="" /></div>
            <p>Mile 6, Adjacent Mawa Hotel, Bamenda</p>
          </div>
          <div className="contact-info">
            <div className="contact-icon"><img className='icon' src="" /></div>
            <p>(+237) 673727996</p>
          </div>
        </div>
        <p className="copyright">@ 2025 Dripping with love</p>
      </div>
      <div className="middle-section">
        <h3>CATEGORIES</h3>
        <a href="#">Accessories</a>
        <a href="#">Laptop</a>
        <a href="#">Desktop</a>
        <a href="#">Gaming</a>
      </div>
      <div className="right-section">
        <h3>ABOUT US</h3>
        <a href="#">About Us</a>
        <a href="#">contact Us</a>
        <a href="#">Privacy policy</a>
        <a href="#">Terms & conditions</a>
        <div className="socials">
          <a href="#"><img className='icon' src="#" /></a>
          <a href="#"><img className='icon' src="#" /></a>
          <a href="#"><img className='icon' src="#" /></a>
        </div>
      </div>
    </div>
  );
}