import { FaSquareCheck } from "react-icons/fa6";
import Link from "next/link";

import ImageProduct from "./ImageProduct";
import DescriptionTabs from "./DescriptionTabs";
import RelatedProducts from "./RelatedProducts";
import "./styles.scss";
import AddToCart from "../../components/AddToCartButton";
import { IProduct } from "@/config/entities";
import { information } from "@/config/data/information";

const ProductDetail = ({ product }: { product: IProduct }) => {
  return (
    <>
      <div className="mt-[35px] mb-4">
        <div className="flex items-start xl:flex-row flex-col">
          <div className="xl:w-1/2 w-full">
            <ImageProduct images={product.images} />
          </div>
          <div className="xl:w-1/2 xl:pl-10 w-full pl-0 xl:mt-0 mt-8">
            <p className="mb-2 flex items-center gap-2">
              <FaSquareCheck className="text-green-4" size={20} />
              Danh mục:{" "}
              <Link
                href={`/${product.category?.slug}`}
                className="font-medium hover:underline"
              >
                {product.category?.name}
              </Link>
            </p>

            <div className="mb-2 text-main text-[20px] font-bold">
              {product.name}
            </div>

            <p className="mb-2">
              Mã sản phẩm: <span className="font-semibold">{product.code}</span>
            </p>

            <div className="bg-[#eaeaea] rounded-[4px] px-3 py-2 flex items-center justify-between text-[15px]">
              <span className="text-red-1 font-bold text-[20px] sm:text-[24px]">
                {product.price.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </span>
              <AddToCart product={product} text="Thêm vào giỏ" />
            </div>

            <div className="text-green-4 font-medium text-[18px] my-3">
              Hỗ trợ tư vấn - nhận giá sỉ:{" "}
              <a
                href={`tel:${information.phones[0]}`}
                className="underline font-bold ml-3"
              >
                {information.phones[0]}
              </a>
            </div>

            <div
              className="mt-4 content-detail-product editor-content"
              dangerouslySetInnerHTML={{ __html: product.information }}
            />
          </div>
        </div>
        <DescriptionTabs product={product} />
        <RelatedProducts
          categoryId={product.category.id}
          currentProductId={product.id}
        />
      </div>
    </>
  );
};

export default ProductDetail;
