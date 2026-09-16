import { StrictMode, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { LOCALES, LANG_LABEL, LANG_FLAG, LocaleProvider, useLocale } from './i18n.jsx';
import { SearchOverlay, normalize } from './SearchOverlay.jsx';
import { Lightbox } from './Lightbox.jsx';
import { HeroCarousel } from './HeroCarousel.jsx';
import { GalleryCarousel } from './GalleryCarousel.jsx';
import { CookieBanner } from './CookieBanner.jsx';
import '../assets/css/style.css';

const services = [
  {
    titleKey: 'service.venda.title', descKey: 'service.venda.desc',
    image: 'gallery/galeria-1.jpeg', altKey: 'gallery.item1',
    icon: <><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /></>
  },
  {
    titleKey: 'service.antenas.title', descKey: 'service.antenas.desc',
    image: 'antena-pexels.jpeg', altKey: 'alt.antena',
    icon: <><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></>
  },
  {
    titleKey: 'service.cctv.title', descKey: 'service.cctv.desc',
    image: 'cctv-pexels.jpeg', altKey: 'alt.cctv',
    icon: <><path d="M23 7l-7 5 7 5V7z" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" /></>
  },
  {
    titleKey: 'service.eletro.title', descKey: 'service.eletro.desc',
    image: 'gallery/galeria-3.jpeg', altKey: 'gallery.item3',
    icon: <><circle cx="6" cy="6" r="1" /><circle cx="6" cy="18" r="1" /><circle cx="18" cy="18" r="1" /><rect x="2" y="3" width="20" height="18" rx="2" /><path d="M2 9h20" /></>
  },
  {
    titleKey: 'service.suporte.title', descKey: 'service.suporte.desc',
    image: 'gallery/galeria-5.jpeg', altKey: 'gallery.item5',
    icon: <><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></>
  }
];

const heroCards = [
  ['antena-pexels.jpeg', 'alt.antena', 'heroCard.antena'],
  ['cctv-pexels.jpeg', 'alt.cctv', 'heroCard.cctv'],
  ['eletrodomesticos-pexels.jpeg', 'alt.maqlavar', 'heroCard.maqlavar']
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

const aboutItems = ['about.item1', 'about.item2', 'about.item3'];
const whyUsItems = ['whyUs.item1', 'whyUs.item2', 'whyUs.item3', 'whyUs.item4', 'whyUs.item5', 'whyUs.item6'];

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
          <span className="language-flag" aria-hidden="true">{LANG_FLAG[code]}</span>
          <span className="language-code">{LANG_LABEL[code]}</span>
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
      <button type="button" className="search-trigger" onClick={onOpenSearch}>
        <Icon><circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></Icon>
        <span>{t('search.trigger')}</span>
      </button>
      <LanguageSwitcher />
      <a href="tel:+351926002095" className="phone-badge">
        <Icon><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></Icon>
        +351 926 002 095
      </a>
    </div>
  </div></header>;
}

function App() {
  const { t } = useLocale();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const closeMenu = () => setIsMenuOpen(false);

  const lightboxItems = useMemo(
    () => gallery.map(([image, altKey]) => ({ src: img(`gallery/${image}`), caption: t(altKey) })),
    [t]
  );

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
      { titleKey: 'whyUs.title', snippetKey: '', sectionId: 'porque-nos-escolher' },
      { titleKey: 'contactos.title', snippetKey: '', sectionId: 'contactos' }
    ].forEach(({ titleKey, snippetKey, sectionId }) => {
      const title = t(titleKey);
      const snippet = snippetKey ? t(snippetKey) : '';
      items.push({ group: 'sections', title, snippet, sectionId, haystack: normalize(`${title} ${snippet}`) });
    });
    gallery.forEach(([image, altKey], index) => {
      const title = t(altKey);
      items.push({ group: 'gallery', title, snippet: '', thumb: img(`gallery/${image}`), galleryIndex: index, sectionId: 'galeria', haystack: normalize(title) });
    });
    return items;
  }, [t]);

  return <>
    <Header isMenuOpen={isMenuOpen} onToggleMenu={() => setIsMenuOpen((open) => !open)} onNavigate={closeMenu} onOpenSearch={() => setIsSearchOpen(true)} />
    <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} items={searchItems} onSelectGalleryImage={setLightboxIndex} />
    <Lightbox
      items={lightboxItems}
      index={lightboxIndex}
      onClose={() => setLightboxIndex(null)}
      onPrev={() => setLightboxIndex((i) => (i - 1 + gallery.length) % gallery.length)}
      onNext={() => setLightboxIndex((i) => (i + 1) % gallery.length)}
    />
    <main>
      <section id="inicio" className="hero"><div className="container"><div className="hero-content"><h1>{t('hero.title')}</h1><p className="hero-subtitle">{t('hero.subtitle')}</p><a href="#contactos" className="btn btn-primary">{t('hero.cta')}</a></div><HeroCarousel items={heroCards.map(([image, altKey, titleKey]) => ({ key: image, image: img(image), alt: t(altKey), title: t(titleKey) }))} /></div></section>
      <section id="empresa" className="welcome-section"><div className="container"><div className="welcome-content"><div className="welcome-text"><h2>{t('empresa.title')}</h2><p className="section-intro">{t('empresa.text')}</p></div><div className="welcome-image"><img src={img('loja-rnb.jpeg')} alt={t('empresa.imageAlt')} /></div></div><div className="about-grid">{aboutItems.map((key) => <div className="about-item" key={key}><h4>{t(`${key}.title`)}</h4><p>{t(`${key}.text`)}</p></div>)}</div></div></section>
      <section id="servicos" className="services-section"><div className="container"><h2>{t('servicos.title')}</h2><p className="section-intro">{t('servicos.intro')}</p><div className="services-grid">{services.map((service) => <article className="service-card" key={service.titleKey}><div className="service-card-image"><img src={img(service.image)} alt={t(service.altKey)} /><span className="service-card-icon"><Icon>{service.icon}</Icon></span></div><div className="service-card-body"><h3>{t(service.titleKey)}</h3><p>{t(service.descKey)}</p></div></article>)}</div></div></section>
      <section id="portfolio" className="portfolio-section"><div className="container"><h2>{t('portfolio.title')}</h2><p className="section-intro">{t('portfolio.intro')}</p><div className="partners-grid">{partners.map(([image, alt]) => <div className="partner" key={image}><img src={img(`partners/${image}`)} alt={alt} /></div>)}</div></div></section>
      <section id="porque-nos-escolher" className="why-us-section"><div className="container"><h2>{t('whyUs.title')}</h2><div className="why-us-grid">{whyUsItems.map((key) => <div className="why-us-item" key={key}><span className="why-us-icon">✓</span><h4>{t(`${key}.title`)}</h4><p>{t(`${key}.text`)}</p></div>)}</div></div></section>
      <section id="galeria" className="gallery-section"><div className="container"><h2>{t('gallery.title')}</h2><p className="section-intro">{t('gallery.intro')}</p><GalleryCarousel
        items={gallery.map(([image, altKey]) => ({ key: image, image: img(`gallery/${image}`), caption: t(altKey) }))}
        onSelect={setLightboxIndex}
      /></div></section>
      <section id="contactos" className="contact-section"><div className="container"><h2>{t('contactos.title')}</h2><div className="contact-content"><div className="contact-info"><h3>{t('contactos.infoTitle')}</h3><div className="info-item"><strong>{t('contactos.morada')}</strong><p>Rua da Salgueirinha, 5A<br />2435-689 Pederneira<br />Ourém, Portugal</p></div><div className="info-item"><strong>{t('contactos.telefone')}</strong><p><a href="tel:249570010">249 570 010</a></p></div><div className="info-item"><strong>{t('contactos.telemovel')}</strong><p><a href="tel:937335067">937 335 067</a></p></div><div className="info-item"><strong>{t('contactos.email')}</strong><p><a href="mailto:geral@rnb.pt">geral@rnb.pt</a></p></div><div className="social-links"><a href="https://www.facebook.com/rnb.pt" target="_blank" rel="noopener noreferrer" aria-label={t('aria.facebook')}><Icon><path fill="currentColor" stroke="none" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></Icon></a></div></div><div className="contact-map"><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3036.5823094859003!2d-7.485486!3d39.817155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd2e8f8c8c8c8c8c9%3A0xc8c8c8c8c8c8c8c8!2sRua%20da%20Salgueirinha%205A%2C%202435-689%20Pederneira!5e0!3m2!1spt!2spt!4v1234567890" width="100%" height="400" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title={t('map.title')} /></div></div></div></section>
    </main>
    <footer className="site-footer"><div className="container"><p>&copy; {new Date().getFullYear()} RNB. {t('footer.rights')}</p></div></footer>
    <CookieBanner />
  </>;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LocaleProvider>
      <App />
    </LocaleProvider>
  </StrictMode>
);
