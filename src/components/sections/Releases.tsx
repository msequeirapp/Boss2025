import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLang } from "@/hooks/use-language";

// YouTube video IDs
const videos = [
  {
    id: "YFr3jqDky7w",
    title: "Boss of Melody Demo",
    artist: "Boss of Melody",
    featured: true
  },
  { 
    id: "gb-FyFOzcQw", 
    title: "BORRACHITA", 
    artist: "Boss of Melody" 
  },
  { 
    id: "JmMFXidL_6k", 
    title: "Mi Angel", 
    artist: "Boss of Melody" 
  },
  { 
    id: "3XOAZSER5YY", 
    title: "SUELTA EL DANCEHALL", 
    artist: "Boss of Melody" 
  },
  { 
    id: "i6GNxQzpQFc", 
    title: "Click Clack", 
    artist: "Boss of Melody" 
  },
  { 
    id: "sDLH2cgmLbw", 
    title: "SANTADIABLA", 
    artist: "Boss of Melody" 
  },
  { 
    id: "Tom-_Kfs1gk", 
    title: "Rumbear Tomar Y Bailar", 
    artist: "Boss of Melody" 
  }
];

export default function Releases() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });
  const { translations } = useLang();
  const t = translations.releases;
  
  return (
    <section id="releases" className="py-20 lg:py-32 bg-melody-dark relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-melody-purple/10"></div>
        
        {/* Subtle pattern */}
        <div className="absolute inset-0 bg-[url('/assets/noise.png')] bg-repeat opacity-5"></div>
      </div>
      
      <div ref={ref} className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-melody-fuchsia font-medium mb-2">{t.freshBeats}</span>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">{t.latestReleases}</h2>
            <p className="text-lg text-white/70">
              {t.description}
            </p>
          </motion.div>
        </div>
        
        <Tabs defaultValue="all" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-white/5 border border-white/10">
              <TabsTrigger value="all">All</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="all" className="space-y-12">
            {/* Featured Release */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
                <div className="lg:col-span-3">
                  <div className="youtube-container shadow-xl shadow-black/30 rounded-lg overflow-hidden">
                    <iframe 
                      src={`https://www.youtube.com/embed/${videos[0].id}?si=bS0N7HNSw2W--R0f`} 
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin" 
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
                
                <div className="lg:col-span-2">
                  <div className="p-4">
                    <span className="inline-block py-1 px-3 rounded-full bg-white/10 text-xs font-medium mb-3">FEATURED RELEASE</span>
                    <div className="flex flex-col sm:flex-row gap-4 mt-2">
                      <Button 
                        className="bg-white hover:bg-white/90 text-black"
                        onClick={() => window.open(`https://www.youtube.com/watch?v=${videos[0].id}`, '_blank')}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                          <circle cx="12" cy="12" r="10"></circle>
                          <path d="m10 8 6 4-6 4V8Z"></path>
                        </svg>
                        Watch Video
                      </Button>
                      <Button 
                        variant="outline" 
                        className="border-white/20 hover:border-white hover:bg-white/10"
                        onClick={() => window.open('https://open.spotify.com/artist/0wU7V7mwjwQlLiXJF5i7XW?si=fkcFgT9nRuKf0pcow8T84w', '_blank')}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                          <path d="M9 18V5l12-2v13"></path>
                          <circle cx="6" cy="18" r="3"></circle>
                          <circle cx="18" cy="16" r="3"></circle>
                        </svg>
                        Stream Music
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* More Releases Grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {videos.slice(1).map((video, index) => (
                  <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-colors">
                    <div className="youtube-container">
                      <iframe 
                        src={`https://www.youtube.com/embed/${video.id}?si=bS0N7HNSw2W--R0f`} 
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin" 
                        allowFullScreen
                      ></iframe>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-1">{video.title}</h3>
                      <p className="text-white/70 text-sm">{video.artist}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            {/* Removed View All Button as requested */}
          </TabsContent>
          
          {/* Only keeping the "all" tab content which is already defined above */}
        </Tabs>
      </div>
    </section>
  );
}