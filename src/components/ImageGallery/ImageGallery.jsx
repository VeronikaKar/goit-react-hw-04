import { forwardRef } from "react";
import ImageCard from "../ImageCard/ImageCard";
import s from "./ImageGallery.module.css";

export function ImageGallery() {
  forwardRef(function ImageGallery(
    { gallery, onClick },
    ref
  ) {
    return (
      <ul className={s.list}>
        {gallery.map((img) => (
          <li className={s.item} key={img.id} ref={ref}>
            <ImageCard
              src={img.urls.small}
              src_regular={img.urls.regular}
              alt={img.alt_description}
              onClick={onClick}
            />
          </li>
        ))}
      </ul>
    );
  });
}