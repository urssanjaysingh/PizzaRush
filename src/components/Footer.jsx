import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="footer sticky-footer bg-light bg-gradient">
        <div className="container">
          <div className="row">
            <div>
              <p className="my-0">
                <Link to="/about" className="nav-item ms-2">
                  <i className="fas fa-info-circle"></i> About{" "}
                </Link>
                <Link to="/contact" className="nav-item ms-2">
                  <i className="fas fa-envelope"></i> Contact{" "}
                </Link>
                <Link to="/policy" className="nav-item ms-2">
                  <i className="fas fa-shield-alt"></i> Policy{" "}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
