import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLang } from "@/hooks/use-language";

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });
  const { translations } = useLang();
  const t = translations.about;
  
  return (
    <section id="about" className="py-20 lg:py-32 bg-melody-dark relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        {/* Gradient backdrop */}
        <div className="absolute inset-0 bg-gradient-to-br from-melody-dark via-melody-black to-melody-dark"></div>
        
        {/* Circles */}
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-melody-purple opacity-5 blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-melody-fuchsia opacity-5 blur-3xl"></div>
      </div>
      
      <div ref={ref} className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-melody-fuchsia font-medium mb-2">{t.aboutUs}</span>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              {t.ourStory} <span className="gradient-text">{t.story}</span>
            </h2>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Left side - About Content */}
          <div className="lg:col-span-7">
            <Tabs defaultValue="story" className="w-full">
              <TabsList className="bg-white/5 border border-white/10 mb-8">
                <TabsTrigger value="story">{t.story}</TabsTrigger>
                <TabsTrigger value="vision">{t.vision}</TabsTrigger>
                <TabsTrigger value="mission">{t.mission}</TabsTrigger>
              </TabsList>
              
              <TabsContent value="story" className="space-y-6">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-white/80"
                >
                  {t.paragraph1}
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="text-white/80"
                >
                  {t.paragraph2}
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="text-white/80"
                >
                  {t.paragraph3}
                </motion.p>
              </TabsContent>
              
              <TabsContent value="vision" className="space-y-6">
                <h3 className="text-2xl font-bold">{t.vision}</h3>
                <p className="text-white/80">{t.visionText}</p>
                <ul className="list-disc list-inside text-white/80 space-y-2">
                  <li>{t.visionItem1}</li>
                  <li>{t.visionItem2}</li>
                  <li>{t.visionItem3}</li>
                  <li>{t.visionItem4}</li>
                </ul>
              </TabsContent>
              
              <TabsContent value="mission" className="space-y-6">
                <h3 className="text-2xl font-bold">{t.mission}</h3>
                <p className="text-white/80">{t.missionText}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                    <h4 className="text-lg font-semibold mb-2">{t.artistFirst}</h4>
                    <p className="text-white/70">{t.artistFirstDesc}</p>
                  </div>
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                    <h4 className="text-lg font-semibold mb-2">{t.industryInnovation}</h4>
                    <p className="text-white/70">{t.industryInnovationDesc}</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            
            {/* Quote block */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="mt-10 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 md:p-8"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" className="mb-4 text-melody-fuchsia">
                <path d="M10 11H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M14 8V5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M17 13v3a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M10 17v2a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
              <blockquote className="text-xl italic mb-4">{t.quote}</blockquote>
              <cite className="text-white/60 not-italic">{t.founder}</cite>
            </motion.div>
            
            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="mt-8"
            >
              <Button className="bg-white/10 hover:bg-white/15 transition-colors flex items-center">
                {t.learnMore}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </Button>
            </motion.div>
          </div>
          
          {/* Right side - Image and highlights */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative"
            >
              {/* Main image */}
              <div className="rounded-2xl overflow-hidden border border-white/10 shadow-xl shadow-black/30">
                <img 
                  src="/assets/hero-bg.png" 
                  alt="Founder" 
                  className="w-full h-full object-cover" 
                />
              </div>
              
              {/* Decorative element - right side only */}
              <div className="absolute -top-4 -right-4 w-32 h-32 rounded-lg border border-melody-purple/30 bg-melody-black/30 backdrop-blur-md z-0"></div>
              
              {/* Studio highlight box */}
              <div className="mt-12 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-2">{t.studio}</h3>
                <p className="text-white/70 mb-4">{t.studioDescription}</p>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-melody-fuchsia mr-2">
                      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                      <path d="m9 12 2 2 4-4"></path>
                    </svg>
                    <span>Professional recording equipment</span>
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-melody-fuchsia mr-2">
                      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                      <path d="m9 12 2 2 4-4"></path>
                    </svg>
                    <span>Acoustically-treated recording booths</span>
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-melody-fuchsia mr-2">
                      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                      <path d="m9 12 2 2 4-4"></path>
                    </svg>
                    <span>Expert sound engineers</span>
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-melody-fuchsia mr-2">
                      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                      <path d="m9 12 2 2 4-4"></path>
                    </svg>
                    <span>Relaxing creative environment</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}