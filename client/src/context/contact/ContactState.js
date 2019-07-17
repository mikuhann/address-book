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
        type: 'professional'
      }
    ],
    current: null,
    filter: null
  };
  const [state, dispatch] = useReducer(contactReducer, initialState);
  const {current, contacts, filter} = state;

  const addContact = (contact) => {
    contact.id = uuid.v4();
    dispatch({
      type: ADD_CONTACT,
      payload: contact
    });
  };
  const deleteContact = (id) => {
    dispatch({
      type: DELETE_CONTACT,
      payload: id
    })
  };
  const setCurrentContact = (contact) => {
    dispatch({
      type: SET_CURRENT,
      payload: contact
    });
  };
  const clearCurrentContact = () => {
    dispatch({
      type: CLEAR_CURRENT
    });
  };
  const updateContact = (contact) => {
    dispatch({
      type: UPDATE_CONTACT,
      payload: contact
    });
  };
  const filterContacts = (text) => {
    dispatch({
      type: FILTER_CONTACTS,
      payload: text
    });
  };
  const clearFilter = () => {
    dispatch({
      type: CLEAR_FILTER
    });
  };

  return (
    <ContactContext.Provider
      value={{
        contacts,
        current,
        filter,
        addContact,
        deleteContact,
        setCurrentContact,
        clearCurrentContact,
        updateContact,
        filterContacts,
        clearFilter
      }}>
      {props.children}
    </ContactContext.Provider>
  )
};

export default ContactState;