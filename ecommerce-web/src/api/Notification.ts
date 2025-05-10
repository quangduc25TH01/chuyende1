import axios from './axios';

export enum ModuleNotification {
  CONSULTING = 'CONSULTING',
  ORDER = 'ORDER',
  PRINTING_SERVICE = 'PRINTING_SERVICE',
}

const Notification = (() => {
  const createNewNotification = (data: any) => {
    return axios.post(`/notifications/`, data);
  };

  return {
    createNewNotification,
  };
})();

export default Notification;
