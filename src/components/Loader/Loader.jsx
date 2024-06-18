import { RotatingLines } from "react-loader-spinner";
import s from "./Loader.module.css"
export function Loader() {
  return (
    <div
     className={s.loader__spinner}
    >
      <RotatingLines
        visible={true}
        height="96"
        width="96"
        strokeColor="grey"
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
      />
    </div>
  );
}