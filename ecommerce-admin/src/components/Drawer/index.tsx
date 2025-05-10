import React from 'react';
import { Button, Drawer, Space } from 'antd';

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string | JSX.Element;
  children?: JSX.Element;
  width?: string | number;
}

const DrawerComponent: React.FC<DrawerProps> = (props) => {
  const { isOpen, onClose, title, children, width = 720 } = props;

  return (
    <>
      <Drawer
        title={title}
        width={width}
        onClose={onClose}
        open={isOpen}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
          </Space>
        }
      >
        {children}
      </Drawer>
    </>
  );
};

export default DrawerComponent;
