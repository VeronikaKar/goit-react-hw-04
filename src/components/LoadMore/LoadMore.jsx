import s from "./LoadMore.module.css";

export function LoadMoreBtn({ onClick }) {
  return (
    <button onClick={onClick} className={s.button__load}>
      Load more
    </button>
  );
}
