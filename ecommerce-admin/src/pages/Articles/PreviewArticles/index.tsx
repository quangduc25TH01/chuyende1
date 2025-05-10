import Drawer, { DrawerProps } from 'components/Drawer';
import { PreviewProductStyled } from './styles';

interface PreviewProductProps extends DrawerProps {
  article: any;
}

const PreviewProduct = (props: PreviewProductProps) => {
  const { article } = props;

  return (
    <Drawer {...props} title="Xem chi tiết tin tức">
      <PreviewProductStyled>
        {!!article.thumbnail && (
          <>
            <p className="text-base font-semibold mb-2">Hình ảnh:</p>

            <div className="flex items-center gap-4 flex-wrap">
              <img
                src={article.thumbnail}
                className="object-cover w-[160px] h-[100px] rounded-[8px] border-1 border-gray-200  shadow-md"
              />
            </div>
          </>
        )}
        <p className="text-base my-4">
          Tiêu đề: <span className="font-bold">{article.title}</span>
        </p>
        <p className="text-base mb-3">
          Danh mục: <span className="font-bold">{article.category}</span>
        </p>
        <div className="text-base">Nội dung:</div>
        <p
          className="text-sm"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </PreviewProductStyled>
    </Drawer>
  );
};

export default PreviewProduct;
