import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useLang } from "@/hooks/use-language";
import { useVideoLoader } from "@/hooks/use-video-loader";

export default function Hero() {
  const { translations } = useLang();
  const t = translations.hero;
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };
  
  // Stats data
  const stats = [
    { value: "5M+", label: t.monthlyStreams },
    { value: "10+", label: t.yearsExperience },
  ];
  
  // Partners logos (would be replaced with actual logos)
  const partners = [
    "Spotify",
    "Apple Music",
    "Amazon Music",
    "YouTube Music",
    "Deezer"
  ];
  
  // Use our custom video loader hook
  const { videoRef } = useVideoLoader({ 
    videoSrc: "/assets/videos/VID_20250720_100423_736.mp4" 
  });

  return (
    <section id="home" className="relative min-h-screen pt-20 flex items-center overflow-hidden bg-melody-black">
      {/* Background video */}
      <div className="absolute inset-0 z-0">
        {/* Background video */}
        <video 
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"

        >
          <source src="/assets/videos/VID_20250720_100423_736.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Overlay for video */}
        <div className="absolute inset-0 bg-gradient-to-b from-melody-black/80 via-melody-black/70 to-melody-dark/80"></div>
        
        {/* Animated gradient circles */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-melody-purple/10 blur-[100px] animate-pulse-soft"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-melody-fuchsia/10 blur-[100px] animate-pulse-soft" style={{ animationDelay: '2s' }}></div>
        
        {/* Decorative elements */}
        <div className="absolute top-1/3 left-1/2 w-16 h-16 border border-white/10 rounded-full"></div>
        <div className="absolute bottom-1/4 left-1/4 w-24 h-24 border border-white/10 rounded-full"></div>
        <div className="absolute top-1/4 right-1/4 w-32 h-32 border border-white/10 rounded-full"></div>
      </div>
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10 py-12 md:py-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto text-center mb-12"
        >
          {/* Headline */}
          <motion.h1 
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight"
          >
            <span className="gradient-text">{t.title}</span>
          </motion.h1>
          
          {/* Subtitle */}
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-white/80 mb-2"
          >
            {t.subtitle}
          </motion.p>
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-white/80 mb-8"
          >
            {t.subtitle2}
          </motion.p>
          
          {/* CTA Buttons */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button 
              onClick={() => window.open('https://wa.me/50663040420', '_blank')} 
              className="bg-gradient-to-r from-melody-purple to-melody-fuchsia hover:opacity-90 transition-all text-white px-6 py-6"
            >
              {t.watchShowreel}
            </Button>
          </motion.div>
        </motion.div>
        
        {/* Stats Counter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto mb-16"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-1 gradient-text">{stat.value}</div>
              <div className="text-white/70 text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>
        
        {/* Partners section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="text-center"
        >
          <p className="text-white/50 text-sm uppercase tracking-widest mb-6">{t.trustedBy}</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {partners.map((partner, index) => (
              <div key={index} className="text-white/40 hover:text-white/70 transition-colors">
                <span className="font-medium text-lg">{partner}</span>
              </div>
            ))}
          </div>
        </motion.div>
        
        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        >
          <span className="text-white/50 text-sm mb-2">{t.scrollDown}</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-5 h-9 border border-white/30 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1 h-2 bg-white/60 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}