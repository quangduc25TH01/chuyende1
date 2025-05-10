import { useEffect, useState } from 'react';
import { message } from 'antd';
import useSWR, { mutate } from 'swr';
import { useNavigate } from 'react-router-dom';

import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DynamicTable from '../../components/Tables';
import { ColumnsConfigs } from './columnConfigs';
import AddOrEditCategoryModal from './UpdateReviewModal';
import axios from '../../api/axios';
import ReviewProduct from '../../api/ReviewProduct';
import handleErrorsApi from '../../utils/handleErrorsApi';

const fetcherReviews = (url: string) => axios.get(url).then((res) => res.data);

const ReviewProductPage = () => {
  const [reviewUpdate, setReviewUpdate] = useState(null);

  const navigate = useNavigate();

  const {
    data: reviews,
    error,
    isLoading,
  } = useSWR('/review', fetcherReviews, {
    revalidateOnFocus: false,
  });

  useEffect(() => {
    if (error) {
      navigate('/login');
    }
  }, [error]);

  const handleEdit = (record: any) => {
    setReviewUpdate(record);
  };

  const handleDelete = async (checked: boolean, recordId: number) => {
    try {
      await ReviewProduct.deleteReviewProduct(recordId, {
        isRemoved: !checked,
      });

      mutate('/review');
      message.success('Cập nhật trạng thái thành công');
    } catch (error: any) {
      message.error(handleErrorsApi(error));
    }
  };

  const columns = ColumnsConfigs({
    data: reviews || [],
    onEdit: handleEdit,
    onDelete: handleDelete,
  });

  return (
    <>
      <Breadcrumb pageName="Đánh giá sản phẩm" />

      <div className="flex flex-col gap-10">
        <DynamicTable data={reviews} loading={isLoading} columns={columns} />
      </div>

      {!!reviewUpdate && (
        <AddOrEditCategoryModal
          isOpen={!!reviewUpdate}
          onClose={() => setReviewUpdate(null)}
          reviewUpdate={reviewUpdate}
        />
      )}
    </>
  );
};

export default ReviewProductPage;
