import { useEffect, useState } from 'react';
import { mutate } from 'swr';
import { Button, Form, message, Input, Rate } from 'antd';
import type { FormProps } from 'antd';

import Modal, { ModalProps } from 'components/Modals';
import ReviewProduct from '../../api/ReviewProduct';
const { TextArea } = Input;

interface UpdateReviewModalProps extends ModalProps {
  reviewUpdate: any;
}

type FieldType = {
  comment: string;
  rating: number;
};

const UpdateReviewModal = (props: UpdateReviewModalProps) => {
  const { reviewUpdate } = props;
  const [form] = Form.useForm();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    form.setFieldsValue({
      comment: reviewUpdate?.comment || '',
      rating: reviewUpdate?.rating || 5,
    });
  }, [reviewUpdate, form]);

  const onSubmit: FormProps<FieldType>['onFinish'] = async (values) => {
    try {
      setIsLoading(true);
      await ReviewProduct.updateReviewProduct(reviewUpdate.id, {
        ...values,
      });

      mutate('/review');
      message.success(`Cập nhật thành công`);
      props.onClose();
    } catch (error: any) {
      console.log('Error:', error);
      message.error(error?.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal {...props} title="Cập nhật đánh giá">
      <>
        <Form
          name="update-comment"
          layout="vertical"
          onFinish={onSubmit}
          form={form}
        >
          <Form.Item
            label="Bình luận:"
            name="comment"
            className="mb-4"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập comment!',
              },
            ]}
          >
            <TextArea size="large" placeholder="Comment..." />
          </Form.Item>

          <Form.Item label="Đánh giá:" name="rating" className="mb-4">
            <Rate />
          </Form.Item>

          <div className="flex items-center justify-end mt-4">
            <Button
              loading={isLoading}
              type="primary"
              htmlType="submit"
              className="bg-[#1677ff]"
            >
              {isLoading ? 'Loading...' : 'Cập nhật'}
            </Button>
          </div>
        </Form>
      </>
    </Modal>
  );
};

export default UpdateReviewModal;
