import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  CONTACT_ERROR,
  GET_CONTACTS,
  CLEAR_CONTACTS
} from "../Constants";

export default (state, action) => {
  const {type, payload} = action;
  const {contacts} = state;
  switch (type) {
    case GET_CONTACTS:
      return {
        ...state,
        contacts: payload,
        loading: false
      };
    case ADD_CONTACT:
      return {
        ...state,
        contacts: [payload, ...contacts],
        loading: false
      };
    case DELETE_CONTACT:
      return {
        ...state,
        contacts: contacts.filter((contact) => contact._id !== payload),
        loading: false
      };
    case SET_CURRENT:
      return {
        ...state,
        current: payload
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      };
    case UPDATE_CONTACT:
      return {
        ...state,
        contacts: contacts.map((contact) => contact.id === payload.id ? payload : contact),
        loading: false
      };
    case CLEAR_CONTACTS:
      return {
        ...state,
        contacts: null,
        filter: null,
        error: null,
        current: null
      };
    case FILTER_CONTACTS:
      return {
        ...state,
        filter: contacts.filter((contact) => {
          const regex = new RegExp(`${payload}`,'gi');
          return contact.name.match(regex) || contact.email.match(regex);
        })
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filter: null
      };
    case CONTACT_ERROR:
      return {
        ...state,
        error: payload
      };
    default:
      return state
  }
};
