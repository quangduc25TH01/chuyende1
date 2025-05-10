import axios from './axios';

const Review = (() => {
  const getReviewByProductId = (id: number) => {
    return axios.get(`/review/${id}?client=true`);
  };

  const addReview = (id: number, review: any) => {
    return axios.post(`/review/${id}`, review);
  };

  return {
    getReviewByProductId,
    addReview,
  };
})();

export default Review;
