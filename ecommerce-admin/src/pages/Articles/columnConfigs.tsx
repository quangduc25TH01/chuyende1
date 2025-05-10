import { Button, Checkbox, Tooltip } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import moment from 'moment';
import { ColumnsProps } from 'components/Tables';

export const ArticleCategoryOptions: any = {
  product: 'Sản phẩm',
  promotion: 'Khuyến mãi',
  other: 'Tin tức khác',
};

interface ColumnsConfigsProps {
  data: Record<string, any>[];
  onView: (record: any) => void;
  onEdit: (record: any) => void;
  onPublish: (recordId: number, data: any) => void;
  onDelete: (recordId: number, checked: boolean) => void;
}

export const ColumnsConfigs = (
  options: ColumnsConfigsProps,
): ColumnsProps[] => {
  const { onView, onEdit, onPublish, onDelete } = options;
  return [
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title',
      width: 250,
      render: (title: string, record) => (
        <Tooltip placement="topLeft" title="Xem chi tiết">
          <span
            className="font-semibold underline text-[#1677ff] cursor-pointer"
            onClick={() => onView(record)}
          >
            {title}
          </span>
        </Tooltip>
      ),
    },

    {
      title: 'Slug',
      dataIndex: 'slug',
      key: 'slug',
    },

    {
      title: 'Danh mục',
      dataIndex: 'category',
      key: 'category',
      render: (category: any) => ArticleCategoryOptions[category],
    },

    {
      title: 'Hình ảnh',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      render: (thumbnail: string) =>
        thumbnail ? (
          <img
            src={thumbnail}
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
        <>{moment(createdAt).format('DD/MM/YYYY')}</>
      ),
    },

    {
      title: 'Hiện thị',
      dataIndex: 'isPublished',
      key: 'isPublished',
      align: 'center',
      render: (isPublished: boolean, record: any) => {
        return (
          <Checkbox
            checked={isPublished}
            onChange={(e) =>
              onPublish(record.id, { isPublished: e.target.checked })
            }
          />
        );
      },
    },

    {
      title: 'Xóa',
      dataIndex: 'isRemoved',
      key: 'isRemoved',
      align: 'center',
      render: (isRemoved: boolean, record: any) => {
        return (
          <Checkbox
            checked={isRemoved}
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
