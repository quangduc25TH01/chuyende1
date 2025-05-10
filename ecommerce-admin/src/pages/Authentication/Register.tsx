import React, { useState } from 'react';
import type { FormProps } from 'antd';
import { Button, Form, Input, message, Space } from 'antd';
import { MailOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import Auth from '../../api/Auth';
import { useAuth } from '../../context/AuthContext';

type FieldType = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  const onSubmit: FormProps<FieldType>['onFinish'] = async (values) => {
    setIsLoading(true);
    try {
      await Auth.register({
        name: values.name,
        email: values.email,
        password: values.password,
      });

      if (isAuthenticated) {
        navigate('/');
      } else {
        navigate('/login');
      }
    } catch (error: any) {
      message.error(error.response?.data.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="rounded-[8px] border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="w-full p-8">
        <Form name="register" layout="vertical" onFinish={onSubmit}>
          <Form.Item
            label="Họ và tên"
            name="name"
            className="mb-2"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập họ và tên!',
              },
            ]}
          >
            <Input
              size="large"
              prefix={<UserOutlined className="ml-[11px]" />}
              className="flex-row-reverse"
            />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            className="mb-2"
            rules={[
              {
                required: true,
                type: 'email',
                message: 'Vui lòng nhập email!',
              },
            ]}
          >
            <Input
              size="large"
              prefix={<MailOutlined className="ml-[11px]" />}
              className="flex-row-reverse"
            />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            className="mb-2"
            rules={[
              { required: true, message: 'Vui lòng nhập mật khẩu!' },
              ({}) => ({
                validator(_, value) {
                  const regex =
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).{8,}$/;
                  if (value && !regex.test(value)) {
                    return Promise.reject(
                      new Error(
                        'Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ thường, chữ hoa, số và ký tự đặc biệt!',
                      ),
                    );
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <Input.Password size="large" />
          </Form.Item>

          <Form.Item
            label="Nhập lại mật khẩu"
            name="confirmPassword"
            className="mb-2"
            rules={[
              { required: true, message: 'Vui lòng nhập xác nhập mật khẩu!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Mật khẩu không khớp!'));
                },
              }),
            ]}
          >
            <Input.Password size="large" />
          </Form.Item>

          <Form.Item className="mt-6 mb-0 text-right">
            <Space>
              <Button
                loading={isLoading}
                type="primary"
                htmlType="submit"
                className="bg-[#1677ff] "
              >
                Đăng ký
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Register;
