import React from 'react';
import { X, CheckCircle, Info, AlertCircle, AlertTriangle } from 'lucide-react';
import type { Notification } from '../../types';
import { useStore } from '../../lib/store';

interface ToastProps {
  notification: Notification;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ notification, onClose }) => {
  const icons = {
    success: CheckCircle,
    info: Info,
    warning: AlertTriangle,
    error: AlertCircle,
  };

  const colors = {
    success: 'bg-green-50 text-green-800 border-green-200',
    info: 'bg-blue-50 text-blue-800 border-blue-200',
    warning: 'bg-yellow-50 text-yellow-800 border-yellow-200',
    error: 'bg-red-50 text-red-800 border-red-200',
  };

  const Icon = icons[notification.type];

  return (
    <div className={`flex items-start gap-3 p-4 rounded-lg border ${colors[notification.type]} shadow-lg animate-slide-in`}>
      <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        <h4 className="font-semibold">{notification.title}</h4>
        <p className="text-sm">{notification.message}</p>
      </div>
      <button onClick={onClose} className="flex-shrink-0">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export const ToastContainer: React.FC = () => {
  const { notifications, removeNotification } = useStore();

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-md">
      {notifications.map((notification: Notification) => (
        <Toast
          key={notification.id}
          notification={notification}
          onClose={() => removeNotification(notification.id)}
        />
      ))}
    </div>
  );
};
