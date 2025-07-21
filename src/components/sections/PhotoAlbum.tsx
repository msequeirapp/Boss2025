import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useLang } from "@/hooks/use-language";

// Sample photo gallery data
const photos = [
  {
    src: "https://images.unsplash.com/photo-1501612780327-45045538702b?q=80&w=2070",
    alt: "Concert performance",
    caption: "Live at Summer Festival 2023"
  },
  {
    src: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=2070",
    alt: "Studio session",
    caption: "Recording session with top producers"
  },
  {
    src: "https://images.unsplash.com/photo-1619961602105-16fa2a5465c2?q=80&w=2070",
    alt: "Music video shoot",
    caption: "Behind the scenes - 'Midnight' music video"
  },
  {
    src: "https://images.unsplash.com/photo-1570498839593-e565b39455fc?q=80&w=2070",
    alt: "Album release party",
    caption: "Album launch celebration"
  },
  {
    src: "https://images.unsplash.com/photo-1499415479124-43c32433a620?q=80&w=2064",
    alt: "Concert audience",
    caption: "Fan engagement moment"
  },
  {
    src: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=2070",
    alt: "Music awards",
    caption: "Industry Award Ceremony"
  }
];

export default function PhotoAlbum() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });
  const { translations } = useLang();
  const t = translations.photos;
  
  return (
    <section id="photos" className="py-20 lg:py-32 bg-melody-black relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-melody-black to-melody-dark/70"></div>
        <div className="absolute inset-0 bg-[url('/assets/noise.png')] bg-repeat opacity-5"></div>
        
        {/* Decorative circles */}
        <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-melody-purple/10 blur-[100px]"></div>
        <div className="absolute bottom-1/2 left-1/4 w-96 h-96 rounded-full bg-melody-fuchsia/10 blur-[120px]"></div>
      </div>
      
      <div ref={ref} className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-melody-fuchsia font-medium mb-2">{t.subtitle}</span>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">{t.title}</h2>
            <p className="text-lg text-white/70">
              {t.description}
            </p>
          </motion.div>
        </div>
        
        {/* Photo Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {photos.map((photo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="group relative overflow-hidden rounded-xl aspect-square bg-black/40 shadow-xl shadow-black/30"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-white font-medium">{photo.caption}</p>
              </div>
              
              {/* Zoom icon */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                  <path d="M11 8v6"></path>
                  <path d="M8 11h6"></path>
                </svg>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* View all button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <Button variant="outline" className="border-white/20 hover:border-white hover:bg-white/10">
            {t.viewAll}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}