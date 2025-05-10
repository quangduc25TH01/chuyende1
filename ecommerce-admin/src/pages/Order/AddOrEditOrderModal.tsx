import { useEffect, useState } from 'react';
import { mutate } from 'swr';
import { Button, Checkbox, Col, Form, Input, message, Row, Select } from 'antd';
import type { FormProps } from 'antd';
const { TextArea } = Input;

import Drawer, { DrawerProps } from 'components/Drawer';
import handleErrorsApi from '../../utils/handleErrorsApi';
import { OrderStatus } from './columnConfigs';
import Order from '../../api/Order';

interface AddOrEditOrderModalProps extends DrawerProps {
  orderUpdate: any;
}

type FieldType = {
  name: string;
  email: string;
  phone: string;
  address: string;
  note: string;
  status: string;
  paidStatus: boolean;
};

const AddOrEditOrderModal = (props: AddOrEditOrderModalProps) => {
  const { orderUpdate } = props;
  const [form] = Form.useForm();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    form.setFieldsValue({
      name: orderUpdate?.name || '',
      email: orderUpdate?.email || '',
      phone: orderUpdate?.phone || '',
      address: orderUpdate?.address || '',
      note: orderUpdate?.note || '',
      status: orderUpdate?.status || OrderStatus.pending,
      paidStatus: orderUpdate?.paidStatus || false,
    });
  }, [orderUpdate, form]);

  const onSubmit: FormProps<FieldType>['onFinish'] = async (values) => {
    try {
      setIsLoading(true);
      const formData = {
        ...values,
      };

      if (!!orderUpdate) {
        await Order.updateOrder(orderUpdate.id, formData);
      } else {
        await Order.createOrder({ ...formData, isManuallyOrder: true });
      }

      mutate('/order');

      message.success(
        orderUpdate
          ? 'Cập nhật đơn hàng thành công'
          : 'Thêm mới đơn hàng thành công',
      );
      props.onClose();
    } catch (error: any) {
      message.error(handleErrorsApi(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Drawer
      {...props}
      title={orderUpdate ? 'Cập nhật đơn hàng' : 'Thêm mới đơn hàng'}
    >
      <Form
        name="create-order-form"
        form={form}
        layout="vertical"
        onFinish={onSubmit}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="name"
              label="Tên khách hàng"
              rules={[
                { required: true, message: 'Vui lòng nhập tên khách hàng' },
              ]}
            >
              <Input placeholder="Nhập tên khách hàng" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="email" label="Email">
              <Input placeholder="Email" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="phone"
              label="Tên khách hàng"
              rules={[
                { required: true, message: 'Vui lòng nhập số điện thoại' },
              ]}
            >
              <Input placeholder="Nhập số điện thoại" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="address"
              label="Địa chỉ"
              rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}
            >
              <Input placeholder="Nhập địa chỉ" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="note"
          label="Nội dung đơn hàng"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập nội dung đơn hàng',
            },
          ]}
        >
          <TextArea placeholder="Nhập nội dung đơn hàng" rows={4} />
        </Form.Item>

        {!orderUpdate && (
          <>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Trạng thái đơn hàng"
                  name="status"
                  className="mb-6"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng chọn trạng thái đơn hàng!',
                    },
                  ]}
                  initialValue={orderUpdate?.status}
                >
                  <Select placeholder="Chọn trạng thái đơn hàng">
                    {Object.keys(OrderStatus).map((key) => (
                      <Select.Option key={key} value={key}>
                        {OrderStatus[key]}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item name="paidStatus" valuePropName="checked">
              <Checkbox>Đã thanh toán</Checkbox>
            </Form.Item>
          </>
        )}
        <div className="flex items-center justify-end mt-4">
          <Button
            loading={isLoading}
            type="primary"
            size="large"
            htmlType="submit"
            className="bg-[#1677ff]"
          >
            {isLoading ? 'Loading...' : !!orderUpdate ? 'Cập nhật' : 'Thêm mới'}
          </Button>
        </div>
      </Form>
    </Drawer>
  );
};

export default AddOrEditOrderModal;
