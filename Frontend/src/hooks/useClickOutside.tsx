// hooks/useClickOutside.ts (or NotificationDropdown.tsx if it's still there)

import { useEffect } from 'react';

export const useClickOutside = (
  ref: React.RefObject<HTMLElement | null>,
  onClickOutside: () => void
) => {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClickOutside();
      }
    };

    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [ref, onClickOutside]);
};
