import { useState } from 'react';
import { Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import useSWR, { mutate } from 'swr';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DynamicTable from '../../components/Tables';
import { ColumnsConfigs } from './columnConfigs';
import AddOrEditProductModal from './AddOrEditProductModal';
import axios from '../../api/axios';
import PreviewProduct from './PreviewProduct';
import Product from '../../api/Product';
import handleErrorsApi from '../../utils/handleErrorsApi';

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const ProductsPage = () => {
  const [isAddOrEditProductModalOpen, setIsAddOrEditProductModalOpen] =
    useState(false);
  const [productUpdate, setProductUpdate] = useState(null);
  const [previewProductData, setPreviewProductData] = useState(null);

  const {
    data: products,

    isLoading,
  } = useSWR('/products', fetcher, {
    revalidateOnFocus: false,
    populateCache: false,
  });

  const { data: categories } = useSWR('/categories', fetcher, {
    revalidateOnFocus: false,
    populateCache: false,
  });

  const handleEdit = (record: any) => {
    setIsAddOrEditProductModalOpen(true);
    setProductUpdate(record);
  };

  const handleDelete = async (recordId: any, checked: boolean) => {
    try {
      await Product.deleteProduct(recordId, {
        isRemoved: !checked,
      });

      mutate('/products');

      message.success('Cập nhật thành công');
    } catch (error: any) {
      console.log('Error:', error);
      message.error(handleErrorsApi(error));
    }
  };

  const handleView = (record: any) => {
    setPreviewProductData(record);
  };

  const columns = ColumnsConfigs({
    data: products || [],
    onView: handleView,
    onEdit: handleEdit,
    onDelete: handleDelete,
  });

  return (
    <>
      <Breadcrumb
        pageName="Sản phẩm"
        pageTitle={`Sản phẩm (${products?.length || 0})`}
      />

      <div className="flex flex-col gap-10">
        <DynamicTable
          data={products || []}
          loading={isLoading}
          columns={columns}
          headerTable={() => (
            <div className="w-full flex items-center justify-end">
              <Button
                type="primary"
                className="bg-[#1677ff] ml-auto"
                icon={<PlusOutlined color="#FFFFFF" />}
                onClick={() => (
                  setIsAddOrEditProductModalOpen(true), setProductUpdate(null)
                )}
              >
                Thêm sản phẩm
              </Button>
            </div>
          )}
        />
      </div>

      {isAddOrEditProductModalOpen && (
        <AddOrEditProductModal
          isOpen={isAddOrEditProductModalOpen}
          onClose={() => setIsAddOrEditProductModalOpen(false)}
          productUpdate={productUpdate}
          categories={categories || []}
        />
      )}

      {!!previewProductData && (
        <PreviewProduct
          isOpen={!!previewProductData}
          onClose={() => setPreviewProductData(null)}
          product={previewProductData}
        />
      )}
    </>
  );
};

export default ProductsPage;
