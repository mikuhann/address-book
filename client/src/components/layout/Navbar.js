import React from 'react';
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

const Navbar = ({title, icon}) => {
  return (
    <div className="navbar bg-primary">
      <Link to="/">
        <h1>
          <i className={icon} /> {' '} {title}
        </h1>
      </Link>
      <ul>
        <li>
          <Link to="/">
            <i className="fas fa-home"/>{' '}Home
          </Link>
        </li>
        <li>
          <Link to="/about">
            <i className="fas fa-question-circle"/>{' '}About
          </Link>
        </li>
      </ul>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string
};

Navbar.defaultProps = {
  title: 'Address book',
  icon: "fas fa-address-book"
};

export default Navbar;
