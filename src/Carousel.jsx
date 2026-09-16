import { useEffect, useState } from 'react';

const AUTOPLAY_MS = 4500;

export function Carousel({ items, renderItem, className = '' }) {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const count = items.length;

  const goTo = (nextIndex) => setIndex((nextIndex + count) % count);
  const goPrev = () => goTo(index - 1);
  const goNext = () => goTo(index + 1);

  useEffect(() => {
    if (isPaused || count <= 1) return undefined;
    const timer = setInterval(() => setIndex((i) => (i + 1) % count), AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [isPaused, count]);

  return (
    <div
      className={`carousel ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="carousel-track" style={{ transform: `translateX(-${index * 100}%)` }}>
        {items.map((item, i) => (
          <div className="carousel-slide" key={item.key}>{renderItem(item, i)}</div>
        ))}
      </div>

      {count > 1 && (
        <>
          <button type="button" className="carousel-arrow carousel-prev" onClick={goPrev} aria-label="Previous">&#10094;</button>
          <button type="button" className="carousel-arrow carousel-next" onClick={goNext} aria-label="Next">&#10095;</button>
          <div className="carousel-dots">
            {items.map((item, i) => (
              <button
                type="button"
                key={item.key}
                className={`carousel-dot${i === index ? ' active' : ''}`}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
