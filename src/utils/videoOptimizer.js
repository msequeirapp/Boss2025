/**
 * Video optimization utility for better performance
 * - Handles lazy loading
 * - Provides fallbacks for mobile
 * - Fixes common issues with video playback
 */

export function optimizeVideos() {
  // Wait a short moment to ensure DOM is fully processed
  setTimeout(() => {
    const videos = document.querySelectorAll('video');
    console.log('Found videos:', videos.length);
    
    // Special handling for hero video - direct access
    const heroVideo = document.getElementById('hero-video');
    if (heroVideo) {
      console.log('Hero video found - applying special handling');
      forceVideoPlay(heroVideo);
    }
    
    videos.forEach(video => {
      // Check if on mobile
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      
      // Log video source for debugging
      const sources = video.querySelectorAll('source');
      sources.forEach(source => {
        console.log('Video source:', source.src);
      });
      
      // Apply mobile-specific optimizations
      if (isMobile) {
        // Use lower resolution or reduce quality for mobile
        video.setAttribute('playsinline', '');
        video.setAttribute('preload', 'auto');
        
        // Ensure video can play on mobile
        document.addEventListener('touchstart', () => {
          forceVideoPlay(video);
        }, { once: true });
      }
      
      // Add error handling
      video.addEventListener('error', () => handleVideoError(video));
      
      // Force play attempt
      forceVideoPlay(video);
    });
  }, 500); // 500ms delay to ensure DOM is ready
}

function forceVideoPlay(video) {
  // Make sure video is properly loaded
  if (video.readyState === 0) {
    video.load();
  }
  
  // Force play with multiple attempts
  const playAttempt = setInterval(() => {
    video.play().then(() => {
      console.log('Video playback started successfully');
      clearInterval(playAttempt);
    }).catch(error => {
      console.log('Video playback attempt failed:', error);
      // After several attempts, use fallback if still failing
      if (video.dataset.attempts > 3) {
        handleVideoError(video);
        clearInterval(playAttempt);
      }
      video.dataset.attempts = (parseInt(video.dataset.attempts || '0') + 1).toString();
    });
  }, 1000);
  
  // Clear interval after max 5 seconds regardless
  setTimeout(() => clearInterval(playAttempt), 5000);
}

function handleVideoError(video) {
  // Hide the video element
  video.style.display = 'none';
  
  // Apply a fallback background
  if (video.parentElement) {
    video.parentElement.classList.add('video-fallback');
  }
}

/**
 * Equalizes the height of all service cards
 */
export function equalizeServiceCardHeights() {
  // Target service cards
  const serviceCards = document.querySelectorAll('.grid-cols-1 > *, .grid-cols-2 > *, .grid-cols-3 > *');
  
  if (!serviceCards.length) return;
  
  // Reset heights first
  serviceCards.forEach(card => {
    card.style.height = 'auto';
  });
  
  // Group cards by their row (for desktop view)
  const isDesktop = window.innerWidth >= 768;
  
  if (isDesktop) {
    // Find the tallest card in each row and apply that height to all cards in the row
    let maxHeight = 0;
    
    serviceCards.forEach(card => {
      const height = card.offsetHeight;
      maxHeight = Math.max(maxHeight, height);
    });
    
    // Apply the maximum height to all cards
    serviceCards.forEach(card => {
      card.style.height = `${maxHeight}px`;
    });
  }
}

// Run these optimizations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  optimizeVideos();
  
  // Run equalizeServiceCardHeights after a slight delay to ensure all content has loaded
  setTimeout(equalizeServiceCardHeights, 100);
  
  // Also run when window is resized
  window.addEventListener('resize', () => {
    equalizeServiceCardHeights();
  });
});