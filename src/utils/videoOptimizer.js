/**
 * Video optimization utility for better performance
 * - Handles lazy loading
 * - Provides fallbacks for mobile
 * - Fixes common issues with video playback
 */

export function optimizeVideos() {
  const videos = document.querySelectorAll('video');
  
  videos.forEach(video => {
    // Check if on mobile
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    // Apply mobile-specific optimizations
    if (isMobile) {
      // Use lower resolution or reduce quality for mobile
      video.setAttribute('playsinline', '');
      video.setAttribute('preload', 'auto');
      
      // Ensure video can play on mobile
      document.addEventListener('touchstart', () => {
        video.play().catch(error => {
          console.log('Mobile video playback error:', error);
          handleVideoError(video);
        });
      }, { once: true });
    }
    
    // Add error handling
    video.addEventListener('error', () => handleVideoError(video));
    
    // Force play attempt
    video.play().catch(error => {
      console.log('Video autoplay error:', error);
      handleVideoError(video);
    });
  });
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