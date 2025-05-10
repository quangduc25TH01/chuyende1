import { useCallback, useState } from 'react';
import { mutate } from 'swr';
import { Button, Form, Input, message, Upload } from 'antd';
import type { FormProps, UploadFile } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import Modal, { ModalProps } from 'components/Modals';
import Category from '../../api/Category';
import handleErrorsApi from '../../utils/handleErrorsApi';

interface AddOrEditCategoryModalProps extends ModalProps {
  categoryUpdate: any;
}

type FieldType = {
  name: string;
  slug: string;
};

const AddOrEditCategoryModal = (props: AddOrEditCategoryModalProps) => {
  const { categoryUpdate } = props;

  const [filesList, setFilesList] = useState({
    logo: categoryUpdate
      ? [
          {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: categoryUpdate.logoURL,
            thumbUrl: categoryUpdate.logoURL,
          },
        ]
      : ([] as UploadFile[]),
    image: categoryUpdate
      ? [
          {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: categoryUpdate.imageURL,
            thumbUrl: categoryUpdate.imageURL,
          },
        ]
      : ([] as UploadFile[]),
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChangeUploadFile = useCallback(
    ({ file }: any, isType: string) => {
      if (isType === 'image') {
        setFilesList((prev) => ({
          ...prev,
          image: file.status === 'removed' ? [] : [file],
        }));
      }

      if (isType === 'logo') {
        setFilesList((prev) => ({
          ...prev,
          logo: file.status === 'removed' ? [] : [file],
        }));
      }

      if (file.status === 'done') {
        message.success(`${file.name} uploaded successfully`);
      } else if (file.status === 'error') {
        message.error(`${file.name} upload failed.`);
      }
    },

    [filesList.logo, filesList.image],
  );

  const onSubmit: FormProps<FieldType>['onFinish'] = async (values) => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('slug', values.slug);

      if ((filesList.logo[0] as any).originFileObj) {
        formData.append('logo', (filesList.logo[0] as any).originFileObj);
      }
      if ((filesList.image[0] as any).originFileObj) {
        formData.append('image', (filesList.image[0] as any).originFileObj);
      }

      if (!!categoryUpdate) {
        await Category.updateCategory(categoryUpdate.id, formData);
      } else {
        await Category.createCategory(formData);
      }
      mutate('/categories');

      message.success(
        `${!!categoryUpdate ? 'Cập nhật' : 'Thêm mới'} thành công`,
      );
      props.onClose();
    } catch (error: any) {
      message.error(handleErrorsApi(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal {...props} title="Thêm mới danh mục">
      <>
        <Form
          name="register"
          layout="vertical"
          onFinish={onSubmit}
          initialValues={{
            name: !!categoryUpdate ? categoryUpdate.name : '',
            slug: !!categoryUpdate ? categoryUpdate.slug : '',
          }}
        >
          <Form.Item
            label="Tên danh mục"
            name="name"
            className="mb-4"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập tên danh mục!',
              },
            ]}
          >
            <Input size="large" placeholder="Tên danh mục" />
          </Form.Item>

          <Form.Item
            label="Slug"
            name="slug"
            className="mb-6"
            rules={[
              {
                required: true,
                pattern: /^[a-zA-Z0-9-_]+$/,
                message: 'Vui lòng nhập slug!',
              },
            ]}
          >
            <Input size="large" placeholder="Slug" />
          </Form.Item>

          <Upload
            listType="picture"
            multiple={false}
            fileList={filesList.logo as any}
            onChange={(file) => handleChangeUploadFile(file, 'logo')}
            customRequest={({ onSuccess }: any) => {
              setTimeout(() => {
                onSuccess('ok');
              }, 1000);
            }}
            accept=".png,.jpg,.jpeg,.svg"
          >
            <Button type="default" icon={<UploadOutlined />}>
              Thêm logo
            </Button>
          </Upload>

          <Upload
            listType="picture"
            multiple={false}
            fileList={filesList.image as any}
            onChange={(file) => handleChangeUploadFile(file, 'image')}
            customRequest={({ onSuccess }: any) => {
              setTimeout(() => {
                onSuccess('ok');
              }, 1000);
            }}
            accept=".png,.jpg,.jpeg,.svg"
          >
            <Button type="default" className=" mt-6" icon={<UploadOutlined />}>
              Thêm hình ảnh
            </Button>
          </Upload>

          <div className="flex items-center justify-end mt-4">
            <Button
              loading={isLoading}
              type="primary"
              htmlType="submit"
              className="bg-[#1677ff]"
              disabled={!filesList.logo.length || !filesList.image.length}
            >
              {isLoading
                ? 'Loading...'
                : !!categoryUpdate
                ? 'Cập nhật'
                : 'Thêm mới'}
            </Button>
          </div>
        </Form>
      </>
    </Modal>
  );
};

export default AddOrEditCategoryModal;
