import { useState, useCallback, memo, useEffect } from "react";

interface YoutubeTrack {
  title: string;
  artist: string;
  youtubeId: string;
}

// YouTube IDs correctos
const trackData: YoutubeTrack[] = [
  { title: "Click Clack", artist: "Jawell Brown (By Boss of Melody)", youtubeId: "i6GNxQzpQFc" },
  { title: "Delay", artist: "Moises Marsh (By Boss Of Melody)", youtubeId: "HCFh8DYPZgU" },
  { title: "Pide Reggae Wine", artist: "Harper - Tico Show Time Riddim", youtubeId: "LxkNi3fOuCM" },
  { title: "Obsesion", artist: "Moises Marsh x Toledo x Xander x Tinz", youtubeId: "CqshmSYTZyA" },
  { title: "Para las Gyales", artist: "Nega - Tico Show Time Riddim", youtubeId: "3XOAZSER5YY" },
  { title: "Quiere Mas", artist: "Taty Bwoy (By Boss of melody)", youtubeId: "ZU7PkkZV5qc" }
];

// Botón flotante (toggle) con audífonos 🎧 / cerrar ✖
const ToggleButton = memo(({ showPlayer, onClick }: { showPlayer: boolean; onClick: () => void }) => (
  <button
    onClick={onClick}
    className="fixed bottom-6 right-6 z-50 inline-flex items-center justify-center size-12 rounded-full leading-none shadow-lg bg-melody-fuchsia hover:bg-melody-fuchsia/90 transition-colors"
    aria-label={showPlayer ? "Close player" : "Open player"}
    type="button"
  >
    {showPlayer ? (
      // Ícono de cerrar
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="block">
        <path d="M18 6 6 18"></path>
        <path d="m6 6 12 12"></path>
      </svg>
    ) : (
      // Ícono de audífonos 🎧
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="block">
        <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
        <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" />
        <path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3" />
      </svg>
    )}
  </button>
));
ToggleButton.displayName = "ToggleButton";

// Cargar YouTube IFrame API
const loadYouTubeAPI = () => {
  if (window.YT) return Promise.resolve();
  return new Promise<void>((resolve) => {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    window.onYouTubeIframeAPIReady = () => resolve();
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
  });
};

// Componente Player
const YouTubePlayer = ({
  videoId,
  onEnd,
  isPlaying,
  onPlayerReady
}: {
  videoId: string;
  onEnd: () => void;
  isPlaying: boolean;
  onPlayerReady: (player: YT.Player) => void;
}) => {
  const playerContainerId = "youtube-player-container";

  useEffect(() => {
    let player: YT.Player | null = null;

    const setBestQuality = () => {
      try {
        player?.setPlaybackQuality("highres");
        player?.setPlaybackQuality("hd1080");
      } catch {}
    };

    const initPlayer = async () => {
      await loadYouTubeAPI();
      player = new window.YT.Player(playerContainerId, {
        height: "100%",
        width: "100%",
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
            player.seekTo(0, true);
            setBestQuality();
            if (isPlaying) player.playVideo();
          },
          onStateChange: (event) => {
            if (
              event.data === window.YT.PlayerState.BUFFERING ||
              event.data === window.YT.PlayerState.PLAYING
            ) {
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

  // Controles
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
    setCurrentTrackIndex((prev) => (prev === 0 ? trackData.length - 1 : prev - 1));
    setIsPlaying(true);
  }, []);

  const nextTrack = useCallback(() => {
    setCurrentTrackIndex((prev) => (prev === trackData.length - 1 ? 0 : prev + 1));
    setIsPlaying(true);
  }, []);

  const togglePlayer = useCallback(() => {
    setShowPlayer((prev) => !prev);
  }, []);

  const handlePlayerReady = useCallback(
    (ytPlayer: YT.Player) => {
      setPlayer(ytPlayer);
      if (isPlaying) ytPlayer.playVideo();
    },
    [isPlaying]
  );

  return (
    <>
      {/* Botón flotante */}
      <ToggleButton showPlayer={showPlayer} onClick={togglePlayer} />

      {/* UI del Player */}
      {showPlayer && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-black/95 border-t border-white/10 p-4 shadow-xl max-h-[90vh] overflow-y-auto">
          {/* Cerrar */}
          <button
            onClick={togglePlayer}
            className="absolute top-2 right-2 inline-flex items-center justify-center p-2 rounded-full bg-white/10 hover:bg-white/20 z-10 leading-none"
            aria-label="Close player"
            type="button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="block">
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

              {/* Info + Controles */}
              <div className="flex flex-col space-y-4 mt-2 lg:mt-0">
                <div>
                  <h3 className="font-bold text-lg text-white">{currentTrack.title}</h3>
                  <p className="text-white/70 text-sm">{currentTrack.artist}</p>
                </div>

                {/* Controles uniformes y centrados */}
                <div className="flex justify-center items-center space-x-6 mt-4">
                  {/* Prev */}
                  <button
                    onClick={previousTrack}
                    className="inline-flex items-center justify-center size-12 rounded-full bg-white/10 hover:bg-white/20 transition-colors leading-none"
                    aria-label="Previous track"
                    type="button"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="block">
                      <path d="m12 19-7-7 7-7"></path>
                      <path d="m19 19-7-7 7-7"></path>
                    </svg>
                  </button>

                  {/* Play / Pause */}
                  <button
                    onClick={togglePlayPause}
                    className="inline-flex items-center justify-center size-14 rounded-full bg-melody-fuchsia text-white hover:bg-melody-fuchsia/90 transition-colors leading-none"
                    aria-label={isPlaying ? "Pause" : "Play"}
                    type="button"
                  >
                    {isPlaying ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="block">
                        <rect x="6" y="4" width="4" height="16"></rect>
                        <rect x="14" y="4" width="4" height="16"></rect>
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="block -translate-x-[0.5px]">
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                      </svg>
                    )}
                  </button>

                  {/* Next */}
                  <button
                    onClick={nextTrack}
                    className="inline-flex items-center justify-center size-12 rounded-full bg-white/10 hover:bg-white/20 transition-colors leading-none"
                    aria-label="Next track"
                    type="button"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="block">
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

// Tipado global para la API de YouTube
declare global {
  interface Window {
    YT: typeof YT;
    onYouTubeIframeAPIReady: () => void;
  }
}
