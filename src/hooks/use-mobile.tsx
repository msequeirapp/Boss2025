import { useState, useEffect } from 'react';

export function useMobile() {
  const [isMobile, setIsMobile] = useState(false);
  const [userAgent, setUserAgent] = useState<string>("");

  useEffect(() => {
    // Initial check
    const checkIfMobile = () => {
      const width = window.innerWidth < 1024; // Below lg breakpoint in Tailwind
      const agent = navigator.userAgent;
      const mobileCheck = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(agent);
      
      setIsMobile(width || mobileCheck);
      setUserAgent(agent);
    };
    
    // Check on mount
    checkIfMobile();
    
    // Add window resize listener
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const isMobileIOS = userAgent.includes("iPhone") || userAgent.includes("iPad");
  const isMobileAndroid = userAgent.includes("Android");

  return {
    isMobile,
    isMobileIOS,
    isMobileAndroid,
    userAgent
  };
}