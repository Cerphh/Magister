// components/NotificationDropdown.tsx
import React, { useRef } from 'react';
import { useNotifications } from '../hooks/useNotifications';
import { useClickOutside } from '../hooks/useClickOutside';

interface Props {
  onClose: () => void;
}

const NotificationDropdown: React.FC<Props> = ({ onClose }) => {
  const { notifications, loading } = useNotifications();
  const dropdownRef = useRef(null);

  useClickOutside(dropdownRef, onClose);

  return (
    <div
      ref={dropdownRef}
      className="absolute top-12 right-0 w-[380px] bg-[#f8fcff] shadow border rounded-lg overflow-hidden z-50"
    >
      {loading ? (
        <div className="p-4 text-sm text-gray-500">Loading...</div>
      ) : notifications.length === 0 ? (
        <div className="p-4 text-sm text-gray-500">No new notifications</div>
      ) : (
        notifications.map((notif, index) => (
          <div
            key={index}
            className="border-b last:border-none p-4 text-sm text-gray-800 hover:bg-[#edf4ff] cursor-pointer"
          >
            {notif.message}
            <div className="text-xs text-gray-400 mt-1">{notif.timestamp}</div>
          </div>
        ))
      )}
    </div>
  );
};

export default NotificationDropdown;
