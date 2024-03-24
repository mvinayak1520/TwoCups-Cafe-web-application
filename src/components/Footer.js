import React from 'react';
import '../footer.css';
import { FaInstagram, FaFacebook, FaWhatsapp } from 'react-icons/fa';

function Footer() {
  return (
    <>
      <div className="copyright" >
        <div className="container-fluid text-center">
          <p>
            Copyrights &copy; 2023 -{' '}
            <a href="#">TWO CUPS CAFE & RESTO</a>, All Rights Reserved.
            <br />
            <span>
              Follow us on :
              <a href="#" className="social-icon mr-2 ml-2">
                <FaInstagram />
              </a>
              <a href="#" className="social-icon mr-2">
                <FaFacebook />
              </a>
              <a href="#" className="social-icon mr-2">
                <FaWhatsapp />
              </a>
            </span>
          </p>
        </div>
      </div>
    </>
  );
}

export default Footer;
