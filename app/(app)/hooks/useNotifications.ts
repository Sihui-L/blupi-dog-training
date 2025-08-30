import { notifications } from '@mantine/notifications';

export const useNotifications = () => {
  const showSuccess = (title: string, message: string) => {
    notifications.show({
      title,
      message,
      color: 'green',
    });
  };

  const showError = (title: string, message: string) => {
    notifications.show({
      title,
      message,
      color: 'red',
    });
  };

  const showInfo = (title: string, message: string) => {
    notifications.show({
      title,
      message,
      color: 'blue',
    });
  };

  return {
    showSuccess,
    showError,
    showInfo,
  };
};