import React from 'react';
import './footer.css'
import logo from '../../../assets/images/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaTwitter } from 'react-icons/fa';
const Footer = () => {
  return (
    <div className="mentor-oppor-fotter-container">
      <figure>
        <img src={logo} alt="photo" />
      </figure>
      <article>
        <p className="mentor-oppor-fotter-p">
          Shorten the gap to reach your dream job by acquiring the<br /> knowledge and technical experience you need
        </p>
      </article>
      <nav className="nav1">
        <a href="#">Overview</a>
        <a href="#">Become a Mentor</a>
        <a href="#">Become a Mentee</a>
        <a href="#">VIP</a>
        <a href="#">Privacy</a>
      </nav>
      <hr className="footer-hr" />
      <nav className="nav2">
        <a className="sticky-lg-bottom" href="#">
          @2023 EGYPT, ALL RICHTS RESERVED
        </a>
        <div className='nav3'>
          <a href="#">
            <i className="fa-brands fa-facebook nav2-face"></i>
          </a>
          <a href="#">
            <i className="fa-brands fa-twitter"></i>
          </a>
          <a href="#">
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a href="#">
            <i className="fa-brands fa-linkedin"></i>
          </a>
        </div>
      </nav>
    </div>
  );
};

export default Footer;
