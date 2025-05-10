import { Button, Checkbox, Select, Tooltip } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { ColumnsProps } from 'components/Tables';

export const OrderStatus: any = {
  pending: 'Đang xác nhận',
  shipping: 'Đang giao hàng',
  completed: 'Hoàn thành',
  canceled: 'Hủy bỏ',
};

interface ColumnsConfigsProps {
  data: Record<string, any>[];
  onView: (record: any) => void;
  onEdit: (recordId: any, data: any) => void;
  onUpdate: (record: any) => void;
}

export const ColumnsConfigs = (
  options: ColumnsConfigsProps,
): ColumnsProps[] => {
  const { onView, onEdit, onUpdate } = options;

  return [
    {
      title: 'Mã đơn hàng',
      dataIndex: 'orderId',
      key: 'orderId',
      render: (orderId: string, record) => (
        <Tooltip placement="topLeft" title="Xem chi tiết">
          <span
            className="font-semibold underline text-[#1677ff] cursor-pointer"
            onClick={() => onView(record)}
          >
            {orderId}
          </span>
        </Tooltip>
      ),
    },
    {
      title: 'Tên khách hàng',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string, record: any) => (
        <Select
          className="w-36"
          defaultValue={status}
          onChange={(value: any) =>
            onEdit(record.id, {
              status: value,
            })
          }
        >
          {Object.keys(OrderStatus).map((key) => (
            <Select.Option key={key} value={key}>
              {OrderStatus[key]}
            </Select.Option>
          ))}
        </Select>
      ),
    },

    {
      title: 'Thanh toán',
      dataIndex: 'paidStatus',
      key: 'paidStatus',
      render: (paidStatus: boolean, record: any) => (
        <Checkbox
          checked={paidStatus}
          onChange={(e) => {
            if (record.status !== 'completed') {
              return;
            }
            onEdit(record.id, {
              paidStatus: e.target.checked,
            });
          }}
          disabled={record.status !== 'completed'}
        >
          {paidStatus ? 'Đã thanh toán' : 'Chưa thanh toán'}
        </Checkbox>
      ),
    },
    {
      title: '',
      dataIndex: '',
      key: '',
      align: 'right',
      render: (_: any, record: any) => (
        <>
          <Button
            icon={<EditOutlined />}
            onClick={() => onUpdate(record)}
            style={{ marginRight: 8 }}
          />
        </>
      ),
    },
  ];
};
