import React, {useReducer} from "react";
import uuid from "uuid";
import ContactContext from "./contactContext";
import contactReducer from "./contactReducer";
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER
} from "../Constants";

const ContactState = (props) => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: 'Ivan',
        email: 'ivan@email.com',
        phone: '123-123-123',
        type: 'personal'
      },
      {
        id: 2,
        name: 'Petr',
        email: 'petr@email.com',
        phone: '123-123-123',
        type: 'personal'
      },
      {
        id: 3,
        name: 'Roman',
        email: 'roman@email.com',
        phone: '123-123-123',
        type: 'personal'
      }
    ]
  };
  const [state, dispatch] = useReducer(contactReducer, initialState);
  // add contact
  // delete contact
  // set current contact
  // clear current contact
  // update contact
  // filter contact
  // clear filter

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts
      }}>
      {props.children}
    </ContactContext.Provider>
  )
};

export default ContactState;