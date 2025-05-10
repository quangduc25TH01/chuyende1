import { Button, Checkbox } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { ColumnsProps } from 'components/Tables';

interface ColumnsConfigsProps {
  data: Record<string, any>[];
  onEdit: (record: any) => void;
  onDelete: (recordId: number, checked: boolean) => void;
}

export const ColumnsConfigs = (
  options: ColumnsConfigsProps,
): ColumnsProps[] => {
  const { data, onEdit, onDelete } = options;
  return [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      filters: [...data.map((item) => ({ text: item.name, value: item.name }))],
      onFilter: (value: any, record: any) => record.name.indexOf(value) === 0,
    },
    {
      title: 'Slug',
      dataIndex: 'slug',
      key: 'slug',
    },
    {
      title: 'Logo',
      dataIndex: 'logoURL',
      key: 'logoURL',
      render: (logoURL: string) => (
        <img
          src={logoURL}
          alt="icon"
          className="w-10 h-10 rounded-[4px] object-cover"
        />
      ),
    },
    {
      title: 'Image',
      dataIndex: 'imageURL',
      key: 'imageURL',
      render: (imageURL: string) => (
        <img
          src={imageURL}
          alt="icon"
          className="w-20 h-20 rounded-[4px] object-cover"
        />
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
