import React from 'react';
import { Flex, Modal } from 'antd';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string | JSX.Element;
  children?: JSX.Element;
  footerEl?: JSX.Element;
  width?: string | number;
}

const ModalComponent: React.FC<ModalProps> = (props: ModalProps) => {
  const { isOpen, onClose, title, children, footerEl, width } = props;
  return (
    <Flex vertical gap="middle" align="flex-start">
      <Modal
        title={<p className="text-xl font-[700] mb-4">{title}</p>}
        centered
        open={isOpen}
        onOk={onClose}
        onCancel={onClose}
        width={width || '50%'}
        okButtonProps={{ className: 'bg-[#1677ff]' }}
        footer={() => <>{footerEl}</>}
      >
        {children}
      </Modal>
    </Flex>
  );
};

export default ModalComponent;
