import { useEffect } from 'react';

export function Lightbox({ items, index, onClose, onPrev, onNext }) {
  const isOpen = index !== null;

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowRight') onNext();
      if (event.key === 'ArrowLeft') onPrev();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onClose, onNext, onPrev]);

  if (!isOpen) return null;

  const item = items[index];

  return (
    <div className="lightbox active" onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <button type="button" className="lightbox-close" onClick={onClose}>&times;</button>
      <div className="lightbox-content">
        <img src={item.src} alt={item.caption} />
        <p className="lightbox-caption-text">{item.caption}</p>
      </div>
      <button type="button" className="lightbox-prev" onClick={onPrev} aria-label="Previous">&#10094;</button>
      <button type="button" className="lightbox-next" onClick={onNext} aria-label="Next">&#10095;</button>
    </div>
  );
}
