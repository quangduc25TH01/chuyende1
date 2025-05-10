import axios from "./axios";

const Product = (() => {
  const search = (keyword: string) => {
    return axios.get(`/products/search?keyword=${keyword}`);
  };

  return {
    search,
  };
})();

export default Product;
