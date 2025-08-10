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
    title: "Click Clack", 
    artist: "Jawell Brown (By Boss of Melody)", 
    youtubeId: "i6GNxQzpQFc"
  },
  { 
    title: "Delay", 
    artist: "Moises Marsh (By Boss Of Melody)", 
    youtubeId: "HCFh8DYPZgU"
  },
  { 
    title: "Pide Reggae Wine", 
    artist: "Harper - Tico Show Time Riddim", 
    youtubeId: "LxkNi3fOuCM"
  },
  { 
    title: "Obsesion", 
    artist: "Moises Marsh x Toledo x Xander x Tinz", 
    youtubeId: "CqshmSYTZyA"
  },
  { 
    title: "Para las Gyales", 
    artist: "Nega - Tico Show Time Riddim", 
    youtubeId: "3XOAZSER5YY"
  },
  { 
    title: "Quiere Mas", 
    artist: "Taty Bwoy (By Boss of melody)", 
    youtubeId: "ZU7PkkZV5qc"
  }
];

// Memoized floating toggle button
const ToggleButton = memo(({ showPlayer, onClick }: { showPlayer: boolean, onClick: () => void }) => (
  <Button
    onClick={onClick}
    className="fixed bottom-6 right-6 z-50 rounded-full w-12 h-12 p-0 shadow-lg bg-melody-fuchsia hover:bg-melody-fuchsia/90"
    aria-label={showPlayer ? "Close player" : "Open player"}
  >
    {showPlayer ? (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 6 6 18"></path>
        <path d="m6 6 12 12"></path>
      </svg>
    ) : (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="18" r="4"></circle>
        <path d="M16 18V9a4 4 0 0 0-8 0v9"></path>
        <line x1="10" y1="10" x2="14" y2="10"></line>
      </svg>
    )}
  </Button>
));
ToggleButton.displayName = "ToggleButton";

// Load YouTube IFrame API
const loadYouTubeAPI = () => {
  if (window.YT) return Promise.resolve();
  return new Promise<void>((resolve) => {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    window.onYouTubeIframeAPIReady = () => resolve();
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
  });
};

// YouTube player component
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

  useEffect(() => {
    let player: YT.Player | null = null;

    const setBestQuality = () => {
      try {
        // Try highest; YT falls back if not available
        player?.setPlaybackQuality("highres");
        player?.setPlaybackQuality("hd1080");
      } catch {}
    };

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
          iv_load_policy: 3,
          playsinline: 1,
          start: 0
        },
        events: {
          onReady: () => {
            if (!player) return;
            onPlayerReady(player);
            player.seekTo(0, true);   // ensure start at 0
            setBestQuality();
            if (isPlaying) player.playVideo();
          },
          onStateChange: (event) => {
            // Improve quality as soon as playback/buffering starts
            if (event.data === window.YT.PlayerState.BUFFERING ||
                event.data === window.YT.PlayerState.PLAYING) {
              setBestQuality();
            }
            if (event.data === window.YT.PlayerState.ENDED) {
              onEnd();
            }
          }
        }
      });
    };

    initPlayer();

    return () => {
      player?.destroy();
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

  // Controls
  const togglePlayPause = useCallback(() => {
    if (!player) return;
    if (isPlaying) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
    setIsPlaying(!isPlaying);
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
    if (isPlaying) ytPlayer.playVideo();
  }, [isPlaying]);

  return (
    <>
      {/* Floating toggle */}
      <ToggleButton showPlayer={showPlayer} onClick={togglePlayer} />

      {/* Player UI */}
      {showPlayer && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-black/95 border-t border-white/10 p-4 shadow-xl max-h-[90vh] overflow-y-auto">
          {/* Close */}
          <button 
            onClick={togglePlayer}
            className="absolute top-2 right-2 p-2 rounded-full bg-white/10 hover:bg-white/20 z-10"
            aria-label="Close player"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </button>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
              {/* Video */}
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

              {/* Info + Controls */}
              <div className="flex flex-col space-y-4 mt-2 lg:mt-0">
                <div>
                  <h3 className="font-bold text-lg text-white">{currentTrack.title}</h3>
                  <p className="text-white/70 text-sm">{currentTrack.artist}</p>
                </div>

                {/* Controls - FIXED styling */}
                <div className="flex justify-center items-center space-x-6 mt-4">
                  {/* Previous */}
                  <button
                    onClick={previousTrack}
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                    aria-label="Previous track"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m12 19-7-7 7-7"></path>
                      <path d="m19 19-7-7 7-7"></path>
                    </svg>
                  </button>

                  {/* Play / Pause */}
                  <button
                    onClick={togglePlayPause}
                    className="flex items-center justify-center w-14 h-14 rounded-full bg-melody-fuchsia text-white hover:bg-melody-fuchsia/90 transition-colors"
                    aria-label={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="6" y="4" width="4" height="16"></rect>
                        <rect x="14" y="4" width="4" height="16"></rect>
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                      </svg>
                    )}
                  </button>

                  {/* Next */}
                  <button
                    onClick={nextTrack}
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                    aria-label="Next track"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

// Extend Window interface
declare global {
  interface Window {
    YT: typeof YT;
    onYouTubeIframeAPIReady: () => void;
  }
}
