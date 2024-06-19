import ImageCard from "../ImageCard/ImageCard";
import s from "./ImageGallery.module.css";

export function ImageGallery({ gallery, onClick }) {
  return (
    <ul className={s.list}>
      {gallery.map((img) => (
        <li className={s.item} key={img.id}>
          <ImageCard
            className={s.img_card}
            src={img.urls.small}
            src_regular={img.urls.regular}
            alt={img.alt_description}
            onClick={onClick}
          />
        </li>
      ))}
    </ul>
  );
}
