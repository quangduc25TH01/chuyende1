import React, { useEffect } from 'react';
import useSWR, { mutate } from 'swr';
import { useNavigate } from 'react-router-dom';
import { Layout, Menu, message, Modal, theme } from 'antd';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import axios from '../../api/axios';
import Upload, { PhotoOptions } from '../../api/Upload';
import handleErrorsApi from '../../utils/handleErrorsApi';

const { Content, Sider } = Layout;

const options = Object.entries(PhotoOptions).map(([key, value]) => ({
  key,
  label: value,
}));

const fetcherPhotos = (url: string) => axios.get(url).then((res) => res.data);

const UploadPage = () => {
  const [optionSelected, setOptionSelected] = React.useState(
    Object.keys(PhotoOptions)[0],
  );
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();

  const {
    data: photos,
    error,
    isLoading,
  } = useSWR(`/photos?type=${optionSelected}`, fetcherPhotos, {
    revalidateOnFocus: false,
  });

  useEffect(() => {
    if (error) {
      navigate('/login');
    }
  }, [error]);

  async function onDeleteImage(id: number) {
    try {
      await Upload.deleteImage(id);
      mutate(`/photos?type=${optionSelected}`);
    } catch (error) {
      console.log(error);
      message.error(handleErrorsApi(error));
    }
  }

  return (
    <>
      <Breadcrumb pageName="Hình ảnh" pageTitle="Upload hình ảnh" />

      <div>
        <Layout
          style={{
            padding: '24px 0',
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Sider style={{ background: colorBgContainer }} width={200}>
            <Menu
              mode="inline"
              defaultSelectedKeys={[optionSelected]}
              style={{ height: '100%' }}
              items={options}
              onSelect={(e) => setOptionSelected(e.key)}
            />
          </Sider>
          <Content style={{ padding: '0 24px', minHeight: 280 }}>
            {isLoading ? (
              <p className="text-center">Loading...</p>
            ) : photos.length === 0 ? (
              <p className="text-center">Không có hình ảnh nào</p>
            ) : (
              <div>
                <div className="flex flex-wrap justify-start gap-4">
                  {photos.map((photo: any) => (
                    <div key={photo.id} className="relative group">
                      <img
                        src={photo.url}
                        alt={photo.name}
                        className="w-32 h-32 object-cover border-2 border-gray-300 rounded-lg"
                      />
                      <button
                        className="absolute top-0 right-0 m-2 p-2 bg-red-500 text-white rounded-full hidden group-hover:block"
                        onClick={() => {
                          Modal.confirm({
                            title: 'Xác nhận xóa hình ảnh',
                            content:
                              'Bạn có chắc chắn muốn xóa hình ảnh này không?',
                            onOk() {
                              onDeleteImage(photo.id);
                            },
                            okType: 'dashed',
                            onCancel() {},
                          });
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Content>
        </Layout>
      </div>
    </>
  );
};

export default UploadPage;
