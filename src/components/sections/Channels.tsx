import { motion } from "framer-motion";
import { useLang } from "@/hooks/use-language";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { useInView } from "framer-motion";

export default function Channels() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });
  const { translations } = useLang();
  const t = translations.about || {};

  // Channel data for Moises and Boss of Melody
  const channelData = [
    {
      name: "Boss of Melody",
      description: "El canal oficial de Boss of Melody, donde encontrarás todos nuestros videos musicales, sesiones en estudio y más contenido exclusivo.",
      youtubeUrl: "https://youtube.com/@bossofmelodycr",
      spotifyUrl: "https://open.spotify.com/artist/0wU7V7mwjwQlLiXJF5i7XW?si=fkcFgT9nRuKf0pcow8T84w",
      image: "/assets/logo.jpeg"
    },
    {
      name: "Moises",
      description: "Canal personal de Moises, fundador y productor principal de Boss of Melody. Contenido sobre producción musical, tutoriales y vida detrás de escenas.",
      youtubeUrl: "https://www.youtube.com/@moisescr8851",
      spotifyUrl: "https://open.spotify.com/artist/49SKRyZRB3bpTQNYrTROdj?si=YgCa8zAcTS6FtAErVotJxg",
      image: "/assets/hero-bg.png"
    }
  ];

  return (
    <section id="channels" className="py-20 lg:py-32 bg-melody-dark relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-melody-purple/10"></div>
        
        {/* Subtle pattern */}
        <div className="absolute inset-0 bg-[url('/assets/noise.png')] bg-repeat opacity-5"></div>
        
        {/* Animated gradient circles */}
        <div className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full bg-melody-purple/5 blur-[80px] animate-pulse-soft"></div>
        <div className="absolute top-10 right-10 w-80 h-80 rounded-full bg-melody-fuchsia/5 blur-[100px] animate-pulse-soft" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div ref={ref} className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-melody-fuchsia font-medium mb-2">Nuestros Canales</span>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Síguenos en YouTube y Spotify</h2>
            <p className="text-lg text-white/70">
              Descubre nuestra música y contenido exclusivo a través de nuestros canales oficiales en YouTube y Spotify.
            </p>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {channelData.map((channel, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-all"
            >
              <div className="p-6 flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full overflow-hidden mb-6 border-2 border-melody-fuchsia/50">
                  <img 
                    src={channel.image} 
                    alt={`${channel.name} profile`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-2">{channel.name}</h3>
                <p className="text-white/70 mb-6">
                  {channel.description}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:justify-center">
                  <Button 
                    className="bg-red-600 hover:bg-red-700 text-white"
                    onClick={() => window.open(channel.youtubeUrl, '_blank')}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="mr-2">
                      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                    </svg>
                    YouTube
                  </Button>
                  <Button 
                    className="bg-green-600 hover:bg-green-700 text-white"
                    onClick={() => window.open(channel.spotifyUrl, '_blank')}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="mr-2">
                      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.48.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                    </svg>
                    Spotify
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Call-to-action */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-white/80 text-lg mb-6">
            Suscríbete a nuestros canales para recibir notificaciones sobre nuevos lanzamientos y contenido exclusivo.
          </p>
        </motion.div>
      </div>
    </section>
  );
}