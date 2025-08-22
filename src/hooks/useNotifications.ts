import { notifications } from '@mantine/notifications';

interface NotificationOptions {
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
}

export const useNotifications = () => {
  const showNotification = ({ type, title, message }: NotificationOptions) => {
    const colors = {
      success: 'primary',
      error: 'red',
      info: 'blue',
      warning: 'yellow',
    };

    notifications.show({
      title,
      message,
      color: colors[type],
      autoClose: type === 'error' ? 7000 : 5000,
    });
  };

  const showSuccess = (title: string, message: string) => {
    showNotification({ type: 'success', title, message });
  };

  const showError = (title: string, message: string) => {
    showNotification({ type: 'error', title, message });
  };

  const showInfo = (title: string, message: string) => {
    showNotification({ type: 'info', title, message });
  };

  return {
    showNotification,
    showSuccess,
    showError,
    showInfo,
  };
};