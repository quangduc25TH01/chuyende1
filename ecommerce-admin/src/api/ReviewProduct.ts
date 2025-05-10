import axios from './axios';

const ReviewProduct = (() => {
  const getReviewsProduct = () => {
    return axios.get('/review');
  };

  const updateReviewProduct = (id: number, data: any) => {
    return axios.patch(`/review/${id}`, data);
  };

  const deleteReviewProduct = (id: number, data: any) => {
    return axios.delete(`/review/${id}`, { data });
  };

  return {
    getReviewsProduct,
    updateReviewProduct,
    deleteReviewProduct,
  };
})();

export default ReviewProduct;
