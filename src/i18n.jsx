import { createContext, useContext, useEffect, useMemo, useState } from 'react';

export const LOCALES = ['pt', 'en', 'fr'];
export const LANG_LABEL = { pt: 'PT', en: 'EN', fr: 'FR' };
export const LANG_FLAG = { pt: '🇵🇹', en: '🇬🇧', fr: '🇫🇷' };

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
    'about.item1.title': '20+ Anos de Experiência',
    'about.item1.text': 'Duas décadas de dedicação ao serviço técnico especializado e inovação contínua.',
    'about.item2.title': 'Equipa Certificada',
    'about.item2.text': 'Técnicos qualificados e recertificados regularmente nas nossas áreas de especialidade.',
    'about.item3.title': 'Atendimento Rápido',
    'about.item3.text': 'Resposta ágil a solicitações, com disponibilidade para urgências durante a semana.',

    'whyUs.title': 'Por Que Nos Escolher',
    'whyUs.item1.title': 'Experiência Comprovada',
    'whyUs.item1.text': 'Mais de 20 anos de atuação contínua com centenas de clientes satisfeitos.',
    'whyUs.item2.title': 'Serviço Profissional',
    'whyUs.item2.text': 'Equipa especializada, formações contínuas e equipamento de última geração.',
    'whyUs.item3.title': 'Preços Competitivos',
    'whyUs.item3.text': 'Orçamentos sem compromisso, com garantias claras e transparentes.',
    'whyUs.item4.title': 'Disponibilidade',
    'whyUs.item4.text': 'Atendimento em horário comercial, com possibilidade de emergências agendadas.',
    'whyUs.item5.title': 'Garantia de Qualidade',
    'whyUs.item5.text': 'Todos os serviços com garantia de execução e conformidade técnica.',
    'whyUs.item6.title': 'Suporte Contínuo',
    'whyUs.item6.text': 'Assistência técnica pós-instalação e manutenção preventiva disponível.',

    'servicos.title': 'Serviços',
    'servicos.intro': 'Soluções completas para a sua casa ou negócio, da instalação à assistência pós-venda.',
    'service.venda.title': 'Venda de Electrodomésticos',
    'service.venda.desc': 'As melhores marcas ao melhor preço, com aconselhamento especializado para encontrar o equipamento certo para si.',
    'service.antenas.title': 'Instalação de Antenas',
    'service.antenas.desc': 'Sinal de satélite nítido em qualquer ponto da casa, com instalação profissional e sem surpresas na fatura.',
    'service.cctv.title': 'Vigilância por Vídeo',
    'service.cctv.desc': 'Proteja o que é seu com sistemas de videovigilância fiáveis, pensados para a sua casa ou negócio.',
    'service.eletro.title': 'Reparação de Electrodomésticos',
    'service.eletro.desc': 'Damos nova vida aos seus equipamentos: reparação rápida, peças originais e garantia em cada intervenção.',
    'service.suporte.title': 'Assistência Técnica',
    'service.suporte.desc': 'Apoio técnico especializado, resposta rápida e uma equipa pronta para resolver o que for preciso.',

    'portfolio.title': 'Parceiros de Confiança',
    'portfolio.intro': 'Trabalhamos com as principais operadoras e provedores de serviços',

    'gallery.title': 'Galeria',
    'gallery.intro': 'Conheça os nossos espaços e equipamentos profissionais',
    'gallery.item1': 'Showroom de Electrodomésticos',
    'gallery.item2': 'Centro de Operações',
    'gallery.item3': 'Linha de Reparação Especializada',
    'gallery.item4': 'Showroom Principal',
    'gallery.item5': 'Área de Assistência Técnica',
    'gallery.item6': 'Sede da RNB',

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
    'search.groupGallery': 'Galeria',

    'cookies.title': 'Aviso de cookies',
    'cookies.text': 'Este site usa cookies essenciais e do Google Fonts/Maps para melhorar a sua experiência. Ao continuar a navegar, aceita a sua utilização.',
    'cookies.accept': 'Aceitar'
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
    'about.item1.title': '20+ Years of Experience',
    'about.item1.text': 'Two decades dedicated to specialised technical service and continuous innovation.',
    'about.item2.title': 'Certified Team',
    'about.item2.text': 'Qualified technicians, regularly recertified in their areas of expertise.',
    'about.item3.title': 'Fast Response',
    'about.item3.text': 'Quick response to requests, with availability for urgent matters during the week.',

    'whyUs.title': 'Why Choose Us',
    'whyUs.item1.title': 'Proven Experience',
    'whyUs.item1.text': 'More than 20 years of continuous operation with hundreds of satisfied customers.',
    'whyUs.item2.title': 'Professional Service',
    'whyUs.item2.text': 'Specialised team, ongoing training and state-of-the-art equipment.',
    'whyUs.item3.title': 'Competitive Pricing',
    'whyUs.item3.text': 'No-obligation quotes with clear, transparent guarantees.',
    'whyUs.item4.title': 'Availability',
    'whyUs.item4.text': 'Service during business hours, with scheduled emergencies available.',
    'whyUs.item5.title': 'Quality Guarantee',
    'whyUs.item5.text': 'All services backed by a guarantee of execution and technical compliance.',
    'whyUs.item6.title': 'Ongoing Support',
    'whyUs.item6.text': 'Post-installation technical support and preventive maintenance available.',

    'servicos.title': 'Services',
    'servicos.intro': 'Complete solutions for your home or business, from installation to after-sales support.',
    'service.venda.title': 'Appliance Sales',
    'service.venda.desc': 'Leading brands at the best prices, with expert advice to help you find the right equipment.',
    'service.antenas.title': 'Antenna Installation',
    'service.antenas.desc': 'Crystal-clear satellite signal anywhere in your home, professionally installed with no surprises on the bill.',
    'service.cctv.title': 'Video Surveillance',
    'service.cctv.desc': 'Protect what matters with reliable video surveillance systems, tailored to your home or business.',
    'service.eletro.title': 'Appliance Repair',
    'service.eletro.desc': 'We bring your appliances back to life: fast repairs, original parts and a warranty on every job.',
    'service.suporte.title': 'Technical Support',
    'service.suporte.desc': 'Specialised technical support, fast response times and a team ready to solve whatever comes up.',

    'portfolio.title': 'Trusted Partners',
    'portfolio.intro': 'We work with the leading network operators and service providers',

    'gallery.title': 'Gallery',
    'gallery.intro': 'Take a look at our spaces and professional equipment',
    'gallery.item1': 'Appliance Showroom',
    'gallery.item2': 'Operations Center',
    'gallery.item3': 'Specialised Repair Line',
    'gallery.item4': 'Main Showroom',
    'gallery.item5': 'Technical Support Area',
    'gallery.item6': 'RNB Headquarters',

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
    'search.groupGallery': 'Gallery',

    'cookies.title': 'Cookie notice',
    'cookies.text': 'This site uses essential cookies and Google Fonts/Maps to improve your experience. By continuing to browse, you agree to their use.',
    'cookies.accept': 'Accept'
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
    'about.item1.title': 'Plus de 20 Ans d’Expérience',
    'about.item1.text': "Deux décennies dédiées au service technique spécialisé et à l'innovation continue.",
    'about.item2.title': 'Équipe Certifiée',
    'about.item2.text': 'Techniciens qualifiés, recertifiés régulièrement dans leurs domaines d’expertise.',
    'about.item3.title': 'Réponse Rapide',
    'about.item3.text': 'Réponse rapide aux demandes, avec disponibilité pour les urgences en semaine.',

    'whyUs.title': 'Pourquoi Nous Choisir',
    'whyUs.item1.title': 'Expérience Prouvée',
    'whyUs.item1.text': "Plus de 20 ans d'activité continue avec des centaines de clients satisfaits.",
    'whyUs.item2.title': 'Service Professionnel',
    'whyUs.item2.text': 'Équipe spécialisée, formation continue et équipement de dernière génération.',
    'whyUs.item3.title': 'Prix Compétitifs',
    'whyUs.item3.text': 'Devis sans engagement, avec des garanties claires et transparentes.',
    'whyUs.item4.title': 'Disponibilité',
    'whyUs.item4.text': "Service pendant les heures d'ouverture, avec urgences programmables.",
    'whyUs.item5.title': 'Garantie de Qualité',
    'whyUs.item5.text': "Tous les services sont couverts par une garantie d'exécution et de conformité technique.",
    'whyUs.item6.title': 'Support Continu',
    'whyUs.item6.text': 'Assistance technique post-installation et maintenance préventive disponibles.',

    'servicos.title': 'Services',
    'servicos.intro': "Des solutions complètes pour votre maison ou votre entreprise, de l'installation au service après-vente.",
    'service.venda.title': "Vente d'Électroménager",
    'service.venda.desc': "Les meilleures marques au meilleur prix, avec des conseils d'experts pour trouver l'équipement qui vous convient.",
    'service.antenas.title': "Installation d'Antennes",
    'service.antenas.desc': "Un signal satellite impeccable partout chez vous, installé par des professionnels, sans mauvaise surprise sur la facture.",
    'service.cctv.title': 'Vidéosurveillance',
    'service.cctv.desc': 'Protégez ce qui compte avec des systèmes de vidéosurveillance fiables, adaptés à votre maison ou votre entreprise.',
    'service.eletro.title': "Réparation d'Électroménager",
    'service.eletro.desc': "Nous redonnons vie à vos appareils : réparation rapide, pièces d'origine et garantie sur chaque intervention.",
    'service.suporte.title': 'Assistance Technique',
    'service.suporte.desc': "Assistance technique spécialisée, réponse rapide et une équipe prête à résoudre tous vos problèmes.",

    'portfolio.title': 'Partenaires de Confiance',
    'portfolio.intro': 'Nous travaillons avec les principaux opérateurs et fournisseurs de services',

    'gallery.title': 'Galerie',
    'gallery.intro': 'Découvrez nos espaces et nos équipements professionnels',
    'gallery.item1': "Showroom d'Électroménager",
    'gallery.item2': "Centre d'Opérations",
    'gallery.item3': 'Ligne de Réparation Spécialisée',
    'gallery.item4': 'Showroom Principal',
    'gallery.item5': "Espace d'Assistance Technique",
    'gallery.item6': 'Siège de RNB',

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
    'search.groupGallery': 'Galerie',

    'cookies.title': 'Avis relatif aux cookies',
    'cookies.text': "Ce site utilise des cookies essentiels et Google Fonts/Maps pour améliorer votre expérience. En continuant à naviguer, vous acceptez leur utilisation.",
    'cookies.accept': 'Accepter'
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
