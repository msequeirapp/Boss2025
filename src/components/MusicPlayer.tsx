import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

interface Track {
  title: string;
  artist: string;
  src: string;
}

const tracks: Track[] = [
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

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [showPlayer, setShowPlayer] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animationRef = useRef<number | null>(null);

  const currentTrack = tracks[currentTrackIndex];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const setAudioData = () => {
      setDuration(audio.duration);
    };

    const updateProgress = () => {
      setProgress(audio.currentTime);
    };

    audio.addEventListener('loadeddata', setAudioData);
    audio.addEventListener('timeupdate', updateProgress);
    
    return () => {
      audio.removeEventListener('loadeddata', setAudioData);
      audio.removeEventListener('timeupdate', updateProgress);
    };
  }, [currentTrackIndex]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
      animationRef.current = requestAnimationFrame(updateProgressContinuously);
    } else {
      audioRef.current?.pause();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const updateProgressContinuously = () => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime);
      animationRef.current = requestAnimationFrame(updateProgressContinuously);
    }
  };

  const togglePlayPause = () => {
    setIsPlaying(prev => !prev);
  };

  const previousTrack = () => {
    setCurrentTrackIndex(prev => (prev === 0 ? tracks.length - 1 : prev - 1));
    setIsPlaying(true);
  };

  const nextTrack = () => {
    setCurrentTrackIndex(prev => (prev === tracks.length - 1 ? 0 : prev + 1));
    setIsPlaying(true);
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const newTime = parseFloat(e.target.value);
      audioRef.current.currentTime = newTime;
      setProgress(newTime);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };

  const togglePlayer = () => {
    setShowPlayer(prev => !prev);
  };

  return (
    <>
      <audio 
        ref={audioRef} 
        src={currentTrack.src}
        onEnded={nextTrack}
      />
      
      {/* Floating Toggle Button */}
      <Button
        onClick={togglePlayer}
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
              <span>{formatTime(progress)}</span>
              <input 
                type="range" 
                min="0" 
                max={duration || 0} 
                value={progress} 
                onChange={handleProgressChange}
                className="flex-1 h-1 bg-white/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-melody-fuchsia"
              />
              <span>{formatTime(duration)}</span>
            </div>

            <div className="flex items-center justify-center gap-4">
              <button 
                onClick={previousTrack}
                className="p-2 rounded-full hover:bg-white/10"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m12 19-7-7 7-7"></path>
                  <path d="m19 19-7-7 7-7"></path>
                </svg>
              </button>
              
              <button 
                onClick={togglePlayPause}
                className="p-3 rounded-full bg-white text-black hover:bg-white/90"
              >
                {isPlaying ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="6" y="4" width="4" height="16"></rect>
                    <rect x="14" y="4" width="4" height="16"></rect>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                )}
              </button>
              
              <button 
                onClick={nextTrack}
                className="p-2 rounded-full hover:bg-white/10"
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
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}