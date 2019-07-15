import React, {useState, useContext, useEffect} from 'react';
import ContactContext from "../../context/contact/contactContext";

const ContactForm = () => {
  const contactContext = useContext(ContactContext);
  const {addContact, clearCurrentContact,updateContact, current} = contactContext;
  useEffect(() => {
    if (current !== null) {
      setContact(current);
    } else {
      setContact({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
      });
    }
  },[contactContext, current]);
  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'personal'
  });

  const {name, email, phone, type} = contact;

  const onChange = (e) => setContact({...contact, [e.target.name]: e.target.value});
  const cancelEdit = () => {
    clearCurrentContact()
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (!current) {
      addContact(contact);
      setContact({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
      });
    } else {
      updateContact(contact);
      clearCurrentContact();
    }
  };
  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">{current ? 'Edit contact' : 'Add contact'}</h2>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={onChange}/>
      <input
        type="email"
        placeholder="Email"
        name="email"
        value={email}
        onChange={onChange}/>
      <input
        type="text"
        placeholder="Phone"
        name="phone"
        value={phone}
        onChange={onChange}/>
      <h5>Contact type</h5>
      <label htmlFor="personal">Personal {' '}</label>
      <input
        type="radio"
        id="personal"
        name="type"
        value="personal"
        checked={type === "personal"}
        onChange={onChange}/>
      <label htmlFor="professional">Professional</label>
      <input
        type="radio"
        id="professional"
        name="type"
        value="professional"
        checked={type === "professional"}
        onChange={onChange}/>
      <div>
        <input type="submit" value={current ? 'Update contact' : 'Add contact'} className="btn btn-primary btn-block"/>
      </div>
      {current && <div>
        <button
          className="btn btn-light btn-block"
          onClick={cancelEdit}>Cancel</button>
      </div>}
    </form>
  );
};

export default ContactForm;