import { useEffect, useState } from 'react';
import { Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import useSWR, { mutate } from 'swr';
import { useNavigate } from 'react-router-dom';

import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DynamicTable from '../../components/Tables';
import { ColumnsConfigs } from './columnConfigs';
import AddOrEditArticlesModal from './AddOrEditArticlesModal';
import axios from '../../api/axios';
import PreviewArticles from './PreviewArticles';
import handleErrorsApi from '../../utils/handleErrorsApi';
import Article from '../../api/Article';

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const ArticlesPage = () => {
  const [isAddOrEditArticlesModalOpen, setIsAddOrEditArticlesModalOpen] =
    useState(false);
  const [articleUpdate, setArticleUpdate] = useState(null);
  const [previewArticlesData, setPreviewArticlesData] = useState(null);

  const navigate = useNavigate();

  const {
    data: articles,
    error,
    isLoading,
  } = useSWR('/articles', fetcher, {
    revalidateOnFocus: false,
  });

  useEffect(() => {
    if (error) {
      navigate('/login');
      return;
    }
  }, [error]);

  const handleEdit = (record: any) => {
    setIsAddOrEditArticlesModalOpen(true);
    setArticleUpdate(record);
  };

  const handlePublish = async (recordId: any, data: any) => {
    try {
      await Article.updateArticles(recordId, data);

      mutate('/articles');

      message.success('Cập nhật thành công');
    } catch (error: any) {
      console.log('Error:', error);
      message.error(handleErrorsApi(error));
    }
  };

  const handleDelete = async (recordId: any, checked: boolean) => {
    try {
      await Article.deleteArticles(recordId, {
        isRemoved: checked,
      });

      mutate('/articles');

      message.success('Cập nhật thành công');
    } catch (error: any) {
      console.log('Error:', error);
      message.error(handleErrorsApi(error));
    }
  };

  const handleView = (record: any) => {
    setPreviewArticlesData(record);
  };

  const columns = ColumnsConfigs({
    data: articles || [],
    onView: handleView,
    onEdit: handleEdit,
    onPublish: handlePublish,
    onDelete: handleDelete,
  });

  return (
    <>
      <Breadcrumb
        pageName="Tin tức"
        pageTitle={`Tin tức (${articles?.length || 0})`}
      />

      <div className="flex flex-col gap-10">
        <DynamicTable
          data={articles || []}
          loading={isLoading}
          columns={columns}
          headerTable={() => (
            <div className="w-full flex items-center justify-end">
              <Button
                type="primary"
                className="bg-[#1677ff] ml-auto"
                icon={<PlusOutlined color="#FFFFFF" />}
                onClick={() => (
                  setIsAddOrEditArticlesModalOpen(true), setArticleUpdate(null)
                )}
              >
                Thêm tin tức
              </Button>
            </div>
          )}
        />
      </div>

      {isAddOrEditArticlesModalOpen && (
        <AddOrEditArticlesModal
          isOpen={isAddOrEditArticlesModalOpen}
          onClose={() => setIsAddOrEditArticlesModalOpen(false)}
          articleUpdate={articleUpdate}
        />
      )}

      {!!previewArticlesData && (
        <PreviewArticles
          isOpen={!!previewArticlesData}
          onClose={() => setPreviewArticlesData(null)}
          article={previewArticlesData}
        />
      )}
    </>
  );
};

export default ArticlesPage;
