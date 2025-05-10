import { Checkbox, Tooltip } from 'antd';
import { ColumnsProps } from 'components/Tables';
import { ModuleNotification } from '../../api/Notification';
import { Link } from 'react-router-dom';

interface ColumnsConfigsProps {
  data: Record<string, any>[];
  onEdit: (recordId: number, checked: boolean) => void;
}

export const ColumnsConfigs = (
  options: ColumnsConfigsProps,
): ColumnsProps[] => {
  const { onEdit } = options;
  return [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render(name, record) {
        return (
          <Tooltip placement="topLeft" title="Xem chi tiết">
            <Link
              to={`/manager/notification/${record.id}`}
              className="text-[#1677ff] cursor-pointer hover:underline hover:text-[#1677ff]"
            >
              {name}
            </Link>
          </Tooltip>
        );
      },
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'name',
    },
    {
      title: 'Module',
      dataIndex: 'module',
      key: 'module',
      render: (module: string) => {
        let moduleName = 'Tư vấn';
        if (module === ModuleNotification.ORDER) {
          moduleName = 'Đơn hàng';
        }
        if (module === ModuleNotification.PRINTING_SERVICE) {
          moduleName = 'Dịch vụ in ấn';
        }

        return <>{moduleName}</>;
      },

      filters: [
        {
          text: 'Tư vấn',
          value: ModuleNotification.CONSULTING,
        },
        {
          text: 'Đơn hàng',
          value: ModuleNotification.ORDER,
        },
        {
          text: 'Dịch vụ in ấn',
          value: ModuleNotification.PRINTING_SERVICE,
        },
      ],
      onFilter: (value: string, record: any) => record.module === value,
    },
    {
      title: 'Content',
      dataIndex: 'content',
      key: 'content',
      width: 300,
    },

    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt: string) => (
        <>{new Date(createdAt).toLocaleDateString()}</>
      ),
      sorter: (a: any, b: any) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    },

    {
      title: 'Đã đọc',
      dataIndex: 'isRead',
      key: 'isRead',
      align: 'center',
      filters: [
        {
          text: 'Chưa đọc',
          value: 'false',
        },
        {
          text: 'Đã đọc',
          value: 'true',
        },
      ],
      onFilter: (value: string, record: any) =>
        record.isRead === (value === 'true'),

      render: (isRead: boolean, record: any) => {
        return (
          <Checkbox
            checked={isRead}
            onChange={(e) => onEdit(record.id, e.target.checked)}
          />
        );
      },
    },
  ];
};
