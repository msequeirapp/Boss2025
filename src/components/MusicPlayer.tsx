import { useState, useCallback, memo, useEffect, useRef } from "react";

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
    className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-12 h-12 rounded-full leading-none shadow-lg bg-melody-fuchsia hover:bg-melody-fuchsia/90 transition-colors"
    aria-label={showPlayer ? "Close player" : "Open player"}
    type="button"
  >
    {showPlayer ? (
      // Ícono de cerrar
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="w-6 h-6 block"
        stroke="currentColor"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </svg>
    ) : (
      // Ícono de audífonos 🎧
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="w-6 h-6 block"
        stroke="currentColor"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
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
  onPlayerReady
}: {
  videoId: string;
  onEnd: () => void;
  onPlayerReady: (player: YT.Player) => void;
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<YT.Player | null>(null);

  useEffect(() => {
    let mounted = true;

    const setBestQuality = () => {
      try {
        playerRef.current?.setPlaybackQuality("highres");
        playerRef.current?.setPlaybackQuality("hd1080");
      } catch {}
    };

    const initPlayer = async () => {
      await loadYouTubeAPI();
      if (!mounted || !containerRef.current) return;

      playerRef.current = new window.YT.Player(containerRef.current, {
        height: "100%",
        width: "100%",
        videoId,
        playerVars: {
          autoplay: 0,           // 🔒 no auto-play aquí; lo controlamos desde el padre
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
            if (!mounted) return;
            // No reproducimos aquí para evitar auto-resume al pausar.
            onPlayerReady(playerRef.current as YT.Player);
            playerRef.current?.seekTo(0, true);
            setBestQuality();
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
      mounted = false;
      playerRef.current?.destroy();
      playerRef.current = null;
    };
  }, [videoId, onEnd, onPlayerReady]); // ❗ NO dependemos de isPlaying

  return (
    <div className="aspect-video w-full rounded-lg overflow-hidden">
      <div ref={containerRef} className="w-full h-full" />
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
      setIsPlaying(false);
    } else {
      player.playVideo();
      setIsPlaying(true);
    }
  }, [isPlaying, player]);

  const previousTrack = useCallback(() => {
    setCurrentTrackIndex((prev) => (prev === 0 ? trackData.length - 1 : prev - 1));
    setIsPlaying(true); // reproducir siguiente al cambiar
  }, []);

  const nextTrack = useCallback(() => {
    setCurrentTrackIndex((prev) => (prev === trackData.length - 1 ? 0 : prev + 1));
    setIsPlaying(true); // reproducir siguiente al cambiar
  }, []);

  const togglePlayer = useCallback(() => {
    setShowPlayer((prev) => !prev);
  }, []);

  const handlePlayerReady = useCallback(
    (ytPlayer: YT.Player) => {
      setPlayer(ytPlayer);
      // Si ya estaba en "play", reproducimos (p.ej. al cambiar de track)
      if (isPlaying) ytPlayer.playVideo();
    },
    [isPlaying]
  );

  // Si cambias de track y debe reproducir, cuando el nuevo player esté listo, se ejecuta desde handlePlayerReady.
  // Si pausas, ya no recreamos el player por cambio de isPlaying, así que NO se auto-reproduce.

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
            className="absolute top-2 right-2 flex items-center justify-center p-2 rounded-full bg-white/10 hover:bg-white/20 z-10 leading-none"
            aria-label="Close player"
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-5 h-5 block"
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
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
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 transition-colors leading-none"
                    aria-label="Previous track"
                    type="button"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="w-5 h-5 block"
                      stroke="currentColor"
                      fill="none"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m12 19-7-7 7-7" />
                      <path d="m19 19-7-7 7-7" />
                    </svg>
                  </button>

                  {/* Play / Pause */}
                  <button
                    onClick={togglePlayPause}
                    className="flex items-center justify-center w-14 h-14 rounded-full bg-melody-fuchsia text-white hover:bg-melody-fuchsia/90 transition-colors leading-none"
                    aria-label={isPlaying ? "Pause" : "Play"}
                    type="button"
                  >
                    {isPlaying ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="w-6 h-6 block"
                        stroke="currentColor"
                        fill="none"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="6" y="4" width="4" height="16" />
                        <rect x="14" y="4" width="4" height="16" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="w-6 h-6 block"
                        stroke="currentColor"
                        fill="none"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    )}
                  </button>

                  {/* Next */}
                  <button
                    onClick={nextTrack}
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 transition-colors leading-none"
                    aria-label="Next track"
                    type="button"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="w-5 h-5 block"
                      stroke="currentColor"
                      fill="none"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m5 19 7-7-7-7" />
                      <path d="m12 19 7-7-7-7" />
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
