import Contact from "../Contact/Contact";
import s from "./ContactList.module.css";
import PropTypes from 'prop-types';

function ContactList({ contacts, onDelete }) {
  return (
    <ul className={s.contactList}>
      {contacts.map((contact) => (
        <li key={contact.id} className={s.item}>
          <Contact contact={contact} onDelete={onDelete} />
        </li>
      ))}
    </ul>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired
};

export default ContactList;
