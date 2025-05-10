import axios from './axios';

const OrderProduct = (() => {
  const createOrder = (data: any) => {
    return axios.post(`/order`, data);
  };

  const getOrderDetailsByOrderIds = (data: any) => {
    return axios.post('/order/detail-by-order-ids', data);
  };

  return {
    createOrder,
    getOrderDetailsByOrderIds,
  };
})();

export default OrderProduct;
