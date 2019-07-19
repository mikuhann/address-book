import React, {useContext} from 'react';
import PropTypes from "prop-types"
import ContactContext from "../../context/contact/contactContext";

const ContactItem = ({contact}) => {
  const {_id, name, email, phone, type} = contact;
  const contactContext = useContext(ContactContext);
  const {deleteContact, setCurrentContact, clearCurrentContact} = contactContext;

  const onDelete = () => {
    deleteContact(_id);
    clearCurrentContact();
  };
  const onEdit = () => {
    setCurrentContact(contact)
  };

  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">
        {name} {' '}
        <span className={`badge badge-right ${type ==='professional' ? 'badge-success' : 'badge-primary'}`}>
          {type[0].toUpperCase() + type.slice(1)}
        </span>
      </h3>
      <ul className="list">
        <li>
          <i className="fas fa-envelope-square"/> {email}
        </li>
        {phone && (
          <li>
            <i className="fas fa-phone-square"/> {phone}
          </li>
        )}
      </ul>
      <p>
        <button
          className="btn btn-dark btn-sm"
          onClick={onEdit}>
          Edit
        </button>
        <button
          className="btn btn-danger btn-sm"
          onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired
};

export default ContactItem;
