import React from "react";
import { Link } from "react-router-dom";
const cYear = new Date().getFullYear();
const Footer = () => {
  return (
    <>
      <h3 className="footer">
        <Link
          className="footer"
          href="https://www.SequroTechnologies.com"
          target="_blank"
        >
          © Copyright {cYear} Sequro Technologies Pvt. Ltd
        </Link>
      </h3>
    </>
  );
};

export default Footer;
