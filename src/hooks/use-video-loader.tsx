import { useCallback, useEffect, useRef } from 'react';
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
  const { isMobileIOS } = useMobile();

  const handleUserInteraction = useCallback(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    video.play().catch(() => {
      // Ignore subsequent autoplay rejections; the user interaction requirement has been satisfied.
    });
  }, []);

  const loadVideo = useCallback(() => {
    const video = videoRef.current;
    if (!video || !video.paused) {
      return;
    }

    video.load();
    const playPromise = video.play();

    if (playPromise === undefined) {
      return;
    }

    playPromise.catch(error => {
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Autoplay prevented:', error);
      }

      if (isMobileIOS) {
        document.body.addEventListener('touchstart', handleUserInteraction, { once: true });
      }
    });
  }, [handleUserInteraction, isMobileIOS]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        loadVideo();
      }
    };
    
    // Load video immediately
    loadVideo();

    // Set up event listeners for immediate playback
    video.addEventListener('loadeddata', loadVideo);
    video.addEventListener('canplay', loadVideo);
    
    // iOS Safari specific events
    if (isMobileIOS) {
      document.addEventListener('visibilitychange', handleVisibilityChange);
    }

    // Clean up
    return () => {
      video.removeEventListener('loadeddata', loadVideo);
      video.removeEventListener('canplay', loadVideo);
      if (isMobileIOS) {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      }
    };
  }, [isMobileIOS, loadVideo, videoSrc]);

  return { videoRef };
}
