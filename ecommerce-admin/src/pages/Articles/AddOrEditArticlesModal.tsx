import { useCallback, useEffect, useState } from 'react';
import { mutate } from 'swr';
import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  message,
  Row,
  Select,
  Upload,
} from 'antd';
import type { FormProps, UploadFile } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import Drawer, { DrawerProps } from 'components/Drawer';
import CustomEditor from './CustomEditor';
import handleErrorsApi from '../../utils/handleErrorsApi';
import Article from '../../api/Article';
import { ArticleCategoryOptions } from './columnConfigs';

interface AddOrEditArticlesModalProps extends DrawerProps {
  articleUpdate: any;
}

type FieldType = {
  title: string;
  category: string;
  slug: string;
  thumbnail: string;
  content: string;
  isPublished: boolean;
};

const AddOrEditArticlesModal = (props: AddOrEditArticlesModalProps) => {
  const { articleUpdate } = props;
  const [form] = Form.useForm();

  const [filesList, setFilesList] = useState(
    articleUpdate
      ? [
          {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: articleUpdate.thumbnail,
            thumbUrl: articleUpdate.thumbnail,
          },
        ]
      : ([] as UploadFile[]),
  );

  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState(articleUpdate?.content || '');

  useEffect(() => {
    form.setFieldsValue({
      title: articleUpdate?.title || '',
      slug: articleUpdate?.slug || '',
      category: articleUpdate?.category || 'product',
      thumbnail: articleUpdate?.thumbnail || '',
      content: articleUpdate?.content || '',
      isPublished: articleUpdate?.isPublished || false,
    });
  }, [articleUpdate, form]);

  const handleChangeUploadFile = useCallback(
    ({ file }: any) => {
      setFilesList(() => {
        if (file.status === 'removed') {
          return [];
        }
        return [file];
      });

      if (file.status === 'done') {
        message.success(`${file.name} uploaded successfully`);
      } else if (file.status === 'error') {
        message.error(`${file.name} upload failed.`);
      }
    },

    [filesList, setFilesList],
  );

  const handleEditorChange = useCallback(
    (value: string) => {
      setContent(value);

      const field = 'content';
      form.setFieldsValue({ [field]: value });
      form.validateFields([field]);
    },

    [form, setContent],
  );

  const onSubmit: FormProps<FieldType>['onFinish'] = async (values) => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('slug', values.slug);
      formData.append('category', values.category);
      formData.append('content', values.content);
      formData.append('isPublished', values.isPublished.toString());

      if ((filesList[0] as any).originFileObj) {
        formData.append('file', (filesList[0] as any).originFileObj);
      }

      if (!!articleUpdate) {
        await Article.updateArticles(articleUpdate.id, formData);
      } else {
        await Article.createArticles(formData);
      }
      mutate('/articles');

      message.success(
        articleUpdate
          ? 'Cập nhật tin tức thành công'
          : 'Thêm mới tin tức thành công',
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
      title={articleUpdate ? 'Cập nhật tin tức' : 'Thêm mới tin tức'}
    >
      <Form
        name="create-product-form"
        form={form}
        layout="vertical"
        onFinish={onSubmit}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="title"
              label="Tiêu đề"
              rules={[{ required: true, message: 'Vui lòng nhập tiêu đề' }]}
            >
              <Input placeholder="Nhập tiêu đề" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="slug"
              label="Slug"
              rules={[
                {
                  required: true,
                  pattern: /^[a-zA-Z0-9-_]+$/,
                  message: 'Vui lòng nhập slug',
                },
              ]}
            >
              <Input placeholder="Nhập slug" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Chọn danh mục"
              name="category"
              className="mb-6"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng chọn danh mục!',
                },
              ]}
              initialValue={articleUpdate?.category}
            >
              <Select placeholder="Chọn danh mục">
                {Object.keys(ArticleCategoryOptions).map((key) => (
                  <Select.Option key={key} value={key}>
                    {ArticleCategoryOptions[key]}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="isPublished"
              valuePropName="checked"
              label="Hiện thị"
              initialValue={articleUpdate?.isPublished}
            >
              <Checkbox>Hiện thị</Checkbox>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="content"
          label="Nội dung"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập nội dung',
            },
          ]}
        >
          <CustomEditor
            content={content}
            setContent={(value) => handleEditorChange(value)}
          />
        </Form.Item>

        <Upload
          listType="picture"
          multiple={false}
          fileList={filesList as any}
          onChange={(file) => handleChangeUploadFile(file)}
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
            size="large"
            htmlType="submit"
            className="bg-[#1677ff]"
            disabled={!filesList.length && !articleUpdate}
          >
            {isLoading
              ? 'Loading...'
              : !!articleUpdate
              ? 'Cập nhật'
              : 'Thêm mới'}
          </Button>
        </div>
      </Form>
    </Drawer>
  );
};

export default AddOrEditArticlesModal;
