import { createContext, useContext, useEffect, useMemo, useState } from 'react';

export const LOCALES = ['pt', 'en', 'fr'];
export const LANG_LABEL = { pt: 'PT', en: 'EN', fr: 'FR' };

const STORAGE_KEY = 'rnb-locale';
const DEFAULT_LOCALE = 'pt';

const translations = {
  pt: {
    'html.lang': 'pt-PT',
    'meta.title': 'RNB - Antenas e Serviços Técnicos | Pederneira, Ourém',
    'meta.description': 'RNB - Especialistas em instalação de antenas parabólicas, vigilância por vídeo, reparação de electrodomésticos e assistência técnica em Pederneira-Ourém, Portugal.',

    'nav.inicio': 'Início',
    'nav.empresa': 'Empresa',
    'nav.servicos': 'Serviços',
    'nav.portfolio': 'Portfolio',
    'nav.contactos': 'Contactos',

    'aria.logo': 'RNB - início',
    'aria.menu': 'Menu',
    'aria.nav': 'Navegação principal',
    'header.cta': 'Ligue Agora',

    'hero.title': 'Soluções Integradas em Infraestrutura e Suporte Técnico',
    'hero.subtitle': 'Expertise em instalação de sistemas de antenas, videovigilância e reparação de equipamentos, com mais de 20 anos ao serviço da região de Ourém.',
    'hero.cta': 'Solicitar Orçamento',

    'heroCard.antena': 'Antenas Parabólicas',
    'heroCard.cctv': 'Vigilância por Vídeo',
    'heroCard.maqlavar': 'Manutenção & Reparação',
    'alt.antena': 'Instalação de antena parabólica',
    'alt.cctv': 'Vigilância por vídeo',
    'alt.maqlavar': 'Reparação de electrodomésticos',

    'empresa.title': 'Uma Equipa de Confiança',
    'empresa.text': 'Há mais de 20 anos ao serviço da região de Pederneira-Ourém, a RNB tem experiência sólida na instalação de antenas parabólicas e na venda e reparação de electrodomésticos. Oferecemos assistência técnica especializada e soluções de vigilância por vídeo para particulares e empresas, na nossa loja física em Pederneira e em toda a região.',
    'empresa.imageAlt': 'Loja RNB Electrodomésticos em Pederneira',

    'servicos.title': 'Serviços',
    'service.antenas.title': 'Instalação de Antenas',
    'service.antenas.desc': 'Instalação profissional de antenas parabólicas para recepção de sinal de satélite de alta qualidade.',
    'service.cctv.title': 'Vigilância por Vídeo',
    'service.cctv.desc': 'Sistemas de videovigilância profissionais para segurança residencial e comercial.',
    'service.eletro.title': 'Reparação de Electrodomésticos',
    'service.eletro.desc': 'Reparação e manutenção de electrodomésticos com técnicos especializados e peças de qualidade.',
    'service.suporte.title': 'Assistência Técnica',
    'service.suporte.desc': 'Suporte técnico especializado e atendimento rápido para resolução de problemas.',

    'portfolio.title': 'Parceiros de Confiança',
    'portfolio.intro': 'Trabalhamos com as principais operadoras e provedores de serviços',

    'gallery.title': 'Galeria',
    'gallery.item1': 'Showroom RNB',
    'gallery.item2': 'Espaço de trabalho',
    'gallery.item3': 'Instalação técnica',
    'gallery.item4': 'Showroom RNB',
    'gallery.item5': 'Espaço RNB',
    'gallery.item6': 'Showroom RNB',

    'contactos.title': 'Contacte-nos',
    'contactos.infoTitle': 'Informações de Contacto',
    'contactos.morada': 'Morada:',
    'contactos.telefone': 'Telefone:',
    'contactos.telemovel': 'Telemóvel:',
    'contactos.email': 'Email:',
    'aria.facebook': 'RNB no Facebook',
    'map.title': 'Localização RNB',

    'footer.rights': 'Todos os direitos reservados.',

    'aria.language': 'Escolher idioma',
    'search.trigger': 'Pesquisar',
    'search.close': 'Fechar pesquisa',
    'search.placeholder': 'Pesquisar no site…',
    'search.hint': 'Pesquise por serviços, secções ou fotos.',
    'search.empty': 'Sem resultados para',
    'search.groupServices': 'Serviços',
    'search.groupSections': 'Secções',
    'search.groupGallery': 'Galeria'
  },

  en: {
    'html.lang': 'en',
    'meta.title': 'RNB - Antennas and Technical Services | Pederneira, Ourém',
    'meta.description': 'RNB - Specialists in satellite dish installation, video surveillance, household appliance repair and technical support in Pederneira-Ourém, Portugal.',

    'nav.inicio': 'Home',
    'nav.empresa': 'Company',
    'nav.servicos': 'Services',
    'nav.portfolio': 'Portfolio',
    'nav.contactos': 'Contact',

    'aria.logo': 'RNB - home',
    'aria.menu': 'Menu',
    'aria.nav': 'Main navigation',
    'header.cta': 'Call Now',

    'hero.title': 'Integrated Infrastructure and Technical Support Solutions',
    'hero.subtitle': 'Expertise in antenna system installation, video surveillance and equipment repair, with more than 20 years serving the Ourém area.',
    'hero.cta': 'Request a Quote',

    'heroCard.antena': 'Satellite Dishes',
    'heroCard.cctv': 'Video Surveillance',
    'heroCard.maqlavar': 'Maintenance & Repair',
    'alt.antena': 'Satellite dish installation',
    'alt.cctv': 'Video surveillance',
    'alt.maqlavar': 'Appliance repair',

    'empresa.title': 'A Team You Can Trust',
    'empresa.text': 'With more than 20 years serving the Pederneira-Ourém area, RNB has solid experience in satellite dish installation and in the sale and repair of household appliances. We offer specialised technical support and video surveillance solutions for individuals and businesses, from our physical store in Pederneira and throughout the region.',
    'empresa.imageAlt': 'RNB Electrodomésticos store in Pederneira',

    'servicos.title': 'Services',
    'service.antenas.title': 'Antenna Installation',
    'service.antenas.desc': 'Professional satellite dish installation for high-quality signal reception.',
    'service.cctv.title': 'Video Surveillance',
    'service.cctv.desc': 'Professional video surveillance systems for residential and commercial security.',
    'service.eletro.title': 'Appliance Repair',
    'service.eletro.desc': 'Repair and maintenance of household appliances with specialised technicians and quality parts.',
    'service.suporte.title': 'Technical Support',
    'service.suporte.desc': 'Specialised technical support and fast service to resolve any issue.',

    'portfolio.title': 'Trusted Partners',
    'portfolio.intro': 'We work with the leading network operators and service providers',

    'gallery.title': 'Gallery',
    'gallery.item1': 'RNB Showroom',
    'gallery.item2': 'Workspace',
    'gallery.item3': 'Technical installation',
    'gallery.item4': 'RNB Showroom',
    'gallery.item5': 'RNB Premises',
    'gallery.item6': 'RNB Showroom',

    'contactos.title': 'Contact Us',
    'contactos.infoTitle': 'Contact Information',
    'contactos.morada': 'Address:',
    'contactos.telefone': 'Phone:',
    'contactos.telemovel': 'Mobile:',
    'contactos.email': 'Email:',
    'aria.facebook': 'RNB on Facebook',
    'map.title': 'RNB Location',

    'footer.rights': 'All rights reserved.',

    'aria.language': 'Choose language',
    'search.trigger': 'Search',
    'search.close': 'Close search',
    'search.placeholder': 'Search the site…',
    'search.hint': 'Search for services, sections or photos.',
    'search.empty': 'No results for',
    'search.groupServices': 'Services',
    'search.groupSections': 'Sections',
    'search.groupGallery': 'Gallery'
  },

  fr: {
    'html.lang': 'fr',
    'meta.title': 'RNB - Antennes et Services Techniques | Pederneira, Ourém',
    'meta.description': "RNB - Spécialistes en installation d'antennes paraboliques, vidéosurveillance, réparation d'électroménager et assistance technique à Pederneira-Ourém, Portugal.",

    'nav.inicio': 'Accueil',
    'nav.empresa': 'Entreprise',
    'nav.servicos': 'Services',
    'nav.portfolio': 'Portfolio',
    'nav.contactos': 'Contact',

    'aria.logo': 'RNB - accueil',
    'aria.menu': 'Menu',
    'aria.nav': 'Navigation principale',
    'header.cta': 'Appelez maintenant',

    'hero.title': 'Solutions Intégrées en Infrastructure et Support Technique',
    'hero.subtitle': "Expertise en installation de systèmes d'antennes, vidéosurveillance et réparation d'équipements, avec plus de 20 ans au service de la région d'Ourém.",
    'hero.cta': 'Demander un Devis',

    'heroCard.antena': 'Antennes Paraboliques',
    'heroCard.cctv': 'Vidéosurveillance',
    'heroCard.maqlavar': 'Maintenance & Réparation',
    'alt.antena': "Installation d'antenne parabolique",
    'alt.cctv': 'Vidéosurveillance',
    'alt.maqlavar': "Réparation d'électroménager",

    'empresa.title': 'Une Équipe de Confiance',
    'empresa.text': "Depuis plus de 20 ans au service de la région de Pederneira-Ourém, RNB possède une solide expérience dans l'installation d'antennes paraboliques et dans la vente et la réparation d'électroménager. Nous offrons une assistance technique spécialisée et des solutions de vidéosurveillance pour les particuliers et les entreprises, depuis notre magasin physique à Pederneira et dans toute la région.",
    'empresa.imageAlt': 'Magasin RNB Electrodomésticos à Pederneira',

    'servicos.title': 'Services',
    'service.antenas.title': "Installation d'Antennes",
    'service.antenas.desc': "Installation professionnelle d'antennes paraboliques pour une réception satellite de haute qualité.",
    'service.cctv.title': 'Vidéosurveillance',
    'service.cctv.desc': 'Systèmes de vidéosurveillance professionnels pour la sécurité résidentielle et commerciale.',
    'service.eletro.title': "Réparation d'Électroménager",
    'service.eletro.desc': "Réparation et entretien d'électroménager par des techniciens spécialisés, avec des pièces de qualité.",
    'service.suporte.title': 'Assistance Technique',
    'service.suporte.desc': 'Assistance technique spécialisée et intervention rapide pour résoudre tout problème.',

    'portfolio.title': 'Partenaires de Confiance',
    'portfolio.intro': 'Nous travaillons avec les principaux opérateurs et fournisseurs de services',

    'gallery.title': 'Galerie',
    'gallery.item1': 'Showroom RNB',
    'gallery.item2': 'Espace de travail',
    'gallery.item3': 'Installation technique',
    'gallery.item4': 'Showroom RNB',
    'gallery.item5': 'Espace RNB',
    'gallery.item6': 'Showroom RNB',

    'contactos.title': 'Contactez-nous',
    'contactos.infoTitle': 'Coordonnées',
    'contactos.morada': 'Adresse :',
    'contactos.telefone': 'Téléphone :',
    'contactos.telemovel': 'Mobile :',
    'contactos.email': 'Email :',
    'aria.facebook': 'RNB sur Facebook',
    'map.title': 'Localisation RNB',

    'footer.rights': 'Tous droits réservés.',

    'aria.language': 'Choisir la langue',
    'search.trigger': 'Rechercher',
    'search.close': 'Fermer la recherche',
    'search.placeholder': 'Rechercher sur le site…',
    'search.hint': 'Recherchez des services, des sections ou des photos.',
    'search.empty': 'Aucun résultat pour',
    'search.groupServices': 'Services',
    'search.groupSections': 'Sections',
    'search.groupGallery': 'Galerie'
  }
};

const LocaleContext = createContext(null);

function readStoredLocale() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && translations[saved]) return saved;
  } catch {
    // localStorage indisponível (ex. modo privado) — usa o idioma padrão
  }
  return DEFAULT_LOCALE;
}

export function LocaleProvider({ children }) {
  const [locale, setLocale] = useState(readStoredLocale);

  useEffect(() => {
    const dict = translations[locale];
    document.documentElement.lang = dict['html.lang'];
    document.title = dict['meta.title'];
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', dict['meta.description']);
    try {
      localStorage.setItem(STORAGE_KEY, locale);
    } catch {
      // modo privado: aplica na mesma, apenas não persiste a escolha
    }
  }, [locale]);

  const value = useMemo(() => {
    const dict = translations[locale];
    const t = (key) => dict[key] ?? key;
    return { locale, setLocale, t };
  }, [locale]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error('useLocale must be used within a LocaleProvider');
  return ctx;
}
