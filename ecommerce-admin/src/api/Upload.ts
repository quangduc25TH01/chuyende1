import axios from './axios';

export enum PhotoTypes {
  PRODUCT = 'product',
  ARTICLE = 'article',
  CATEGORY = 'category',
  CUSTOMER = 'customer',
  OTHER = 'other',
}

export const PhotoOptions = {
  product: 'Sản phẩm',
  article: 'Bài viết',
  category: 'Danh mục',
  customer: 'Khách hàng',
  other: 'Khác',
};

const Upload = (() => {
  const uploadImage = (data: any) => {
    return axios.post('photos/upload', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  const deleteImage = (id: number) => {
    return axios.delete(`photos/${id}`);
  };

  return {
    uploadImage,
    deleteImage,
  };
})();

export default Upload;
