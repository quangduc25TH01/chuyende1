import Link from "next/link";
import Image from "next/image";

import "./styles.scss";
import AddToCartButton from "../AddToCartButton";
import { IProduct } from "@/config/entities";

interface ProductProps {
  product: IProduct;
  className?: string;
}

const Product = (props: ProductProps) => {
  const { product, className } = props;

  return (
    <div
      className={`${
        className && className
      } relative flex flex-col items-center border rounded-[8px] border-[#BAC9D9]
        hover:shadow-product-item product cursor-pointer overflow-hidden`}
    >
      <Link
        href={`/${product?.category?.slug}/${product.slug}`}
        className="rounded-tl-lg rounded-tr-lg"
      >
        <Image
          src={(product?.images && product?.images[0].imageUrl) || ""}
          alt="product"
          width="350"
          height="350"
          className="rounded-tl-[5px] rounded-tr-[5px] h-auto"
        />
      </Link>
      <div className="px-2 sm:py-4 py-2 z-1 bg-white w-full text-center rounded-bl-lg rounded-br-lg">
        <Link
          href={`/${product?.category?.slug}/${product.slug}`}
          className="text-main hover:text-blue-2 font-medium lg:text-[15px] text-[14px]"
        >
          <p className="line-clamp-2 lg:min-h-[48px] min-h-[40px]">
            {product.name}
          </p>
        </Link>

        <div className="flex items-center justify-evenly mt-2">
          <p className="lg:text-[16px] text-[14px] text-red-1 text-center font-medium">
            {product?.price?.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </p>
        </div>
      </div>

      <div className="absolute lg:bottom-[18px] lg:right-[18px] bottom-[12px] right-[12px] add-cart-button">
        <AddToCartButton product={product} />
      </div>
    </div>
  );
};

export default Product;
