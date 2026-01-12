import { useState } from 'react';

/**
 * Custom hook for sharing content with fallback to clipboard
 * @param {Object} options - Share configuration
 * @param {Function} showToast - Toast notification function
 * @returns {Object} - Share handler and loading state
 */
export const useShare = (showToast) => {
  const [isSharing, setIsSharing] = useState(false);

  const share = async ({ title, text, url }) => {
    if (isSharing) return;
    
    setIsSharing(true);

    const shareData = { title, text, url };

    try {
      // Try native share first (works great on mobile)
      if (navigator.share && /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        await navigator.share(shareData);
        setIsSharing(false);
      } else {
        // Desktop or unsupported: copy to clipboard
        const shareText = url ? `${text} - ${url}` : text;
        await navigator.clipboard.writeText(shareText);
        showToast('Link copied! Share on WhatsApp, Telegram, or Twitter', 'success');
        setIsSharing(false);
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        // Fallback: just copy to clipboard
        try {
          const shareText = url ? `${text} - ${url}` : text;
          await navigator.clipboard.writeText(shareText);
          showToast('Link copied to clipboard!', 'success');
        } catch {
          showToast('Could not share', 'error');
        }
      }
      setIsSharing(false);
    }
  };

  return { share, isSharing };
};

export default useShare;
