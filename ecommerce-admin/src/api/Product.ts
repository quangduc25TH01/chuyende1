import axios from './axios';

const Product = (() => {
  const getProducts = () => {
    return axios.get('/products');
  };

  const createProduct = (data: any) => {
    return axios.post('/products', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  const updateProduct = (id: number, data: any) => {
    return axios.patch(`/products/${id}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  const deleteProduct = (id: number, data: any) => {
    return axios.delete(`/products/${id}`, {
      data,
    });
  };

  const updateProductImage = (id: number, data: any) => {
    return axios.patch(`/products/used-image/${id}`, data);
  };

  return {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    updateProductImage,
  };
})();

export default Product;
