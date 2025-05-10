import { useEffect } from 'react';
import { message } from 'antd';
import useSWR, { mutate } from 'swr';
import { Link, useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import axios from '../../api/axios';
import Notification from '../../api/Notification';
import handleErrorsApi from '../../utils/handleErrorsApi';

const fetcherNotificationDetail = (url: string) =>
  axios.get(url).then((res) => res.data);

const NotificationDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  if (!id) {
    navigate('/notifications');
  }

  const {
    data: notification,
    error,
    isLoading,
  } = useSWR(`/notifications/${id}`, fetcherNotificationDetail, {
    revalidateOnFocus: false,
    populateCache: false,
  });

  useEffect(() => {
    if (error) {
      navigate('/login');
    }
  }, [error]);

  useEffect(() => {
    try {
      const updateNotificationStatus = async () => {
        if (notification?.isRead === false && id) {
          await Notification.updateStatusNotification(Number(id), {
            isRead: true,
          });
          mutate(`/notifications`);
          mutate(`/notifications?unRead=true`);
        }
      };
      updateNotificationStatus();
    } catch (error: any) {
      message.error(handleErrorsApi(error));
    }
  }, [notification]);

  if (isLoading) return null;

  return (
    <>
      <Breadcrumb
        pageName="Chi tiết thông báo"
        subBreadcrumb={<Link to="/manager/notification"> Thông báo</Link>}
      />

      <div className="flex flex-col gap-10 bg-white shadow-md rounded-lg p-8">
        <div className="flex flex-col gap-4">
          <div className="flex flex gap-2">
            <span className="font-semibold">Người gửi:</span>
            <span>{notification?.name}</span>
          </div>
          {notification?.email && (
            <div className="flex flex gap-2">
              <span className="font-semibold">Email:</span>
              <span>{notification?.email}</span>
            </div>
          )}
          <div className="flex flex gap-2">
            <span className="font-semibold">Số điện thoại:</span>
            <span>{notification?.phone}</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-semibold">Nội dung:</span>
            <span>{notification?.content}</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-semibold">Thời gian:</span>
            <span>
              {moment(notification?.createdAt).format('DD/MM/YYYY HH:mm')}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotificationDetailPage;
