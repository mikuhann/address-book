import React, {Fragment, useContext} from 'react';
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import AuthContext from "../../context/auth/authContext"
import ContactContext from '../../context/contact/contactContext';

const Navbar = ({title, icon}) => {
  const authContext = useContext(AuthContext);
  const contactContext = useContext(ContactContext);
  const {isAuthenticated, logout, user} = authContext;
  const {clearContacts} = contactContext;
  const onLogout = () => {
    logout();
    clearContacts();
  };
  const authLinks = (
    <Fragment>
      <li>Hello, {user && user.name}</li>
      <li>
        <a onClick={onLogout} href="#!">
          <i className="fas fa-sign-out-alt"/> <span className="hide-sm">Logout</span>
        </a>
      </li>
    </Fragment>
  );
  const guestLinks = (
    <Fragment>
      <li>
        <Link to="/register">
          <i className="fas fa-user-plus"/>{' '}Register
        </Link>
      </li>
      <li>
        <Link to="/login">
          <i className="fas fa-sign-in-alt"/>{' '}Login
        </Link>
      </li>
    </Fragment>
  )
  return (
    <div className="navbar bg-primary">
      <Link to="/">
        <h1>
          <i className={icon} /> {' '} {title}
        </h1>
      </Link>
      <ul>
        {isAuthenticated ? authLinks : guestLinks}
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
