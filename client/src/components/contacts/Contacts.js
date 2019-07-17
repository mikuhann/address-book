import React, {Fragment, useContext} from 'react';
import {CSSTransition, TransitionGroup} from "react-transition-group";
import ContactContext from "../../context/contact/contactContext";

import ContactItem from './ContactItem';

const Contacts = () => {
  const contactContext = useContext(ContactContext);
  const {contacts, filter} = contactContext;

  if (contacts.length === 0) {
    return <h4>Please, add a contact...</h4>
  }
  return (
    <Fragment>
      {filter ? filter.map((contact) => (
        <ContactItem key={contact.id} contact={contact}/>
      )) : contacts.map((contact) => (
        <ContactItem key={contact.id} contact={contact}/>
      ))}
    </Fragment>
  );
};

export default Contacts;
