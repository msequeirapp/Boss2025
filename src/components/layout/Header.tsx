import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useLang } from "@/hooks/use-language";
import { useMobile } from "@/hooks/use-mobile";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { lang, toggleLang, translations } = useLang();
  const isMobile = useMobile();
  const t = translations.header;
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: t.home, href: "#home" },
    { name: t.about, href: "#about" },
    { name: t.releases, href: "#releases" },
    { name: t.services, href: "#services" },
    { name: t.photos, href: "#photos" },
    { name: t.contact, href: "#contact" },
  ];

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-melody-black/90 backdrop-blur-md py-3 shadow-lg shadow-black/20"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <a href="#" className="flex items-center">
          <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
            <img 
              src="/assets/logo.jpeg" 
              alt="Boss of Melody Logo" 
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-bold text-xl md:text-2xl tracking-tight">
            Boss of Melody
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-white/80 hover:text-white transition-colors relative px-1 py-2 group"
            >
              {item.name}
              <span className="absolute left-0 right-0 bottom-0 h-px bg-gradient-to-r from-melody-purple to-melody-fuchsia transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            </a>
          ))}

          {/* Language Toggle */}
          <button
            onClick={toggleLang}
            className="text-white/80 hover:text-white transition-colors px-1 py-2"
          >
            {lang === "en" ? "ES" : "EN"}
          </button>

          {/* CTA Button */}
          <Button 
            onClick={() => window.open('https://wa.me/50663040420', '_blank')}
            className="bg-gradient-to-r from-melody-purple to-melody-fuchsia hover:opacity-90 transition-all"
          >
            {t.getStarted}
          </Button>
        </nav>

        {/* Mobile Menu */}
        <div className="lg:hidden flex items-center">
          {/* Language Toggle Mobile */}
          <button
            onClick={toggleLang}
            className="text-white/80 hover:text-white transition-colors px-3 py-2 mr-2"
          >
            {lang === "en" ? "ES" : "EN"}
          </button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" className="p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="4" x2="20" y1="12" y2="12"></line>
                  <line x1="4" x2="20" y1="6" y2="6"></line>
                  <line x1="4" x2="20" y1="18" y2="18"></line>
                </svg>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-melody-dark border-melody-purple/20 w-[300px]"
            >
              <div className="flex flex-col h-full">
                <div className="py-8">
                  <div className="flex items-center mb-8">
                    <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                      <img
                        src="/assets/logo.jpeg"
                        alt="Boss of Melody Logo"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="font-bold text-lg tracking-tight">
                      Boss of Melody
                    </span>
                  </div>

                  <nav className="flex flex-col space-y-4">
                    {navItems.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="text-white/80 hover:text-white transition-colors py-2 border-b border-white/10"
                      >
                        {item.name}
                      </a>
                    ))}
                  </nav>
                </div>

                <div className="mt-auto">
                  <Button 
                    onClick={() => window.open('https://wa.me/50663040420', '_blank')}
                    className="w-full bg-gradient-to-r from-melody-purple to-melody-fuchsia hover:opacity-90 transition-all"
                  >
                    {t.getStarted}
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}