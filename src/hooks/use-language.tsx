import { createContext, useState, useContext, ReactNode } from 'react';

// Define all translations
const translations = {
  en: {
    header: {
      home: "Home",
      about: "About",
      releases: "Releases",
      services: "Services",
      photos: "Photos",
      contact: "Contact",
      getStarted: "Get Started"
    },
    hero: {
      title: "Turning Vision Into Sound",
      subtitle: "We help artists develop their unique sound and bring their musical vision to life.",
      subtitle2: "Ready to elevate your music career?",
      submitMusic: "Submit Your Music",
      watchShowreel: "Connect on WhatsApp",
      artistsSigned: "Artists Signed",
      monthlyStreams: "Monthly Streams",
      industryAwards: "Industry Awards",
      yearsExperience: "Years Experience",
      trustedBy: "Trusted by leading platforms",
      scrollDown: "Scroll Down"
    },
    about: {
      aboutUs: "About Us",
      ourStory: "Our ",
      story: "Story",
      paragraph1: "Founded in 2015, Boss of Melody started as a small independent label with a passion for discovering unique talent. What began as a dream in a home studio has now grown into an influential music label with a global reach.",
      paragraph2: "Our label focuses on fostering creative environments where artists can truly express themselves and develop their unique sound. We believe in long-term artist development rather than chasing short-term trends.",
      paragraph3: "Over the years, we've collaborated with over 100 artists across multiple genres, helping them navigate the ever-evolving music industry while staying true to their artistic vision.",
      quote: "Music isn't just about sounds; it's about creating experiences that resonate with people's souls and leave lasting impressions.",
      founder: "Moises Marsh, Founder",
      vision: "Our Vision",
      visionText: "We envision a music industry where artists are empowered to create authentically without compromise, reaching audiences who truly appreciate their unique expression.",
      visionItem1: "Pushing the boundaries of music innovation",
      visionItem2: "Creating opportunities for diverse voices",
      visionItem3: "Building sustainable careers for artists",
      visionItem4: "Fostering collaborations across genres and borders",
      mission: "Our Mission",
      missionText: "To discover, develop and promote artists who challenge conventions and push boundaries, while providing them with the resources and support they need to thrive in today's music industry.",
      studio: "State-of-the-Art Studios",
      studioDescription: "Our facilities are equipped with the latest technology and designed to inspire creativity.",
      learnMore: "Learn More About Us"
    },
    releases: {
      freshBeats: "Fresh Beats",
      latestReleases: "Latest Releases",
      description: "Explore our latest music releases from talented artists across various genres. From chart-toppers to emerging talents, discover your next favorite track.",
      viewAll: "View All Releases"
    },
    services: {
      title: "Our Services",
      subtitle: "Comprehensive support for your music journey",
      production: "Voice Recording",
      productionDesc: "Professional vocal recording with state-of-the-art equipment.",
      distribution: "Master and Mixing",
      distributionDesc: "Expert mastering and mixing to perfect your sound.",
      development: "Vocal Coach",
      developmentDesc: "Professional guidance to enhance your vocal technique and performance.",
      publishing: "Song Writing",
      publishingDesc: "Collaborative songwriting services to bring your musical ideas to life.",
      licensing: "Studio Sessions",
      licensingDesc: "Full studio sessions with professional equipment and experienced engineers.",
      getInTouch: "Get in Touch"
    },
    contact: {
      getInTouch: "Get In Touch",
      contactUs: "Contact Us",
      description: "Have questions about our services or interested in working with us? Fill out the form below, and we'll get back to you shortly.",
      name: "Your Name",
      namePlaceholder: "Enter your full name",
      email: "Your Email",
      emailPlaceholder: "Enter your email address",
      subject: "Subject",
      subjectPlaceholder: "What is this regarding?",
      message: "Message",
      messagePlaceholder: "Tell us about your project or inquiry...",
      sendMessage: "Send Message",
      followUs: "Follow Us",
      address: "Address",
      phone: "Phone",
      emailLabel: "Email"
    },
    photos: {
      title: "Photo Gallery",
      subtitle: "Captured Moments",
      description: "Browse through our collection of memorable moments from studio sessions, concerts, and special events.",
      viewAll: "View All Photos",
      showLess: "Show Less"
    },
    footer: {
      aboutText: "Boss of Melody is a premier music label dedicated to discovering and developing exceptional musical talent across genres.",
      quickLinks: "Quick Links",
      ourServices: "Our Services",
      contactInfo: "Contact Info",
      allRightsReserved: "All Rights Reserved."
    }
  },
  es: {
    header: {
      home: "Inicio",
      about: "Nosotros",
      releases: "Lanzamientos",
      services: "Servicios",
      photos: "Fotos",
      contact: "Contacto",
      getStarted: "Comenzar"
    },
    hero: {
      title: "Transformando Visión en Sonido",
      subtitle: "Ayudamos a los artistas a desarrollar su sonido único y dar vida a su visión musical.",
      subtitle2: "¿Listo para elevar tu carrera musical?",
      submitMusic: "Envía Tu Música",
      watchShowreel: "Conectar por WhatsApp",
      artistsSigned: "Artistas Firmados",
      monthlyStreams: "Reproducciones Mensuales",
      industryAwards: "Premios de la Industria",
      yearsExperience: "Años de Experiencia",
      trustedBy: "Respaldado por plataformas líderes",
      scrollDown: "Desplázate"
    },
    about: {
      aboutUs: "Sobre Nosotros",
      ourStory: "Nuestra ",
      story: "Historia",
      paragraph1: "Fundada en 2015, Boss of Melody comenzó como un pequeño sello independiente con pasión por descubrir talentos únicos. Lo que comenzó como un sueño en un estudio casero ahora se ha convertido en un sello musical influyente con alcance global.",
      paragraph2: "Nuestro sello se enfoca en fomentar entornos creativos donde los artistas puedan expresarse verdaderamente y desarrollar su sonido único. Creemos en el desarrollo artístico a largo plazo en lugar de perseguir tendencias a corto plazo.",
      paragraph3: "A lo largo de los años, hemos colaborado con más de 100 artistas en múltiples géneros, ayudándoles a navegar por la industria musical en constante evolución mientras se mantienen fieles a su visión artística.",
      quote: "La música no se trata solo de sonidos; se trata de crear experiencias que resuenen con el alma de las personas y dejen impresiones duraderas.",
      founder: "Moises Marsh, Fundador",
      vision: "Nuestra Visión",
      visionText: "Visualizamos una industria musical donde los artistas estén empoderados para crear auténticamente sin compromisos, llegando a audiencias que realmente aprecien su expresión única.",
      visionItem1: "Impulsando los límites de la innovación musical",
      visionItem2: "Creando oportunidades para voces diversas",
      visionItem3: "Construyendo carreras sostenibles para artistas",
      visionItem4: "Fomentando colaboraciones entre géneros y fronteras",
      mission: "Nuestra Misión",
      missionText: "Descubrir, desarrollar y promover artistas que desafíen las convenciones y empujen límites, proporcionándoles los recursos y el apoyo que necesitan para prosperar en la industria musical actual.",
      studio: "Estudios de Última Generación",
      studioDescription: "Nuestras instalaciones están equipadas con la última tecnología y diseñadas para inspirar creatividad.",
      learnMore: "Conoce Más Sobre Nosotros"
    },
    releases: {
      freshBeats: "Ritmos Frescos",
      latestReleases: "Últimos Lanzamientos",
      description: "Explora nuestros últimos lanzamientos musicales de talentosos artistas en diversos géneros. Desde éxitos de las listas hasta talentos emergentes, descubre tu próxima canción favorita.",
      viewAll: "Ver Todos los Lanzamientos"
    },
    services: {
      title: "Nuestros Servicios",
      subtitle: "Apoyo integral para tu trayectoria musical",
      production: "Producción",
      productionDesc: "Transforma tus ideas musicales en pistas producidas profesionalmente.",
      distribution: "Grabación de Voz",
      distributionDesc: "Perfecciona tu interpretación vocal con grabaciones profesionales.",
      development: "Master y Mezcla",
      developmentDesc: "Consigue un sonido pulido, equilibrado y listo para la radio.",
      publishing: "Coach Vocal",
      publishingDesc: "Desbloquea el potencial de tu voz con nuestras sesiones de coaching vocal.",
      licensing: "Composición",
      licensingDesc: "Canciones ya escritas, listas y preparadas para que el artista las interprete.",
      getInTouch: "Ponte en Contacto"
    },
    contact: {
      getInTouch: "Ponte en Contacto",
      contactUs: "Contáctanos",
      description: "¿Tienes preguntas sobre nuestros servicios o estás interesado en trabajar con nosotros? Completa el formulario a continuación, y nos pondremos en contacto contigo pronto.",
      name: "Tu Nombre",
      namePlaceholder: "Ingresa tu nombre completo",
      email: "Tu Correo",
      emailPlaceholder: "Ingresa tu dirección de correo",
      subject: "Asunto",
      subjectPlaceholder: "¿De qué se trata?",
      message: "Mensaje",
      messagePlaceholder: "Cuéntanos sobre tu proyecto o consulta...",
      sendMessage: "Enviar Mensaje",
      followUs: "Síguenos",
      address: "Dirección",
      phone: "Teléfono",
      emailLabel: "Correo"
    },
    photos: {
      title: "Galería de Fotos",
      subtitle: "Momentos Capturados",
      description: "Navega por nuestra colección de momentos memorables de sesiones de estudio, conciertos y eventos especiales.",
      viewAll: "Ver Todas las Fotos",
      showLess: "Mostrar Menos"
    },
    footer: {
      aboutText: "Boss of Melody es un sello musical premier dedicado a descubrir y desarrollar talento musical excepcional en diversos géneros.",
      quickLinks: "Enlaces Rápidos",
      ourServices: "Nuestros Servicios",
      contactInfo: "Información de Contacto",
      allRightsReserved: "Todos los Derechos Reservados."
    }
  }
};

// Type definitions
type LanguageType = 'en' | 'es';
type TranslationsType = typeof translations.en;

interface LanguageContextType {
  lang: LanguageType;
  toggleLang: () => void;
  translations: TranslationsType;
}

interface LanguageProviderProps {
  children: ReactNode;
}

// Create context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Provider component
export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [lang, setLang] = useState<LanguageType>('es');

  const toggleLang = () => {
    setLang(prevLang => prevLang === 'en' ? 'es' : 'en');
  };

  return (
    <LanguageContext.Provider value={{ 
      lang,
      toggleLang,
      translations: translations[lang]
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook
export const useLang = () => {
  const context = useContext(LanguageContext);
  
  if (context === undefined) {
    throw new Error('useLang must be used within a LanguageProvider');
  }
  
  return context;
};