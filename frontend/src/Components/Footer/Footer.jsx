import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

import footer_logo from "../Assests/logo_big.png";
import instagram_icon from "../Assests/instagram_icon.png";
import facebook_icon from "../Assests/facebook_icon.png";
import whatsapp_icon from "../Assests/whatsapp_icon.png";

const Footer = () => {
  return (
    <footer className="footer">

      <div className="footer-top">

        <div className="footer-brand">
          <img src={footer_logo} alt="Shopper Logo" />
          <h2>SHOPPER</h2>
          <p>
            Discover premium fashion for men, women and kids.
            Style meets comfort with every collection.
          </p>
        </div>

        <div className="footer-links">

          <div className="footer-column">
            <h3>Customer Care</h3>
            <ul>
              <li>
  <Link to="/customer-care#shipping">
    Shipping Information
  </Link>
</li>

<li>
  <Link to="/customer-care#returns">
    Returns & Refunds
  </Link>
</li>

<li>
  <Link to="/customer-care#size">
    Size Guide
  </Link>
</li>

<li>
  <Link to="/customer-care#faq">
    FAQs
  </Link>
</li>
            </ul>
          </div>

          <div className="footer-column">
    <h3>Company</h3>

    <ul>
        <li>
            <Link to="/about">
                About Us
            </Link>
        </li>

        <li>
            <Link to="/contact">
                Contact Us
            </Link>
        </li>
    </ul>

</div>

        </div>

      </div>

      <div className="footer-social-icon">

        <a
          href="https://www.instagram.com/shopper.hp"
          target="_blank"
          rel="noreferrer"
        >
          <img src={instagram_icon} alt="" />
        </a>

        <a
          href="https://www.facebook.com/"
          target="_blank"
          rel="noreferrer"
        >
          <img src={facebook_icon} alt="" />
        </a>

        <a
          href="https://wa.me/919999999999"
          target="_blank"
          rel="noreferrer"
        >
          <img src={whatsapp_icon} alt="" />
        </a>

      </div>

      <hr />

      <p className="footer-copy">
        © 2026 SHOPPER. All Rights Reserved.
      </p>

    </footer>
  );
};

export default Footer;