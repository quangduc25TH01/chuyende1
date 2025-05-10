import { useEffect } from 'react';
import { message } from 'antd';
import useSWR, { mutate } from 'swr';
import { useNavigate } from 'react-router-dom';
import { ColumnsConfigs } from './columnConfigs';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DynamicTable from '../../components/Tables';
import axios from '../../api/axios';
import handleErrorsApi from '../../utils/handleErrorsApi';
import Notification from '../../api/Notification';

const fetcherNotifications = (url: string) =>
  axios.get(url).then((res) => res.data);

const NotificationPage = () => {
  const navigate = useNavigate();

  const {
    data: notifications,
    error,
    isLoading,
  } = useSWR('/notifications', fetcherNotifications, {
    revalidateOnFocus: false,
    populateCache: false,
  });

  useEffect(() => {
    if (error) {
      navigate('/login');
      return;
    }
  }, [error]);

  const handleEdit = async (recordId: number, checked: boolean) => {
    try {
      await Notification.updateStatusNotification(recordId, {
        isRead: checked,
      });

      mutate(`/notifications`);
      mutate(`/notifications?unRead=true`);
      message.success('Cập nhật thành công');
    } catch (error: any) {
      message.error(handleErrorsApi(error));
    }
  };

  const columns = ColumnsConfigs({
    data: notifications || [],
    onEdit: handleEdit,
  });

  return (
    <>
      <Breadcrumb pageName="Thông báo" pageTitle="Quản lý thông báo" />

      <div className="flex flex-col gap-10">
        <DynamicTable
          data={notifications}
          loading={isLoading}
          columns={columns}
        />
      </div>
    </>
  );
};

export default NotificationPage;
