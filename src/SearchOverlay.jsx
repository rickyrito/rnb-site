import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocale } from './i18n.jsx';

const normalize = (str) =>
  str.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/\s+/g, ' ').trim();

function highlight(text, term) {
  if (!term) return text;
  const haystack = normalize(text);
  const needle = normalize(term);
  const at = haystack.indexOf(needle);
  if (at === -1 || !needle) return text;
  return <>{text.slice(0, at)}<mark>{text.slice(at, at + needle.length)}</mark>{text.slice(at + needle.length)}</>;
}

export function SearchOverlay({ isOpen, onClose, items, onSelectGalleryImage }) {
  const { t } = useLocale();
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    setQuery('');
    document.body.style.overflow = 'hidden';
    const focusTimer = setTimeout(() => inputRef.current?.focus(), 50);
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKeyDown);
      clearTimeout(focusTimer);
    };
  }, [isOpen, onClose]);

  const matches = useMemo(() => {
    const needle = normalize(query);
    if (!needle) return [];
    return items.filter((item) => item.haystack.includes(needle));
  }, [items, query]);

  const groups = [
    ['services', t('search.groupServices')],
    ['sections', t('search.groupSections')],
    ['gallery', t('search.groupGallery')]
  ];

  const handleSelect = (item) => {
    onClose();
    if (item.group === 'gallery' && onSelectGalleryImage) {
      onSelectGalleryImage(item.galleryIndex);
      return;
    }
    const target = document.getElementById(item.sectionId);
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  if (!isOpen) return null;

  return (
    <div
      className="search-overlay"
      onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}
    >
      <div className="search-panel" role="dialog" aria-modal="true" aria-label={t('search.trigger')}>
        <div className="search-input-row">
          <input
            ref={inputRef}
            type="search"
            className="search-input"
            placeholder={t('search.placeholder')}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && matches.length) handleSelect(matches[0]);
            }}
          />
          <button type="button" className="search-close" aria-label={t('search.close')} onClick={onClose}>×</button>
        </div>
        <div className="search-results">
          {!query.trim() && <p className="search-hint">{t('search.hint')}</p>}
          {query.trim() && !matches.length && (
            <p className="search-hint">{t('search.empty')} "{query.trim()}"</p>
          )}
          {groups.map(([key, groupTitle]) => {
            const groupItems = matches.filter((item) => item.group === key);
            if (!groupItems.length) return null;
            return (
              <div key={key} className="search-group-block">
                <p className="search-group">{groupTitle}</p>
                {groupItems.map((item) => (
                  <button
                    type="button"
                    className="search-result"
                    key={`${item.group}-${item.title}`}
                    onClick={() => handleSelect(item)}
                  >
                    {item.thumb && <img className="search-thumb" src={item.thumb} alt="" />}
                    <span className="search-result-text">
                      <span className="search-result-title">{highlight(item.title, query)}</span>
                      {item.snippet && (
                        <span className="search-result-snippet">
                          {highlight(item.snippet.length > 120 ? `${item.snippet.slice(0, 120)}…` : item.snippet, query)}
                        </span>
                      )}
                    </span>
                  </button>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export { normalize };
