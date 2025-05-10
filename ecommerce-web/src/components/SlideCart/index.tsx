"use client";

import Link from "next/link";
import Image from "next/image";
import { TfiClose } from "react-icons/tfi";
import { BsCartX } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import { ACTION_TYPES, useCart } from "@/context/CartContext";
import "./styles.scss";

interface ISlideCart {
  isOpenCart: boolean;
  handleOpenCart: (isOpen: boolean) => void;
}

const ProductItem = ({ product }: any) => {
  console.log(product);
  const { dispatch } = useCart();

  const removeProductFromCart = (productId: number) => {
    dispatch({ type: ACTION_TYPES.REMOVE_PRODUCT, payload: productId });
  };

  const updateQuantityProductFromCart = (
    productId: number,
    quantity: number
  ) => {
    dispatch({
      type: ACTION_TYPES.UPDATE_QUANTITY,
      payload: {
        id: productId,
        quantity: quantity,
      },
    });
  };

  return (
    <div
      className="border-b border-[rgba(0, 0, 0, 0.105)] sm:px-[20px] px-[12px]
      sm:py-[17px] py-[10px] hover:bg-[#f7f7f7] cursor-pointer last:border-none sm:text-base text-sm"
    >
      <div className="flex items-start">
        <Image
          src="/images/products/product-image.jpg"
          alt="img"
          width={70}
          height={70}
          className="w-[70px] h-[70px] bg-[#ededed] rounded-[8px]"
        />
        <div className="flex-1 ml-[15px]">
          <p className="text-[15px] font-medium mb-1">{product.name}</p>
        </div>
        <TfiClose
          size={18}
          className="cursor-pointer hover:text-red-1 ml-3 mt-1"
          onClick={() => removeProductFromCart(product.id)}
        />
      </div>
      <div className="flex items-center gap-5">
        <p className="md:text-[15px] text-[14px] font-medium">Số lượng:</p>
        <div className="flex items-center my-2">
          <div className="flex items-center rounded-[4px]">
            <input
              type="button"
              className="w-[30px] text-center focus:outline-none h-[35px] font-bold bg-[#f9f9f9] border border-[#ddd] cursor-pointer rounded-l-[20px] hover:bg-[#f1f1f1] border-r-0"
              value="-"
              onClick={() => {
                if (product.quantity > 1) {
                  updateQuantityProductFromCart(
                    product.id,
                    product.quantity - 1
                  );
                }
              }}
            />
            <input
              type="number"
              min={1}
              max={9999}
              value={product.quantity}
              className="w-[60px] px-1.5 text-center h-[35px] focus:outline-none appearance-none hover:appearance-none bg-white border border-[#ddd] shadow-input"
              onChange={(e) => {
                const value = Number(e.target.value);
                updateQuantityProductFromCart(product.id, value);
              }}
            />

            <input
              type="button"
              className="w-[30px] text-center focus:outline-none h-[35px] font-bold bg-[#f9f9f9] border border-[#ddd] cursor-pointer rounded-r-[20px] hover:bg-[#f1f1f1] border-l-0"
              value="+"
              onClick={() => {
                updateQuantityProductFromCart(product.id, product.quantity + 1);
              }}
            />
          </div>
        </div>
      </div>
      <div className="flex gap-5">
        <p className="md:text-[15px] text-[14px] font-medium mb-1">
          Tổng tiền:
        </p>
        <p className="text-[15px] font-bold text-red-1 md:text-[16px]">
          {(product.price * product.quantity).toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
        </p>
      </div>
    </div>
  );
};

const SlideCart = (props: ISlideCart) => {
  const { isOpenCart, handleOpenCart } = props;
  const { cart } = useCart();

  const openClass = isOpenCart ? "open" : "";

  return (
    <div>
      <div className={`cart-widget-side ${openClass}`}>
        <div className="flex items-center justify-between border-b border-b-[rgba(0, 0, 0, 0.105)] px-[20px] py-[17px]">
          <span className="font-bold text-[18px]">Giỏ hàng</span>
          <TfiClose
            size={20}
            className="cursor-pointer"
            onClick={() => {
              handleOpenCart(false);
            }}
          />
        </div>

        {cart.length > 0 ? (
          <>
            <div className="max-h-[calc(100%_-_280px)] overflow-y-auto mt-4">
              {cart.map((product) => (
                <ProductItem key={product.id} product={product} />
              ))}
            </div>

            <div className="absolute bottom-0 w-full">
              <div className="flex items-center justify-between px-[20px] py-[17px] border-t border-[rgba(0, 0, 0, 0.105)]">
                <p className="text-[15px]">Tổng cộng:</p>
                <p className="font-medium md:text-[18px] text-base">
                  {cart.length} sản phẩm
                </p>
              </div>
              <div className="px-5 mb-6">
                <Link href="/thanh-toan" passHref>
                  <Button
                    variant="outline"
                    className="flex w-full rounded-[20px] mb-4"
                    onClick={() => {
                      handleOpenCart(false);
                    }}
                  >
                    Liên hệ đặt hàng
                  </Button>
                </Link>

                <Link href="/gio-hang" passHref>
                  <Button
                    variant="by_now"
                    className="flex w-full rounded-[20px]"
                    onClick={() => {
                      handleOpenCart(false);
                    }}
                  >
                    Xem giỏ hàng
                  </Button>
                </Link>
              </div>
            </div>
          </>
        ) : (
          <div>
            <BsCartX size={100} className="mx-auto mt-10 text-[#ededed]" />
            <p className="text-center mt-6 text-[14px]">
              Chưa có sản phẩm nào trong giỏ hàng.
            </p>

            <Link href="/cua-hang" passHref>
              <Button
                variant="outline"
                className="mx-auto flex items-center mt-6 bg-main text-white"
                onClick={() => {
                  handleOpenCart(false);
                }}
              >
                Quay lại cửa hàng
              </Button>
            </Link>
          </div>
        )}
      </div>
      <div
        className={`overlay ${openClass}`}
        onClick={() => {
          handleOpenCart(false);
        }}
      />
    </div>
  );
};

export default SlideCart;
