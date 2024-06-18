import s from "./ErrorMessage.module.css";
export function ErrorMessage() {
  return (
    <>
      <p className={s.error__message}>
        Something went wrong... Please try again!
      </p>
    </>
  );
}

