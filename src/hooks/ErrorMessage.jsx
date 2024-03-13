import { toast } from 'react-hot-toast';

const useCustomToast = () => {
  const showError = (message, options = {}) => {
    toast.error(message, {
      style: {

      },
      ...options,
    });
  };

  const showSuccess = (message, options = {}) => {
    toast.success(message, {
      style: {

      },
      ...options,
    });
  };

  // You can also add success, info, etc., in a similar way
  return { showError, showSuccess };
};

export default useCustomToast;
