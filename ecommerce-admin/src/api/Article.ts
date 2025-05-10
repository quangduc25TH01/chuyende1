import axios from './axios';

const Article = (() => {
  const getArticles = () => {
    return axios.get('/articles');
  };

  const createArticles = (data: any) => {
    return axios.post('/articles', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  const updateArticles = (id: string, data: any) => {
    return axios.patch(`/articles/${id}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  const deleteArticles = (id: string, data: any) => {
    return axios.delete(`/articles/${id}`, { data });
  };

  return {
    getArticles,
    createArticles,
    updateArticles,
    deleteArticles,
  };
})();

export default Article;
