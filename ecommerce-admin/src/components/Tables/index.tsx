import React from 'react';
import { Flex } from 'antd';
import { TableStyled } from './styles';

export interface ColumnsProps {
  title: string | (() => JSX.Element);
  dataIndex: string | number;
  key: string | number;
  sorter?: boolean | ((a: any, b: any) => number);
  filters?: { text: string; value: string }[];
  onFilter?: (value: any, record: any) => boolean;
  render?: (text: any, record: any) => JSX.Element;
  align?: 'left' | 'right' | 'center';
  width?: string | number;
  fixed?: 'left' | 'right';
}

interface TableProps {
  data: Record<string, any>[];
  columns: ColumnsProps[];
  loading: boolean;
  expandable?: {
    expandedRowRender: (record: any) => JSX.Element;
    rowExpandable: (record: any) => boolean;
  };
  showExpandColumn?: boolean;
  headerTable?: () => JSX.Element | string;
  footerTable?: () => JSX.Element | string;
}

const Tables: React.FC<TableProps> = ({
  data,
  columns,
  loading,
  headerTable,
  footerTable,
}) => {
  return (
    <div className="rounded-[6px] border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <Flex gap="middle" vertical>
        <TableStyled
          className="table-wrapper"
          columns={columns}
          dataSource={data || []}
          loading={loading}
          rowKey={(record: any) => record.id || record.key}
          title={headerTable}
          footer={footerTable}
        />
      </Flex>
    </div>
  );
};

export default Tables;
