import { useEffect, useState } from 'react';
import { useLocale } from './i18n.jsx';

const STORAGE_KEY = 'rnb-cookie-consent';

export function CookieBanner() {
  const { t } = useLocale();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, 'accepted');
    } catch {
      // modo privado: fecha na mesma, apenas não persiste a escolha
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cookie-banner" role="dialog" aria-label={t('cookies.title')}>
      <p className="cookie-banner-text">{t('cookies.text')}</p>
      <button type="button" className="cookie-banner-accept" onClick={accept}>{t('cookies.accept')}</button>
    </div>
  );
}
