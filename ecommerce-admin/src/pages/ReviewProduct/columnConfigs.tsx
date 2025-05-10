import { Button, Checkbox, Rate } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { ColumnsProps } from 'components/Tables';

interface ColumnsConfigsProps {
  data: Record<string, any>[];
  onEdit: (record: any) => void;
  onDelete: (checked: boolean, recordId: number) => void;
}

export const ColumnsConfigs = (
  options: ColumnsConfigsProps,
): ColumnsProps[] => {
  const { onEdit, onDelete } = options;
  return [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Bình luận',
      dataIndex: 'comment',
      key: 'comment',
      width: 300,
    },
    {
      title: 'Sản phẩm',
      dataIndex: 'product',
      key: 'product',
      render: (product: any) => <>{product.name}</>,
    },
    {
      title: 'Đánh giá',
      dataIndex: 'rating',
      key: 'rating',
      render: (rating: number) => <Rate value={rating} disabled />,
    },

    {
      title: 'Hiện thị',
      dataIndex: 'isRemoved',
      key: 'isRemoved',
      align: 'center',
      render: (isRemoved: boolean, record: any) => {
        return (
          <Checkbox
            checked={!isRemoved}
            onChange={(e) => onDelete(e.target.checked, record.id)}
          />
        );
      },
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
            onClick={() => onEdit(record)}
            style={{ marginRight: 8 }}
          />
        </>
      ),
    },
  ];
};
