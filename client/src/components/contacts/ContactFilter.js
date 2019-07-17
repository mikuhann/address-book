import React, {useContext, useRef, useEffect} from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactFilter = () => {
  const contactContext = useContext(ContactContext);
  const {filterContacts, clearFilter, filter} = contactContext;
  const text = useRef('');

  useEffect(() => {
    if (!filter) {
      text.current.value = '';
    }
  });

  const onChange = (e) => {
    if (text.current.value !== '') {
      filterContacts(e.target.value)
    } else {
      clearFilter();
    }
  };
  const onSubmit = (e) => {
    e.preventDefault()
  };

  return (
    <form onSubmit={onSubmit}>
      <input ref={text} type="text" placeholder="Filter contacts..." onChange={onChange}/>
    </form>
  );
};

export default ContactFilter;
