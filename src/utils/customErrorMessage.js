// src/utils/toastNotifications.js
import { toast } from 'react-hot-toast';

export const notifyError = (message) => {
  toast.error(message, {
    // Styling and other stuff here
  });
};

export const notifySuccess = (message) => {
  toast.success(message, {
    // Styling and other stuff here
  });
};
