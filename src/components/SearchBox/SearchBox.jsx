import { useId } from "react";
import s from "./SearchBox.module.css";
import PropTypes from 'prop-types';
function SearchBox({ filter, onFilter }) {
  const searchFieldId = useId();

  return (
    <div className={s.searchBox}>
      <label className={s.label} htmlFor={searchFieldId}>
        Find contacts by name
      </label>
      <input
        className={s.input}
        id={searchFieldId}
        type="text"
        value={filter}
        onChange={(event) => onFilter(event.target.value)}
      />
    </div>
  );
}
SearchBox.propTypes = {
    value: PropTypes.string.isRequired,
    onFilter: PropTypes.func.isRequired
};


export default SearchBox;
