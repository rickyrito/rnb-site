import { useState } from 'react';
import { useLocale } from './i18n.jsx';

const CONTACT_EMAIL = 'geral@rnb.pt';

export function ContactForm() {
  const { t } = useLocale();
  const [values, setValues] = useState({ name: '', email: '', message: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const subject = encodeURIComponent(`${t('contactForm.subjectPrefix')} - ${values.name}`);
    const body = encodeURIComponent(
      `${t('contactForm.name')}: ${values.name}\n${t('contactForm.email')}: ${values.email}\n\n${values.message}`
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <h3>{t('contactForm.title')}</h3>
      <div className="form-field">
        <label htmlFor="contact-name">{t('contactForm.name')}</label>
        <input id="contact-name" name="name" type="text" autoComplete="name" required value={values.name} onChange={handleChange} />
      </div>
      <div className="form-field">
        <label htmlFor="contact-email">{t('contactForm.email')}</label>
        <input id="contact-email" name="email" type="email" autoComplete="email" required value={values.email} onChange={handleChange} />
      </div>
      <div className="form-field">
        <label htmlFor="contact-message">{t('contactForm.message')}</label>
        <textarea id="contact-message" name="message" rows={5} required value={values.message} onChange={handleChange} />
      </div>
      <button type="submit" className="btn btn-primary">{t('contactForm.submit')}</button>
      <p className="contact-form-note">{t('contactForm.note')}</p>
    </form>
  );
}
