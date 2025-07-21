import { useEffect, useRef } from 'react';
import { useMobile } from './use-mobile';

interface UseVideoLoaderProps {
  videoSrc: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  playsInline?: boolean;
}

/**
 * Custom hook for optimized video loading across devices
 */
export function useVideoLoader({
  videoSrc,
  autoPlay = true,
  muted = true,
  loop = true,
  playsInline = true
}: UseVideoLoaderProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { isMobile, isMobileIOS } = useMobile();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Force video loading for iOS and Android
    const loadVideo = () => {
      if (video.paused) {
        video.load();
        const playPromise = video.play();
        
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            // Auto-play was prevented
            // Show a UI element to let the user manually start playback
            console.log("Autoplay prevented:", error);
            
            // For iOS, add a touch event to start the video
            if (isMobileIOS) {
              document.body.addEventListener('touchstart', () => {
                video.play().catch(e => console.log("Play attempt failed:", e));
              }, { once: true });
            }
          });
        }
      }
    };
    
    // Load video immediately
    loadVideo();

    // Set up event listeners for immediate playback
    video.addEventListener('loadeddata', loadVideo);
    video.addEventListener('canplay', loadVideo);
    
    // iOS Safari specific events
    if (isMobileIOS) {
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
          loadVideo();
        }
      });
    }

    // Clean up
    return () => {
      video.removeEventListener('loadeddata', loadVideo);
      video.removeEventListener('canplay', loadVideo);
      if (isMobileIOS) {
        document.removeEventListener('visibilitychange', loadVideo);
      }
    };
  }, [isMobile, isMobileIOS, videoSrc]);

  return { videoRef };
}