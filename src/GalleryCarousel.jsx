import { Carousel } from './Carousel.jsx';

export function GalleryCarousel({ items, onSelect }) {
  return (
    <Carousel
      className="gallery-carousel"
      items={items}
      renderItem={(item, i) => (
        <figure className="gallery-carousel-item" onClick={() => onSelect(i)}>
          <img src={item.image} alt={item.caption} />
          <figcaption className="gallery-carousel-caption">{item.caption}</figcaption>
        </figure>
      )}
    />
  );
}
