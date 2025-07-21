import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLang } from "@/hooks/use-language";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  longDescription: string;
  price: string;
  delay: number;
  isInView: boolean;
}

function ServiceCard({ icon, title, description, longDescription, price, delay, isInView }: ServiceCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay }}
        className="relative group cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <Card className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-melody-fuchsia/30 transition-all duration-300 overflow-hidden">
          <CardContent className="p-6">
            {/* Background glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-melody-purple/0 via-melody-fuchsia/0 to-melody-purple/0 group-hover:from-melody-purple/10 group-hover:via-melody-fuchsia/10 group-hover:to-melody-purple/10 transition-all duration-500"></div>
            
            {/* Icon */}
            <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center mb-4 group-hover:bg-melody-fuchsia/20 transition-colors text-melody-fuchsia">
              {icon}
            </div>
            
            {/* Content */}
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-white/70">{description}</p>
            
            {/* Click for more info indicator */}
            <div className="flex items-center mt-4 text-melody-fuchsia text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 16v-4"></path>
                <path d="M12 8h.01"></path>
              </svg>
              Click for details
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="bg-melody-dark border border-melody-purple/20 text-white max-w-lg">
          <DialogHeader>
            <div className="flex items-center mb-2">
              <div className="w-10 h-10 rounded-lg bg-melody-fuchsia/20 flex items-center justify-center mr-3 text-melody-fuchsia">
                {icon}
              </div>
              <DialogTitle className="text-2xl font-bold">{title}</DialogTitle>
            </div>
            <DialogDescription className="text-white/70">
              {description}
            </DialogDescription>
          </DialogHeader>
          
          <div className="my-4">
            <h4 className="text-lg font-semibold mb-2 text-melody-fuchsia">Service Details</h4>
            <p className="text-white/80 whitespace-pre-line">{longDescription}</p>
            
            <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
              <div className="flex justify-between items-center">
                <span className="text-white/70">Starting from:</span>
                <span className="text-xl font-bold text-melody-fuchsia">{price}</span>
              </div>
            </div>
          </div>
          
          <DialogFooter className="flex justify-between items-center">
            <DialogClose asChild>
              <Button variant="outline" className="border-white/20">Close</Button>
            </DialogClose>
            <Button 
              onClick={() => window.open('https://wa.me/50663040420?text=I am interested in your ' + title + ' service', '_blank')}
              className="bg-gradient-to-r from-melody-purple to-melody-fuchsia hover:opacity-90"
            >
              Contact via WhatsApp
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });
  const { translations } = useLang();
  const t = translations.services;
  
  const servicesList = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
          <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
          <line x1="12" y1="19" x2="12" y2="23"></line>
          <line x1="8" y1="23" x2="16" y2="23"></line>
        </svg>
      ),
      title: "Production",
      description: "Transform your musical ideas into professionally produced tracks.",
      longDescription: "Our professional music production service transforms your ideas into polished tracks. We offer:\n\n• Full song production from concept to completion\n• Access to our state-of-the-art recording studios\n• Collaboration with experienced producers\n• Beat making and instrumental production\n• Advanced audio processing and sound design\n\nEach project includes multiple revision rounds to ensure your vision comes to life exactly as you imagine.",
      price: "$500 - $2,500"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
      ),
      title: "Voice Recording",
      description: "Perfect your vocal performance with professional vocal recordings.",
      longDescription: "Perfect your vocal performance with our professional voice recording services:\n\n• High-definition vocal recordings in acoustic-treated environment\n• Professional microphones and preamps for crystal clear sound\n• Experienced engineers specializing in vocal recording\n• Pitch correction and timing adjustments as needed\n• Multiple takes to capture your best performance\n\nOur voice recording sessions include up to 4 hours of studio time with a dedicated sound engineer.",
      price: "$150 - $350"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="4" y1="21" x2="4" y2="14"></line>
          <line x1="4" y1="10" x2="4" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12" y2="3"></line>
          <line x1="20" y1="21" x2="20" y2="16"></line>
          <line x1="20" y1="12" x2="20" y2="3"></line>
          <line x1="1" y1="14" x2="7" y2="14"></line>
          <line x1="9" y1="8" x2="15" y2="8"></line>
          <line x1="17" y1="16" x2="23" y2="16"></line>
        </svg>
      ),
      title: "Master and Mixing",
      description: "Get a polished, balanced, and radio-ready sound for your music.",
      longDescription: "Elevate your tracks with our professional mixing and mastering services:\n\n• Detailed balance adjustment of all track elements\n• Advanced EQ, compression, and spatial processing\n• Stereo enhancement and depth creation\n• Industry-standard loudness optimization\n• Format-specific masters (streaming, CD, vinyl)\n\nAll masters include revisions to ensure you're completely satisfied with the final product before release.",
      price: "$250 - $600"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="6" r="4"></circle>
          <path d="M17 14.5a9 9 0 0 0-10 0"></path>
          <path d="M17 18.5a13 13 0 0 0-10 0"></path>
        </svg>
      ),
      title: "Vocal Coach",
      description: "Unlock your voice potential with our vocal coaching sessions.",
      longDescription: "Develop your vocal skills and discover your unique voice with our vocal coaching services:\n\n• Personalized vocal technique assessment and development\n• Breathing and support exercises\n• Range expansion and strengthening\n• Style development and genre-specific techniques\n• Performance preparation and stage presence\n\nSessions are available as one-time coaching or as part of an ongoing development program tailored to your specific goals.",
      price: "$75 - $150/hour"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <path d="M14 2v6h6"></path>
          <path d="M16 13H8"></path>
          <path d="M16 17H8"></path>
          <path d="M10 9H8"></path>
        </svg>
      ),
      title: "Son Writting",
      description: "Craft powerful lyrics and melodies tailored to your vision.",
      longDescription: "Transform your ideas into complete, professional songs with our songwriting services:\n\n• Collaborative writing sessions with experienced songwriters\n• Development of lyrics, melody, chord progressions, and structure\n• Genre-specific composition techniques\n• Hook and chorus development\n• Complete song creation from concept to demo\n\nOur songwriting packages include multiple revision rounds and a demo production of the finished song.",
      price: "$400 - $1,500"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
          <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
        </svg>
      ),
      title: "Studio Sessions",
      description: "Book a creative studio space for your recordings and ideas.",
      longDescription: "Book our professional recording facilities for your creative projects:\n\n• Access to our fully-equipped recording studios\n• Professional recording engineer included\n• High-end instruments and equipment available\n• Comfortable creative environment\n• Raw files provided after session completion\n\nStudio sessions can be booked hourly, half-day, or full-day depending on your project needs.",
      price: "$75 - $600"
    }
  ];

  return (
    <section id="services" className="py-20 lg:py-32 bg-melody-black relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-melody-black via-melody-dark to-melody-black"></div>
        
        {/* Background glow */}
        <div className="absolute top-40 left-20 w-80 h-80 rounded-full bg-melody-purple/5 blur-[150px]"></div>
        <div className="absolute bottom-40 right-20 w-80 h-80 rounded-full bg-melody-fuchsia/5 blur-[150px]"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 right-[20%] w-20 h-20 border border-white/5 rounded-full"></div>
        <div className="absolute bottom-20 left-[30%] w-40 h-40 border border-white/5 rounded-full"></div>
      </div>
      
      <div ref={ref} className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-melody-fuchsia font-medium mb-2">What We Offer</span>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              {t.title}
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              {t.subtitle}
            </p>
          </motion.div>
        </div>
        
        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {servicesList.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              longDescription={service.longDescription}
              price={service.price}
              delay={0.2 + index * 0.1}
              isInView={isInView}
            />
          ))}
        </div>
        
        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="max-w-4xl mx-auto bg-gradient-to-r from-melody-purple/20 to-melody-fuchsia/20 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/10"
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-semibold mb-2">Ready to elevate your music career?</h3>
              <p className="text-white/70">Contact our team today to discuss how we can help you achieve your goals.</p>
            </div>
            
            <Button 
              onClick={() => window.open('https://wa.me/50663040420', '_blank')} 
              className="bg-gradient-to-r from-melody-purple to-melody-fuchsia hover:opacity-90 transition-all text-white px-8"
            >
              {t.getInTouch}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
