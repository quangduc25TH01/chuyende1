import axios from './axios';

export enum ModuleNotification {
  CONSULTING = 'CONSULTING',
  ORDER = 'ORDER',
  PRINTING_SERVICE = 'PRINTING_SERVICE',
}

const Notification = (() => {
  const updateStatusNotification = (id: number, data: any) => {
    return axios.patch(`/notifications/${id}`, data);
  };

  return {
    updateStatusNotification,
  };
})();

export default Notification;
