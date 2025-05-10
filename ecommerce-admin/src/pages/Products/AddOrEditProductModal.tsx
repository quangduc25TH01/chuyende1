import { useCallback, useEffect, useState } from 'react';
import { mutate } from 'swr';
import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  message,
  Row,
  Select,
  Upload,
} from 'antd';
import type { CheckboxChangeEvent, FormProps, UploadFile } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import Drawer, { DrawerProps } from 'components/Drawer';
import Product from '../../api/Product';
import CustomEditor from './CustomEditor';
import handleErrorsApi from '../../utils/handleErrorsApi';

interface AddOrEditProductModalProps extends DrawerProps {
  productUpdate: any;
  categories: any[];
}

type FieldType = {
  name: string;
  slug: string;
  code: string;
  price: string;
  categoryId: string;
  information: string;
  description: string;
  isNew: boolean;
  isBestSeller: boolean;
  length: number;
  width: number;
  height: number;
};

const AddOrEditProductModal = (props: AddOrEditProductModalProps) => {
  const { productUpdate, categories } = props;
  const [form] = Form.useForm();

  const [filesList, setFilesList] = useState([] as UploadFile[]);
  const [isLoading, setIsLoading] = useState(false);
  const [informationValue, setInformationValue] = useState(
    productUpdate?.information || '',
  );
  const [descriptionValue, setDescriptionValue] = useState(
    productUpdate?.description || '',
  );

  const variantsProduct =
    (productUpdate &&
      productUpdate.variants &&
      productUpdate.variants.length &&
      productUpdate.variants[0]) ||
    {};

  useEffect(() => {
    form.setFieldsValue({
      name: productUpdate?.name || '',
      slug: productUpdate?.slug || '',
      code: productUpdate?.code || '',
      categoryId: productUpdate?.category?.id || null,
      information: productUpdate?.information || '',
      description: productUpdate?.description || '',
      isNew: productUpdate?.isNew || false,
      isBestSeller: productUpdate?.isBestSeller || false,
      width: variantsProduct.width || 0,
      length: variantsProduct.length || 0,
      height: variantsProduct.height || 0,
      price: variantsProduct.price || 0,
    });
  }, [productUpdate, form]);

  const handleChangeUpload = ({ file, fileList }: any) => {
    setFilesList(fileList);
    if (file.status === 'done') {
      message.success(`${file.name} uploaded successfully`);
    } else if (file.status === 'error') {
      message.error(`${file.name} upload failed.`);
    }
  };

  const handleEditorChange = useCallback(
    (field: 'information' | 'description', value: string) => {
      if (field === 'information') {
        setInformationValue(value);
      } else {
        setDescriptionValue(value);
      }
      form.setFieldsValue({ [field]: value });
      form.validateFields([field]);
    },
    [form, setInformationValue, setDescriptionValue],
  );

  const onSubmit: FormProps<FieldType>['onFinish'] = async (values) => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('slug', values.slug);
      formData.append('code', values.code);
      formData.append('categoryId', values.categoryId);
      formData.append('information', informationValue);
      formData.append('description', descriptionValue);
      formData.append('isNew', values.isNew.toString());
      formData.append('isBestSeller', values.isBestSeller.toString());

      if (values.price) {
        formData.append('price', values.price.toString());
      }

      if (filesList.length) {
        filesList.forEach((file: any) => {
          formData.append('files', file.originFileObj);
        });
      }

      if (!!productUpdate) {
        await Product.updateProduct(productUpdate.id, formData);
      } else {
        await Product.createProduct(formData);
      }
      mutate('/products');

      message.success(
        productUpdate
          ? 'Cập nhật sản phẩm thành công'
          : 'Thêm mới sản phẩm thành công',
      );
      props.onClose();
    } catch (error: any) {
      message.error(handleErrorsApi(error));
    } finally {
      setIsLoading(false);
    }
  };

  async function updateProductImageStatus(
    imageId: number,
    checked: boolean,
  ): Promise<void> {
    try {
      await Product.updateProductImage(imageId, { isRemoved: !checked });
      mutate('/products');
    } catch (error: any) {
      console.log('Error:', error);
      message.error(error?.message || 'Something went wrong');
    }
  }

  return (
    <Drawer
      {...props}
      title={productUpdate ? 'Cập nhật sản phẩm' : 'Thêm mới sản phẩm'}
    >
      <Form
        name="create-product-form"
        form={form}
        layout="vertical"
        onFinish={onSubmit}
      >
        <Form.Item
          name="name"
          label="Tên sản phẩm"
          rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm' }]}
        >
          <Input placeholder="Nhập tên sản phẩm" />
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="code"
              label="Mã sản phẩm"
              rules={[{ required: true, message: 'Vui lòng nhập mã sản phẩm' }]}
            >
              <Input placeholder="Nhập mã sản phẩm" />
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
              name="categoryId"
              className="mb-6"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng chọn danh mục!',
                },
              ]}
              initialValue={productUpdate?.category.id}
            >
              <Select placeholder="Chọn danh mục">
                {categories &&
                  categories
                    .filter((category) => !category.isRemoved)
                    .map((category) => (
                      <Select.Option key={category.id} value={category.id}>
                        {category.name}
                      </Select.Option>
                    ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="price" label="Giá">
              <InputNumber
                // addonAfter="/ hộp"
                className="w-full"
                type="number"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="isNew" valuePropName="checked">
              <Checkbox>Sản phẩm mới</Checkbox>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="isBestSeller" valuePropName="checked">
              <Checkbox>Sản phẩm bán chạy</Checkbox>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="information"
          label="Thông tin sản phẩm"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập thông tin sản phẩm',
            },
          ]}
        >
          <CustomEditor
            content={informationValue}
            setContent={(value) => handleEditorChange('information', value)}
          />
        </Form.Item>

        <Form.Item
          name="description"
          label="Thông tin chi tiết"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập thông tin chi tiết',
            },
          ]}
        >
          <CustomEditor
            content={descriptionValue}
            setContent={(value) => handleEditorChange('description', value)}
          />
        </Form.Item>

        <Upload
          listType="picture"
          multiple={true}
          fileList={filesList as any}
          onChange={handleChangeUpload}
          customRequest={({ onSuccess }: any) => {
            setTimeout(() => {
              onSuccess('ok');
            }, 1000);
          }}
          accept=".png,.jpg,.jpeg,.svg"
        >
          <Button type="default" icon={<UploadOutlined />}>
            Thêm mới hình ảnh
          </Button>
        </Upload>

        {!!productUpdate && productUpdate.images.length > 0 && (
          <div className="mt-4">
            <h3 className="text-base font-semibold">Hình ảnh sản phẩm:</h3>
            <div className="flex flex-wrap gap-4 mt-2">
              {productUpdate.images.map((image: any) => (
                <div
                  className="flex items-center flex-col gap-4 relative"
                  key={image.id}
                >
                  <img
                    src={image.imageUrl}
                    alt="icon"
                    className="w-30 h-30 rounded-[4px] object-cover border border-gray-200 shadow-md"
                  />
                  <Checkbox
                    className="absolute top-0 right-2"
                    defaultChecked={!image.isRemoved}
                    onChange={(e: CheckboxChangeEvent) => {
                      updateProductImageStatus(image.id, e.target.checked);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-end mt-4">
          <Button
            loading={isLoading}
            type="primary"
            size="large"
            htmlType="submit"
            className="bg-[#1677ff]"
            disabled={!filesList.length && !productUpdate}
          >
            {isLoading
              ? 'Loading...'
              : !!productUpdate
              ? 'Cập nhật'
              : 'Thêm mới'}
          </Button>
        </div>
      </Form>
    </Drawer>
  );
};

export default AddOrEditProductModal;
