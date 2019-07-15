import React, {useState, useContext} from 'react';
import ContactContext from "../../context/contact/contactContext";

const ContactForm = () => {
  const contactContext = useContext(ContactContext);
  const {addContact} = contactContext;

  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'personal'
  });

  const {name, email, phone, type} = contact;
  const onChange = (e) => setContact({...contact, [e.target.name]: e.target.value});
  const onSubmit = (e) => {
    e.preventDefault();
    addContact(contact);
    setContact({
      name: '',
      email: '',
      phone: '',
      type: 'personal'
    });
  };
  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">Add contact</h2>
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
        <input type="submit" value="Add contact" className="btn btn-primary btn-block"/>
      </div>
    </form>
  );
};

export default ContactForm;