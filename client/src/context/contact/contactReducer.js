import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER
} from "../Constants";

export default (state, action) => {
  const {type, payload} = action;
  const {contacts} = state;
  switch (type) {
    case ADD_CONTACT:
      return {
        ...state,
        contacts: [...contacts, payload]
      };
    case DELETE_CONTACT:
      return {
        ...state,
        contacts: contacts.filter((contact) => contact.id !== payload)
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
        contacts: contacts.map((contact) => contact.id === payload.id ? payload : contact)
      };
    default:
      return state
  }
};
