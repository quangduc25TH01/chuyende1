import { useEffect, useState } from 'react';
import useSWR, { mutate } from 'swr';
import { message } from 'antd';
// import { PlusOutlined } from '@ant-design/icons';

import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DynamicTable from '../../components/Tables';
import { ColumnsConfigs } from './columnConfigs';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import PreviewOrder from './PreviewOrder';
import handleErrorsApi from '../../utils/handleErrorsApi';
import Order from '../../api/Order';
import AddOrEditOrderModal from './AddOrEditOrderModal';

const fetcherOrders = (url: string) => axios.get(url).then((res) => res.data);

const OrderPage = () => {
  const [previewOrderData, setPreviewOrderData] = useState(null);
  const [updateOrderData, setUpdateOrderData] = useState(null);
  const [isAddOrEditOrderModalOpen, setIsAddOrEditOrderModalOpen] =
    useState(false);

  const navigate = useNavigate();

  const {
    data: orders,
    error,
    isLoading,
  } = useSWR('/order', fetcherOrders, {
    revalidateOnFocus: false,
    populateCache: false,
  });

  useEffect(() => {
    if (error) {
      navigate('/login');
    }
  }, [error]);

  const handleView = (record: any) => {
    setPreviewOrderData(record);
  };

  const handleUpdate = (record: any) => {
    setIsAddOrEditOrderModalOpen(true);
    setUpdateOrderData(record);
  };

  const handleEdit = async (recordId: any, data: any) => {
    try {
      await Order.updateOrder(recordId, data);
      mutate('/order');

      message.success('Cập nhật thành công');
    } catch (error: any) {
      console.log('Error:', error);
      message.error(handleErrorsApi(error));
    }
  };

  const columns = ColumnsConfigs({
    data: orders || [],
    onView: handleView,
    onEdit: handleEdit,
    onUpdate: handleUpdate,
  });

  return (
    <>
      <Breadcrumb pageName="Đơn hàng" pageTitle="Quản lý đơn hàng" />

      <div className="flex flex-col gap-10">
        <DynamicTable
          data={orders}
          loading={isLoading}
          columns={columns}
          // headerTable={() => (
          //   <div className="w-full flex items-center justify-end">
          //     <Button
          //       type="primary"
          //       className="bg-[#1677ff] ml-auto"
          //       icon={<PlusOutlined color="#FFFFFF" />}
          //       onClick={() => {
          //         setIsAddOrEditOrderModalOpen(true);
          //         setUpdateOrderData(null);
          //       }}
          //     >
          //       Tạo đơn hàng
          //     </Button>
          //   </div>
          // )}
        />
      </div>

      {isAddOrEditOrderModalOpen && (
        <AddOrEditOrderModal
          isOpen={isAddOrEditOrderModalOpen}
          onClose={() => setIsAddOrEditOrderModalOpen(false)}
          orderUpdate={updateOrderData}
        />
      )}

      {!!previewOrderData && (
        <PreviewOrder
          isOpen={!!previewOrderData}
          onClose={() => setPreviewOrderData(null)}
          order={previewOrderData}
        />
      )}
    </>
  );
};

export default OrderPage;
