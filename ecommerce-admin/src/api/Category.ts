import axios from './axios';

const Category = (() => {
  const getCategories = () => {
    return axios.get('/categories');
  };

  const createCategory = (data: any) => {
    return axios.post('/categories', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  const updateCategory = (id: string, data: any) => {
    return axios.patch(`/categories/${id}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  const deleteCategory = (id: string, data: any) => {
    return axios.delete(`/categories/${id}`, { data });
  };

  return {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
  };
})();

export default Category;
