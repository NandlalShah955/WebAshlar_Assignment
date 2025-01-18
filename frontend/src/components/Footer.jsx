import { FaFacebook, FaWhatsapp } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';
// import logo from "../assets/Must-help-logo.png";
import "../styles/Footer.css";


const Footer = () => {
  return (
    <footer>
      <div className="row">
        <div className="col">
          <img src={'https://marketplace.canva.com/EAFaFUz4aKo/2/0/1600w/canva-yellow-abstract-cooking-fire-free-logo-JmYWTjUsE-Q.jpg'} className="footer_logo" alt="Logo" />
          <p className="footer_about">
            You will be provided accurate Proof of Donation for all your generous donations with complete honesty.
          </p>
        </div>
        <div className="col">
          <h3>Office <div className="bottom_line"><span></span></div></h3>
          <p>1450, Phase-3, J.J.Colony, </p>
          <p> Madanpur Khadar,</p>
          <p>New Delhi-110076, Delhi, India</p>
          <p className="footer_email">must.foundation@gmail.com</p>
          <h4>+91 - 8448674560</h4>
        </div>
        <div className="col">
          <h3 className='leftspace'>Links <div className="bottom_line"><span></span></div></h3>
          <ul>
            <li><Link to="/"  >
              Home
            </Link></li>
            <li><Link to="/about">
              About us
            </Link></li>
            <li> <Link to="/blog" >
              Blog
            </Link></li>
            <li><Link to="/contact" >
              Contact
            </Link></li>
          </ul>
        </div>
        <div className="col">
          <h3>Newsletter <div className="bottom_line"><span></span></div></h3>
          <form>
            <ion-icon class="icon" name="mail"></ion-icon>
            <input type="email" placeholder="Enter your email" required />
            <button type="submit">
              <ion-icon class="icon_right" name="arrow-round-forward"></ion-icon>
            </button>
          </form>
          <div className="social_icons">
            <a href="https://www.facebook.com/musthelp.foundation" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="social_icon" />
            </a>
            <a href="https://www.instagram.com/musthelp.foundation" target="_blank" rel="noopener noreferrer">
              <FaInstagram class="social_icon" />
            </a>
            <a href="https://wa.me/918448674560?text=I%20want%20to%20donate" target="_blank" rel="noopener noreferrer">
              <FaWhatsapp className="social_icon" />
            </a>

          </div>
        </div>
      </div>
      <hr />
      <p className="copyright">Must Help Foundation Ⓒ 2022 - All Rights Reserved</p>
    </footer>
  );
};

export default Footer;