import { FaFacebook, FaWhatsapp } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import "../styles/Footer.css";


const Footer = () => {
  return (
    <footer>
      <div className="row">
        <div className="col">
          <img src={'https://img.freepik.com/free-vector/open-book-icon-education-symbol-flat-design-vector-illustration_53876-136267.jpg?ga=GA1.1.4184247.1736579379&semt=ais_hybrid'} className="footer_logo" alt="Logo" />
          <p className="footer_about">
          This platform offers a curated list of kids' training programs and holiday-themed courses, designed to engage and educate children during their free time.
          </p>
        </div>
        <div className="col">
          <h3>Contact  <div className="bottom_line"><span></span></div></h3>
          <p>L-1/1450 </p>
          <p> San Francsisco,</p>
          <p>United Kingdom</p>
          <p className="footer_email">info.course@gmail.com</p>
          <h4>+321 - 8745333360</h4>
        </div>
        <div className="col">
          <h3 className='leftspace'>Links <div className="bottom_line"><span></span></div></h3>
          <ul>
            <li><Link to="/"  >
              Home
            </Link></li>
            <li><Link to="/">
              About us
            </Link></li>
            <li> <Link to="/" >
              Blog
            </Link></li>
            <li><Link to="/" >
              Contact
            </Link></li>
          </ul>
        </div>
        <div className="col">
          <h3>Newsletter <div className="bottom_line"><span></span></div></h3>
          <form>
            <ion-icon className="icon" name="mail"></ion-icon>
            <input type="email" placeholder="Enter your email" required />
            <button type="submit">
              <ion-icon className="icon_right" name="arrow-round-forward"></ion-icon>
            </button>
          </form>
          <div className="social_icons">
            <a href="https://www.facebook.com/musthelp.foundation" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="social_icon" />
            </a>
            <a href="https://www.instagram.com/musthelp.foundation" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="social_icon" />
            </a>
            <a href="https://wa.me/918448674560?text=I%20want%20to%20donate" target="_blank" rel="noopener noreferrer">
              <FaWhatsapp className="social_icon" />
            </a>

          </div>
        </div>
      </div>
     
    </footer>
  );
};

export default Footer;