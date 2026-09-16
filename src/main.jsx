import { StrictMode, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { LOCALES, LANG_LABEL, LocaleProvider, useLocale } from './i18n.jsx';
import { SearchOverlay, normalize } from './SearchOverlay.jsx';
import '../assets/css/style.css';

const services = [
  { titleKey: 'service.antenas.title', descKey: 'service.antenas.desc', icon: <><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></> },
  { titleKey: 'service.cctv.title', descKey: 'service.cctv.desc', icon: <><path d="M23 7l-7 5 7 5V7z" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" /></> },
  { titleKey: 'service.eletro.title', descKey: 'service.eletro.desc', icon: <><circle cx="6" cy="6" r="1" /><circle cx="6" cy="18" r="1" /><circle cx="18" cy="18" r="1" /><rect x="2" y="3" width="20" height="18" rx="2" /><path d="M2 9h20" /></> },
  { titleKey: 'service.suporte.title', descKey: 'service.suporte.desc', icon: <><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></> }
];

const heroCards = [
  ['antena-satelite-rnb.jpeg', 'alt.antena', 'heroCard.antena'],
  ['cctv-ada14077.jpeg', 'alt.cctv', 'heroCard.cctv'],
  ['frigorifico-rnb.jpeg', 'alt.maqlavar', 'heroCard.maqlavar']
];

const partners = [['meo.jpeg', 'MEO'], ['nos.jpeg', 'NOS'], ['vodafone.jpeg', 'Vodafone'], ['tnt-sat.jpeg', 'TNT Sat']];
const gallery = [
  ['galeria-1.jpeg', 'gallery.item1'],
  ['galeria-2.jpeg', 'gallery.item2'],
  ['galeria-3.jpeg', 'gallery.item3'],
  ['galeria-4.jpeg', 'gallery.item4'],
  ['galeria-5.jpeg', 'gallery.item5'],
  ['galeria-6.jpeg', 'gallery.item6']
];

const links = [['inicio', 'nav.inicio'], ['empresa', 'nav.empresa'], ['servicos', 'nav.servicos'], ['portfolio', 'nav.portfolio'], ['contactos', 'nav.contactos']];

const BASE = import.meta.env.BASE_URL;
const img = (path) => `${BASE}assets/img/${path}`;

const Icon = ({ children }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">{children}</svg>;

function LanguageSwitcher() {
  const { locale, setLocale, t } = useLocale();
  return (
    <div className="language-switcher" role="group" aria-label={t('aria.language')}>
      {LOCALES.map((code) => (
        <button
          type="button"
          key={code}
          className={`language-option${code === locale ? ' active' : ''}`}
          aria-pressed={code === locale}
          onClick={() => setLocale(code)}
        >
          {LANG_LABEL[code]}
        </button>
      ))}
    </div>
  );
}

function Header({ isMenuOpen, onToggleMenu, onNavigate, onOpenSearch }) {
  const { t } = useLocale();
  return <header className="site-header"><div className="container header-inner">
    <a className="logo" href="#inicio" onClick={onNavigate} aria-label={t('aria.logo')}><img src={img('logo.svg')} alt="RNB" className="logo-standard" /><img src={img('logo-w.svg')} alt="" className="logo-white" /></a>
    <nav className={`main-nav${isMenuOpen ? ' active' : ''}`} aria-label={t('aria.nav')}>
      <button type="button" className="nav-toggle" aria-label={t('aria.menu')} aria-expanded={isMenuOpen} onClick={onToggleMenu}><span /><span /><span /></button>
      <ul className="nav-menu">{links.map(([id, labelKey]) => <li key={id}><a href={`#${id}`} onClick={onNavigate}>{t(labelKey)}</a></li>)}</ul>
    </nav>
    <div className="header-actions">
      <button type="button" className="icon-button" aria-label={t('search.trigger')} onClick={onOpenSearch}>
        <Icon><circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></Icon>
      </button>
      <LanguageSwitcher />
      <a href="tel:249570010" className="cta-button">{t('header.cta')}</a>
    </div>
  </div></header>;
}

function App() {
  const { t } = useLocale();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  const searchItems = useMemo(() => {
    const items = [];
    services.forEach((service) => {
      const title = t(service.titleKey);
      const snippet = t(service.descKey);
      items.push({ group: 'services', title, snippet, sectionId: 'servicos', haystack: normalize(`${title} ${snippet}`) });
    });
    [
      { titleKey: 'empresa.title', snippetKey: 'empresa.text', sectionId: 'empresa' },
      { titleKey: 'portfolio.title', snippetKey: 'portfolio.intro', sectionId: 'portfolio' },
      { titleKey: 'contactos.title', snippetKey: '', sectionId: 'contactos' }
    ].forEach(({ titleKey, snippetKey, sectionId }) => {
      const title = t(titleKey);
      const snippet = snippetKey ? t(snippetKey) : '';
      items.push({ group: 'sections', title, snippet, sectionId, haystack: normalize(`${title} ${snippet}`) });
    });
    gallery.forEach(([image, altKey]) => {
      const title = t(altKey);
      items.push({ group: 'gallery', title, snippet: '', thumb: img(`gallery/${image}`), sectionId: 'galeria', haystack: normalize(title) });
    });
    return items;
  }, [t]);

  return <>
    <Header isMenuOpen={isMenuOpen} onToggleMenu={() => setIsMenuOpen((open) => !open)} onNavigate={closeMenu} onOpenSearch={() => setIsSearchOpen(true)} />
    <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} items={searchItems} />
    <main>
      <section id="inicio" className="hero"><div className="container"><div className="hero-content"><h1>{t('hero.title')}</h1><p className="hero-subtitle">{t('hero.subtitle')}</p><a href="#contactos" className="btn btn-primary">{t('hero.cta')}</a></div><div className="hero-cards">{heroCards.map(([image, altKey, titleKey]) => <article className="hero-card" key={image}><img src={img(image)} alt={t(altKey)} /><h3>{t(titleKey)}</h3></article>)}</div></div></section>
      <section id="empresa" className="welcome-section"><div className="container welcome-content"><div className="welcome-text"><h2>{t('empresa.title')}</h2><p className="section-intro">{t('empresa.text')}</p></div><div className="welcome-image"><img src={img('loja-rnb.jpeg')} alt={t('empresa.imageAlt')} /></div></div></section>
      <section id="servicos" className="services-section"><div className="container"><h2>{t('servicos.title')}</h2><div className="services-grid">{services.map((service) => <article className="service-item" key={service.titleKey}><div className="service-icon"><Icon>{service.icon}</Icon></div><h3>{t(service.titleKey)}</h3><p>{t(service.descKey)}</p></article>)}</div></div></section>
      <section id="portfolio" className="portfolio-section"><div className="container"><h2>{t('portfolio.title')}</h2><p className="section-intro">{t('portfolio.intro')}</p><div className="partners-grid">{partners.map(([image, alt]) => <div className="partner" key={image}><img src={img(`partners/${image}`)} alt={alt} /></div>)}</div></div></section>
      <section id="galeria" className="gallery-section"><div className="container"><h2>{t('gallery.title')}</h2><div className="gallery-grid">{gallery.map(([image, altKey]) => <figure className="gallery-item" key={image}><img src={img(`gallery/${image}`)} alt={t(altKey)} /></figure>)}</div></div></section>
      <section id="contactos" className="contact-section"><div className="container"><h2>{t('contactos.title')}</h2><div className="contact-content"><div className="contact-info"><h3>{t('contactos.infoTitle')}</h3><div className="info-item"><strong>{t('contactos.morada')}</strong><p>Rua da Salgueirinha, 5A<br />2435-689 Pederneira<br />Ourém, Portugal</p></div><div className="info-item"><strong>{t('contactos.telefone')}</strong><p><a href="tel:249570010">249 570 010</a></p></div><div className="info-item"><strong>{t('contactos.telemovel')}</strong><p><a href="tel:937335067">937 335 067</a></p></div><div className="info-item"><strong>{t('contactos.email')}</strong><p><a href="mailto:geral@rnb.pt">geral@rnb.pt</a></p></div><div className="social-links"><a href="https://www.facebook.com/rnb.pt" target="_blank" rel="noopener noreferrer" aria-label={t('aria.facebook')}><Icon><path fill="currentColor" stroke="none" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></Icon></a></div></div><div className="contact-map"><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3036.5823094859003!2d-7.485486!3d39.817155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd2e8f8c8c8c8c8c9%3A0xc8c8c8c8c8c8c8c8!2sRua%20da%20Salgueirinha%205A%2C%202435-689%20Pederneira!5e0!3m2!1spt!2spt!4v1234567890" width="100%" height="400" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title={t('map.title')} /></div></div></div></section>
    </main>
    <footer className="site-footer"><div className="container"><p>&copy; {new Date().getFullYear()} RNB. {t('footer.rights')}</p></div></footer>
  </>;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LocaleProvider>
      <App />
    </LocaleProvider>
  </StrictMode>
);
