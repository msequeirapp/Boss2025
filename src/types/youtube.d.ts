/**
 * Type definitions for YouTube IFrame Player API
 */

declare namespace YT {
  interface PlayerOptions {
    width?: string | number;
    height?: string | number;
    videoId?: string;
    playerVars?: {
      autoplay?: 0 | 1;
      cc_load_policy?: 1;
      color?: 'red' | 'white';
      controls?: 0 | 1 | 2;
      disablekb?: 0 | 1;
      enablejsapi?: 0 | 1;
      end?: number;
      fs?: 0 | 1;
      hl?: string;
      iv_load_policy?: 1 | 3;
      list?: string;
      listType?: 'playlist' | 'search' | 'user_uploads';
      loop?: 0 | 1;
      modestbranding?: 0 | 1;
      origin?: string;
      playlist?: string;
      playsinline?: 0 | 1;
      rel?: 0 | 1;
      showinfo?: 0 | 1;
      start?: number;
      mute?: 0 | 1;
      host?: string;
      [key: string]: unknown;
    };
    events?: {
      onReady?: (event: PlayerEvent) => void;
      onStateChange?: (event: OnStateChangeEvent) => void;
      onPlaybackQualityChange?: (event: OnPlaybackQualityChangeEvent) => void;
      onPlaybackRateChange?: (event: OnPlaybackRateChangeEvent) => void;
      onError?: (event: OnErrorEvent) => void;
      onApiChange?: (event: PlayerEvent) => void;
    };
  }

  interface PlayerEvent {
    target: Player;
  }

  interface OnStateChangeEvent {
    target: Player;
    data: number;
  }

  interface OnPlaybackQualityChangeEvent {
    target: Player;
    data: string;
  }

  interface OnPlaybackRateChangeEvent {
    target: Player;
    data: number;
  }

  interface OnErrorEvent {
    target: Player;
    data: number;
  }

  class Player {
    constructor(elementId: string | HTMLElement, options: PlayerOptions);
    getIframe(): HTMLIFrameElement;
    getVideoData(): Record<string, unknown>;
    getVideoUrl(): string;
    getVolume(): number;
    setVolume(volume: number): void;
    mute(): void;
    unMute(): void;
    isMuted(): boolean;
    setSize(width: number, height: number): object;
    getPlaybackRate(): number;
    setPlaybackRate(suggestedRate: number): void;
    getAvailablePlaybackRates(): number[];
    playVideo(): void;
    pauseVideo(): void;
    stopVideo(): void;
    seekTo(seconds: number, allowSeekAhead?: boolean): void;
    getPlayerState(): number;
    getCurrentTime(): number;
    getDuration(): number;
    getVideoLoadedFraction(): number;
    getVideoStartBytes(): number;
    getVideoBytesLoaded(): number;
    getVideoBytesTotal(): number;
    getOptions(module: string): string[];
    getOption(module: string, option: string): unknown;
    setOption(module: string, option: string, value: unknown): void;
    cueVideoById(videoId: string, startSeconds?: number, suggestedQuality?: string): void;
    loadVideoById(videoId: string, startSeconds?: number, suggestedQuality?: string): void;
    cueVideoByUrl(mediaContentUrl: string, startSeconds?: number, suggestedQuality?: string): void;
    loadVideoByUrl(mediaContentUrl: string, startSeconds?: number, suggestedQuality?: string): void;
    cuePlaylist(playlist: string | string[], index?: number, startSeconds?: number, suggestedQuality?: string): void;
    loadPlaylist(playlist: string | string[], index?: number, startSeconds?: number, suggestedQuality?: string): void;
    nextVideo(): void;
    previousVideo(): void;
    playVideoAt(index: number): void;
    setLoop(loopPlaylists: boolean): void;
    setShuffle(shufflePlaylist: boolean): void;
    getPlaylist(): string[];
    getPlaylistIndex(): number;
    getSphericalProperties(): object;
    setSphericalProperties(properties: object): object;
    destroy(): void;
  }

  enum PlayerState {
    UNSTARTED = -1,
    ENDED = 0,
    PLAYING = 1,
    PAUSED = 2,
    BUFFERING = 3,
    CUED = 5
  }
}