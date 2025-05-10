import axios from './axios';

const Order = (() => {
  const createOrder = (data: any) => {
    return axios.post('/order', { data });
  };

  const updateOrder = (id: number, data: any) => {
    return axios.patch(`/order/${id}`, { data });
  };

  return {
    createOrder,
    updateOrder,
  };
})();

export default Order;
