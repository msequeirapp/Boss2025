import { useState, useEffect, useRef, useCallback, memo, useMemo } from "react";
import { Button } from "@/components/ui/button";

interface Track {
  title: string;
  artist: string;
  src: string;
}

// Store track metadata in a separate constant - doesn't change
const trackData: Track[] = [
  { 
    title: "Clic Clak", 
    artist: "Jawell Brown (By Boss of Melody)", 
    src: "/assets/music/Clic Clak - Jawell Brown (By Boss of Melody).mp3" 
  },
  { 
    title: "DELAY - SENTIMIENT", 
    artist: "MOISES MARSH (By Boss Of Melody)", 
    src: "/assets/music/DELAY - SENTIMIENT FT MOISES MARSH  (By Boss Of Melody).wav" 
  },
  { 
    title: "Pide Reggae Wine", 
    artist: "Harper - Tico Show Time Riddim", 
    src: "/assets/music/Harper - Pide Reggae wine - Tico Show Time Riddim1.wav" 
  },
  { 
    title: "Obsesion", 
    artist: "Moises Marsh x Toledo x Xander x Tinz", 
    src: "/assets/music/Obsesion-Moises Marsh x Toledo x Xander x Tinz.wav" 
  },
  { 
    title: "Para las Gyales", 
    artist: "Nega - Tico Show Time Riddim", 
    src: "/assets/music/Para las Gyales - Nega - Tico Show time Riddim.wav" 
  },
  { 
    title: "Quiero mas", 
    artist: "Taty Bwoy (By Boss of melody)", 
    src: "/assets/music/Quiero mas - Taty Bwoy (By Boss of melody).wav" 
  }
];

// Preload audio utility
const preloadAudio = (src: string) => {
  const audio = new Audio();
  audio.preload = "metadata"; // Only load metadata first, not entire file
  audio.src = src;
};

// Memoized toggle button component for better performance
const ToggleButton = memo(({ showPlayer, onClick }: { showPlayer: boolean, onClick: () => void }) => (
  <Button
    onClick={onClick}
    className="fixed bottom-6 right-6 z-50 rounded-full w-12 h-12 p-0 shadow-lg bg-melody-fuchsia hover:bg-melody-fuchsia/90"
  >
    {showPlayer ? (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 6 6 18"></path>
        <path d="m6 6 12 12"></path>
      </svg>
    ) : (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="18" r="4"></circle>
        <path d="M16 18V9a4 4 0 0 0-8 0v9"></path>
        <line x1="10" y1="10" x2="14" y2="10"></line>
      </svg>
    )}
  </Button>
));
ToggleButton.displayName = "ToggleButton";

// Format time function (memoized)
const formatTime = (time: number) => {
  if (isNaN(time)) return "0:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
};

