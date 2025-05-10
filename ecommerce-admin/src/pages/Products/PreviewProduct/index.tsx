import Drawer, { DrawerProps } from 'components/Drawer';
import { PreviewProductStyled } from './styles';

interface PreviewProductProps extends DrawerProps {
  product: any;
}

const PreviewProduct = (props: PreviewProductProps) => {
  const { product } = props;

  const imagesUsed =
    (product.images && product.images.filter((img: any) => !img.isRemoved)) ||
    [];

  return (
    <Drawer {...props} title="Xem chi tiết sản phẩm">
      <PreviewProductStyled>
        {!!imagesUsed.length && (
          <>
            <p className="text-base font-semibold mb-2">Hình ảnh sản phẩm:</p>

            <div className="flex items-center gap-4 flex-wrap">
              {imagesUsed.map((img: any) => (
                <img
                  key={img.id}
                  src={img.imageUrl}
                  className="object-cover w-[160px] h-[100px] rounded-[8px] border-1 border-gray-200 p-2 shadow-md"
                />
              ))}
            </div>
          </>
        )}
        <p className="text-base my-4">
          Mã sản phẩm: <span className="font-bold">{product.code}</span>
        </p>
        <p className="text-base mb-3">
          Danh mục: <span className="font-bold">{product.category.name}</span>
        </p>
        <p className="text-xl font-semibold mb-3">{product.name}</p>
        <p className="text-base mb-3">
          Giá:{' '}
          <span className="font-bold text-red-500">
            {product.price.toLocaleString('vi-VN', {
              style: 'currency',
              currency: 'VND',
            })}
          </span>
        </p>
        <div className="text-xl font-bold mb-3 underline">Mô tả ngắn:</div>
        <p
          className="text-base"
          dangerouslySetInnerHTML={{ __html: product.information }}
        />
        <div className="text-xl mt-4 font-bold mb-3 underline">
          Thông tin chi tiết:
        </div>
        <p
          className="text-base"
          dangerouslySetInnerHTML={{ __html: product.description }}
        />
      </PreviewProductStyled>
    </Drawer>
  );
};

export default PreviewProduct;
