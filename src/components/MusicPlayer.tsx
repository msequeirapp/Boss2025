import { useState, useCallback, memo, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface YoutubeTrack {
  title: string;
  artist: string;
  youtubeId: string;
}

// Store YouTube video IDs for each track
const trackData: YoutubeTrack[] = [
  { 
    title: "Clic Clak", 
    artist: "Jawell Brown (By Boss of Melody)", 
    youtubeId: "YEwOSJF4JFM" // Example YouTube video ID
  },
  { 
    title: "DELAY - SENTIMIENT", 
    artist: "MOISES MARSH (By Boss Of Melody)", 
    youtubeId: "yWc1TIBqOR4" // Example YouTube video ID
  },
  { 
    title: "Pide Reggae Wine", 
    artist: "Harper - Tico Show Time Riddim", 
    youtubeId: "zAVPUzpFSxs" // Example YouTube video ID
  },
  { 
    title: "Obsesion", 
    artist: "Moises Marsh x Toledo x Xander x Tinz", 
    youtubeId: "Hd6Z17ZadAU" // Example YouTube video ID
  },
  { 
    title: "Para las Gyales", 
    artist: "Nega - Tico Show Time Riddim", 
    youtubeId: "9GgtsOiJAh4" // Example YouTube video ID
  },
  { 
    title: "Quiero mas", 
    artist: "Taty Bwoy (By Boss of melody)", 
    youtubeId: "3CgSSLQFtQk" // Example YouTube video ID
  }
];

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

// This loads the YouTube IFrame API asynchronously
const loadYouTubeAPI = () => {
  if (window.YT) return Promise.resolve();

  return new Promise<void>((resolve) => {
    // Create script tag
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    
    // Define callback when API is ready
    window.onYouTubeIframeAPIReady = () => {
      resolve();
    };

    // Add script tag to page
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
  });
};

// YouTube player component with controlled interface
const YouTubePlayer = ({ 
  videoId, 
  onEnd, 
  isPlaying,
  onPlayerReady
}: { 
  videoId: string, 
  onEnd: () => void, 
  isPlaying: boolean,
  onPlayerReady: (player: YT.Player) => void
}) => {
  const playerContainerId = 'youtube-player-container';

  // Initialize player when component mounts
  useEffect(() => {
    let player: YT.Player | null = null;

    const initPlayer = async () => {
      await loadYouTubeAPI();

      player = new window.YT.Player(playerContainerId, {
        height: '100%',
        width: '100%',
        videoId,
        playerVars: {
          autoplay: isPlaying ? 1 : 0,
          controls: 0,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
          fs: 0,
          iv_load_policy: 3
        },
        events: {
          onReady: () => {
            if (player) onPlayerReady(player);
          },
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.ENDED) {
              onEnd();
            }
          }
        }
      });
    };

    initPlayer();

    return () => {
      if (player) {
        player.destroy();
      }
    };
  }, [videoId, isPlaying, onEnd, onPlayerReady]);

  return (
    <div className="aspect-video w-full rounded-lg overflow-hidden">
      <div id={playerContainerId} className="w-full h-full" />
    </div>
  );
};

export default function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [showPlayer, setShowPlayer] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [player, setPlayer] = useState<YT.Player | null>(null);

  const currentTrack = trackData[currentTrackIndex];

  // Player control callbacks
  const togglePlayPause = useCallback(() => {
    if (player) {
      if (isPlaying) {
        player.pauseVideo();
      } else {
        player.playVideo();
      }
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying, player]);

  const previousTrack = useCallback(() => {
    setCurrentTrackIndex(prev => (prev === 0 ? trackData.length - 1 : prev - 1));
    setIsPlaying(true);
  }, []);

  const nextTrack = useCallback(() => {
    setCurrentTrackIndex(prev => (prev === trackData.length - 1 ? 0 : prev + 1));
    setIsPlaying(true);
  }, []);

  const togglePlayer = useCallback(() => {
    setShowPlayer(prev => !prev);
  }, []);

  const handlePlayerReady = useCallback((ytPlayer: YT.Player) => {
    setPlayer(ytPlayer);
    if (isPlaying) {
      ytPlayer.playVideo();
    }
  }, [isPlaying]);

  return (
    <>
      {/* Floating Toggle Button - Memoized */}
      <ToggleButton showPlayer={showPlayer} onClick={togglePlayer} />

      {/* Only render the player UI when it's visible */}
      {showPlayer && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-black/95 border-t border-white/10 p-4 shadow-xl max-h-[90vh] overflow-y-auto">
          {/* Close button */}
          <button 
            onClick={togglePlayer}
            className="absolute top-2 right-2 p-2 rounded-full bg-white/10 hover:bg-white/20 z-10"
            aria-label="Close player"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </button>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
              {/* Left: Video player */}
              <div className="col-span-1 lg:col-span-2 h-full">
                <div className="aspect-video w-full">
                  <YouTubePlayer 
                    videoId={currentTrack.youtubeId} 
                    onEnd={nextTrack}
                    isPlaying={isPlaying}
                    onPlayerReady={handlePlayerReady}
                  />
                </div>
              </div>

              {/* Right: Controls and info */}
              <div className="flex flex-col space-y-4 mt-2 lg:mt-0">
                <div>
                  <h3 className="font-bold text-lg text-white">{currentTrack.title}</h3>
                  <p className="text-white/70 text-sm">{currentTrack.artist}</p>
                </div>

                <div className="flex justify-center space-x-6">
                  <button 
                    onClick={previousTrack}
                    className="p-3 rounded-full hover:bg-white/10"
                    aria-label="Previous track"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m12 19-7-7 7-7"></path>
                      <path d="m19 19-7-7 7-7"></path>
                    </svg>
                  </button>
                  
                  <button 
                    onClick={togglePlayPause}
                    className="p-4 rounded-full bg-melody-fuchsia text-white hover:bg-melody-fuchsia/90"
                    aria-label={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="6" y="4" width="4" height="16"></rect>
                        <rect x="14" y="4" width="4" height="16"></rect>
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                      </svg>
                    )}
                  </button>
                  
                  <button 
                    onClick={nextTrack}
                    className="p-3 rounded-full hover:bg-white/10"
                    aria-label="Next track"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m5 19 7-7-7-7"></path>
                      <path d="m12 19 7-7-7-7"></path>
                    </svg>
                  </button>
                </div>

                <div className="text-sm text-white/60 mt-4">
                  <p className="text-center">Track {currentTrackIndex + 1} of {trackData.length}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Extend the Window interface to include YouTube API properties
declare global {
  interface Window {
    YT: typeof YT;
    onYouTubeIframeAPIReady: () => void;
  }
}