import { BsFillTelephoneFill } from "react-icons/bs";
import { IoPerson } from "react-icons/io5";
import s from "./Contact.module.css";
import PropTypes from 'prop-types';

function Contact({ contact: { name, number, id }, onDelete }) {
  return (
    <li className={s.item}>
      <div className={s.wrapper}>
        <div className={s.field}>
          <IoPerson size={20} />
          <p className={s.text}>{name}</p>
        </div>
        <div className={s.field}>
          <BsFillTelephoneFill size={20} />
          <p className={s.text}>{number}</p>
        </div>
      </div>
      <button
        className={s.delete__button} 
        type="button"
        onClick={() => onDelete(id)}
      >
        Delete
      </button>
    </li>
  );
}

Contact.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired
  }).isRequired,
  onDelete: PropTypes.func.isRequired
};

export default Contact;
