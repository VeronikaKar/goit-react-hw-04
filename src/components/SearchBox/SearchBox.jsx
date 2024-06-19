import toast from "react-hot-toast";
import s from "./SearchBox.module.css";

export function SearchBox({ onSubmit }) {
  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const value = event.target.elements.search.value;

    if (value.trim() === "") {
      toast.error("Field can't be empty!");
      form.reset();
      return;
    }

    onSubmit(value);
    form.reset();
  };

  return (
    <header>
      <form className="flex items-center gap-4 w-96" onSubmit={handleSubmit}>
        <input
          className={s.input}
          name="search"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button className={s.button__search} type="submit">
          Search
        </button>
      </form>
    </header>
  );
}
