import { Carousel } from './Carousel.jsx';

export function HeroCarousel({ items }) {
  return (
    <Carousel
      className="hero-carousel"
      items={items}
      renderItem={(item) => (
        <article className="hero-card">
          <img src={item.image} alt={item.alt} />
          <h3>{item.title}</h3>
        </article>
      )}
    />
  );
}
