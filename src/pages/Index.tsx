import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Releases from "@/components/sections/Releases";
import Services from "@/components/sections/Services";
import Photos from "@/components/sections/Photos";
import Contact from "@/components/sections/Contact";
import Channels from "@/components/sections/Channels";
import { useLang } from "@/hooks/use-language";

export default function Index() {
  const { lang } = useLang();
  
  return (
    <main className="bg-melody-black text-white">
      <Hero />
      <About />
      <Releases />
      <Services />
      <Channels />
      <Photos />
      <Contact />
    </main>
  );
}