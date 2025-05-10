import React, { useEffect, useState } from 'react';
import type { FormProps } from 'antd';
import { Button, Form, Input, message, Space } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import Auth from '../../api/Auth';
import { useAuth } from '../../context/AuthContext';

type FieldType = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated, mutate } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const onSubmit: FormProps<FieldType>['onFinish'] = async (values) => {
    setIsLoading(true);
    try {
      const { data } = await Auth.login(values);
      await mutate({ user: data.user }, false);

      navigate('/');
    } catch (error: any) {
      message.error(error.response?.data.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="rounded-[8px] border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="w-full p-8">
        <Form name="login" layout="vertical" onFinish={onSubmit}>
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
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
          >
            <Input.Password size="large" />
          </Form.Item>

          <Form.Item className="mt-8 mb-0 text-right">
            <Space>
              <Link
                to="/register"
                type="text"
                className="mr-4 text-dark dark:text-white hover:underline"
              >
                Đăng ký tài khoản
              </Link>
            </Space>
            <Space>
              <Button
                loading={isLoading}
                type="primary"
                htmlType="submit"
                className="bg-[#1677ff] "
              >
                Đăng nhập
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