export default function MusicPlayer() {
  // State
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [showPlayer, setShowPlayer] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Refs
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const lastUpdateTimeRef = useRef<number>(0);

  // Memoize current track to prevent unnecessary re-renders
  const currentTrack = useMemo(() => trackData[currentTrackIndex], [currentTrackIndex]);

  // Preload next track when current track changes
  useEffect(() => {
    // Preload the next track
    const nextIndex = currentTrackIndex === trackData.length - 1 ? 0 : currentTrackIndex + 1;
    preloadAudio(trackData[nextIndex].src);
    
    setIsLoaded(false);
    // Reset duration when track changes
    setDuration(0);
  }, [currentTrackIndex]);

  // Set up audio event listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const setAudioData = () => {
      setDuration(audio.duration);
      setIsLoaded(true);
    };

    // Throttle updates to reduce unnecessary renders
    const updateProgress = () => {
      setProgress(audio.currentTime);
    };

    audio.addEventListener('loadedmetadata', setAudioData);
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('canplaythrough', () => setIsLoaded(true));
    
    return () => {
      audio.removeEventListener('loadedmetadata', setAudioData);
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('canplaythrough', () => setIsLoaded(true));
      
      // Clean up animation frame
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [currentTrackIndex]);

  // Handle play/pause
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      // Only attempt to play if the audio is loaded
      if (isLoaded) {
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.error("Playback error:", error);
            setIsPlaying(false);
          });
        }
        
        // Use throttled animation frame to update progress
        if (!animationRef.current) {
          animationRef.current = requestAnimationFrame(updateProgressThrottled);
        }
      }
    } else {
      audio.pause();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    }
  }, [isPlaying, isLoaded]);

  // Update volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Throttled progress update function to reduce CPU usage
  const updateProgressThrottled = useCallback(() => {
    const now = performance.now();
    const audio = audioRef.current;
    
    if (audio && (now - lastUpdateTimeRef.current > 250)) { // Update at most every 250ms
      setProgress(audio.currentTime);
      lastUpdateTimeRef.current = now;
    }
    
    animationRef.current = requestAnimationFrame(updateProgressThrottled);
  }, []);

  // Player control callbacks (memoized to prevent unnecessary re-renders)
  const togglePlayPause = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  const previousTrack = useCallback(() => {
    setCurrentTrackIndex(prev => (prev === 0 ? trackData.length - 1 : prev - 1));
    setIsPlaying(true);
  }, []);

  const nextTrack = useCallback(() => {
    setCurrentTrackIndex(prev => (prev === trackData.length - 1 ? 0 : prev + 1));
    setIsPlaying(true);
  }, []);

  const handleProgressChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const newTime = parseFloat(e.target.value);
      audioRef.current.currentTime = newTime;
      setProgress(newTime);
    }
  }, []);

  const handleVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  }, []);

  const togglePlayer = useCallback(() => {
    setShowPlayer(prev => !prev);
  }, []);

  // Memoized formatted times to prevent unnecessary calculations
  const formattedProgress = useMemo(() => formatTime(progress), [progress]);
  const formattedDuration = useMemo(() => formatTime(duration), [duration]);

  return (
    <>
      {/* Audio element with lazy loading */}
      <audio 
        ref={audioRef} 
        src={currentTrack.src}
        onEnded={nextTrack}
        preload="metadata"
      />
      
      {/* Floating Toggle Button - Memoized */}
      <ToggleButton showPlayer={showPlayer} onClick={togglePlayer} />

      {/* Only render the player UI when it's visible */}
      {showPlayer && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 min-w-[320px] md:min-w-[400px] bg-black/80 backdrop-blur-lg border border-white/10 rounded-xl p-4 shadow-xl">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded bg-melody-fuchsia/30 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-melody-fuchsia">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="m10 8 6 4-6 4V8Z"></path>
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-sm truncate">{currentTrack.title}</h3>
              <p className="text-white/60 text-xs truncate">{currentTrack.artist}</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs">
              <span>{formattedProgress}</span>
              <input 
                type="range" 
                min="0" 
                max={duration || 0} 
                value={progress} 
                onChange={handleProgressChange}
                className="flex-1 h-1 bg-white/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-melody-fuchsia"
              />
              <span>{formattedDuration}</span>
            </div>

            <div className="flex items-center justify-center gap-4">
              <button 
                onClick={previousTrack}
                className="p-2 rounded-full hover:bg-white/10"
                aria-label="Previous track"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m12 19-7-7 7-7"></path>
                  <path d="m19 19-7-7 7-7"></path>
                </svg>
              </button>
              
              <button 
                onClick={togglePlayPause}
                className="p-3 rounded-full bg-white text-black hover:bg-white/90"
                aria-label={isPlaying ? "Pause" : "Play"}
                disabled={!isLoaded}
              >
                {isLoaded ? (
                  isPlaying ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="6" y="4" width="4" height="16"></rect>
                      <rect x="14" y="4" width="4" height="16"></rect>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                  )
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                    <path d="M12 6v6l4 2"></path>
                  </svg>
                )}
              </button>
              
              <button 
                onClick={nextTrack}
                className="p-2 rounded-full hover:bg-white/10"
                aria-label="Next track"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m5 19 7-7-7-7"></path>
                  <path d="m12 19 7-7-7-7"></path>
                </svg>
              </button>
            </div>
            
            <div className="flex items-center gap-2 mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                {volume > 0.5 ? (
                  <>
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                  </>
                ) : volume > 0 ? (
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                ) : (
                  <line x1="23" y1="9" x2="17" y2="15"></line>
                )}
              </svg>
              <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.01" 
                value={volume} 
                onChange={handleVolumeChange}
                className="w-24 h-1 bg-white/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-2 [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                aria-label="Volume"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}