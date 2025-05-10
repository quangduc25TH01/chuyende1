import { Button, Checkbox, Tooltip } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { ColumnsProps } from 'components/Tables';

interface ColumnsConfigsProps {
  data: Record<string, any>[];
  onView: (record: any) => void;
  onEdit: (record: any) => void;
  onDelete: (recordId: number, checked: boolean) => void;
}

export const ColumnsConfigs = (
  options: ColumnsConfigsProps,
): ColumnsProps[] => {
  const { data, onView, onEdit, onDelete } = options;
  return [
    {
      title: 'Mã sản phẩm',
      dataIndex: 'code',
      key: 'code',
      render: (code: string, record) => (
        <Tooltip placement="topLeft" title="Xem chi tiết">
          <span
            className="font-semibold underline text-[#1677ff] cursor-pointer"
            onClick={() => onView(record)}
          >
            {code}
          </span>
        </Tooltip>
      ),
    },
    {
      title: 'Danh mục',
      dataIndex: 'category',
      key: 'category',
      render: (category: any) => category.name,
    },

    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
      width: 250,
      sorter: (a, b) => a.name.localeCompare(b.name),
      filters: [...data.map((item) => ({ text: item.name, value: item.name }))],
      onFilter: (value: any, record: any) => record.name.indexOf(value) === 0,
    },

    {
      title: 'Slug',
      dataIndex: 'slug',
      key: 'slug',
      width: 200,
    },

    {
      title: 'Giá',
      dataIndex: 'variants',
      key: 'variants',
      render: (variants: any[]) => {
        return (
          <span>{variants && variants.length ? variants[0].price : 0}</span>
        );
      },
    },

    {
      title: 'Hình ảnh',
      dataIndex: 'images',
      key: 'images',
      render: (images: any[]) =>
        images && images.length > 0 ? (
          <img
            src={images[0].imageUrl}
            alt="icon"
            className="w-20 h-20 rounded-[4px] object-cover"
          />
        ) : (
          <p className="opacity-50">N/A</p>
        ),
    },

    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt: string) => (
        <>{new Date(createdAt).toLocaleDateString()}</>
      ),
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
            onChange={(e) => onDelete(record.id, e.target.checked)}
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
