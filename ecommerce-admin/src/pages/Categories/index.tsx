import { useEffect, useState } from 'react';
import { Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import useSWR, { mutate } from 'swr';

import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DynamicTable from '../../components/Tables';
import { ColumnsConfigs } from './columnConfigs';
import AddOrEditCategoryModal from './AddOrEditCategoryModal';
import axios from '../../api/axios';
import Category from '../../api/Category';
import { useNavigate } from 'react-router-dom';

const fetcherCategories = (url: string) =>
  axios.get(url).then((res) => res.data);

const CategoriesPage = () => {
  const [isAddOrEditCategoryModalOpen, setIsAddOrEditCategoryModalOpen] =
    useState(false);
  const [categoryUpdate, setCategoryUpdate] = useState(null);

  const navigate = useNavigate();

  const {
    data: categories,
    error,
    isLoading,
  } = useSWR('/categories', fetcherCategories, {
    revalidateOnFocus: false,
    populateCache: false,
  });

  useEffect(() => {
    if (error) {
      navigate('/login');
    }
  }, [error]);

  const handleEdit = (record: any) => {
    setIsAddOrEditCategoryModalOpen(true);
    setCategoryUpdate(record);
  };

  const handleDelete = async (recordId: any, checked: boolean) => {
    try {
      await Category.deleteCategory(recordId, {
        isRemoved: !checked,
      });
      mutate('/categories');

      message.success('Cập nhật thành công');
    } catch (error: any) {
      message.error(error?.message || 'Something went wrong');
    }
  };

  const columns = ColumnsConfigs({
    data: categories || [],
    onEdit: handleEdit,
    onDelete: handleDelete,
  });

  return (
    <>
      <Breadcrumb
        pageName="Danh mục sản phẩm"
        pageTitle={`Danh mục sản phẩm (${categories?.length || 0})`}
      />

      <div className="flex flex-col gap-10">
        <DynamicTable
          data={categories}
          loading={isLoading}
          columns={columns}
          headerTable={() => (
            <div className="w-full flex items-center justify-end">
              <Button
                type="primary"
                className="bg-[#1677ff] ml-auto"
                icon={<PlusOutlined color="#FFFFFF" />}
                onClick={() => (
                  setIsAddOrEditCategoryModalOpen(true), setCategoryUpdate(null)
                )}
              >
                Thêm
              </Button>
            </div>
          )}
        />
      </div>

      {isAddOrEditCategoryModalOpen && (
        <AddOrEditCategoryModal
          isOpen={isAddOrEditCategoryModalOpen}
          onClose={() => setIsAddOrEditCategoryModalOpen(false)}
          categoryUpdate={categoryUpdate}
        />
      )}
    </>
  );
};

export default CategoriesPage;
