import s from "./ImageCard.module.css";

export function ImageCard({ src, alt, onClick, src_regular }) {
  return (
    <div className={s.wrapper}>
      <img onClick={() => onClick(src_regular, alt)} src={src} alt={alt} />
    </div>
  );
}
export default ImageCard