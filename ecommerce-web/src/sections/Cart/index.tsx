"use client";

import { useEffect, useState } from "react";
import { TfiClose } from "react-icons/tfi";
import Image from "next/image";
import { RxUpdate } from "react-icons/rx";
import Link from "next/link";
import { BiArrowBack } from "react-icons/bi";

import { Button } from "@/components/ui/button";
import { useCart, ACTION_TYPES } from "@/context/CartContext";

const CartSection = () => {
  const { cart, dispatch } = useCart();

  const [cartDefaults, setCartDefaults] = useState(cart);
  const [isUpdatingCart, setIsUpdatingCart] = useState(false);

  useEffect(() => {
    setCartDefaults(cart);
  }, [cart]);

  const removeProduct = (productId: number) => {
    const newCartDefaults = cartDefaults.filter(
      (product) => product.id !== productId
    );

    setCartDefaults(newCartDefaults);
  };

  const updateQuantity = (productId: number, quantity: number) => {
    const newCartDefaults = cartDefaults.map((product) =>
      product.id === productId ? { ...product, quantity } : product
    );

    setCartDefaults(newCartDefaults);
  };

  const updateCart = () => {
    setIsUpdatingCart(true);
    setTimeout(() => {
      dispatch({ type: ACTION_TYPES.UPDATE_CART, payload: cartDefaults });

      setIsUpdatingCart(false);
    }, 1000);
  };

  return (
    <section>
      {cart.length === 0 ? (
        <div className="flex items-center flex-col gap-8 justify-center mt-8">
          <Image
            src="/images/common/no-cart-item.webp"
            alt="no-item"
            width={400}
            height={300}
          />
          <p className="text-base italic">
            Chưa có sản phẩm nào trong giỏ hàng.
          </p>

          <Link href="/cua-hang" passHref>
            <Button variant="outline">
              <BiArrowBack className="mr-2" size={18} />
              Quay lại cửa hàng
            </Button>
          </Link>
        </div>
      ) : (
        <>
          <div className="text-2xl font-bold mb-4">Giỏ Hàng</div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse md:text-base text-sm min-w-[640px]">
              <thead>
                <tr>
                  <th className="p-2 border-b-[3px]">Mã SP</th>
                  <th className="p-2 border-b-[3px]">Sản phẩm</th>
                  <th className="p-2 border-b-[3px]">Số lượng</th>
                  <th className="p-2 border-b-[3px]">Tổng tiền</th>
                  <th className="p-2 border-b-[3px]"></th>
                </tr>
              </thead>

              <tbody>
                {cartDefaults.map((item) => (
                  <tr key={item.id}>
                    <td className="px-2 py-4 border-b text-center">
                      <span className="font-medium">{item.code}</span>
                    </td>

                    <td className="px-2 py-4 border-b">
                      <div className="flex items-center justify-center">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="rounded-md"
                        />
                        <span className="ml-4 font-medium max-w-[200px]">
                          {item.name}
                        </span>
                      </div>
                    </td>

                    <td className="px-2 py-4 border-b text-center">
                      <div className="flex items-center my-2 justify-center">
                        <div className="flex items-center rounded-[4px]">
                          <input
                            type="button"
                            className="w-[30px] text-center focus:outline-none h-[35px] font-bold bg-[#f9f9f9] border border-[#ddd] cursor-pointer rounded-l-[20px] hover:bg-[#f1f1f1] border-r-0"
                            value="-"
                            onClick={() => {
                              if (item.quantity > 1) {
                                updateQuantity(item.id, item.quantity - 1);
                              }
                            }}
                          />
                          <input
                            type="number"
                            min={1}
                            max={9999}
                            value={item.quantity}
                            className="w-[60px] px-1.5 text-center h-[35px] focus:outline-none appearance-none hover:appearance-none bg-white border border-[#ddd] shadow-input"
                            onChange={(e) => {
                              const value = Number(e.target.value);
                              updateQuantity(item.id, value);
                            }}
                          />

                          <input
                            type="button"
                            className="w-[30px] text-center focus:outline-none h-[35px] font-bold bg-[#f9f9f9] border border-[#ddd] cursor-pointer rounded-r-[20px] hover:bg-[#f1f1f1] border-l-0"
                            value="+"
                            onClick={() => {
                              updateQuantity(item.id, item.quantity + 1);
                            }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-2 py-4 border-b text-center">
                      <p className="text-[16px] font-bold text-red-1">
                        {(item.price * item.quantity).toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </p>
                    </td>
                    <td className="px-2 py-4 border-b text-center">
                      <TfiClose
                        size={20}
                        className="text-[#999] hover:text-red-1 mx-4 cursor-pointer"
                        onClick={() => removeProduct(item.id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between mt-6 sm:flex-row flex-col">
            <Button
              variant="outline"
              className="flex rounded-[20px] sm:mb-0 mb-4"
              onClick={() => updateCart()}
            >
              <RxUpdate
                className={`mr-2 ${isUpdatingCart ? "animate-spin" : ""}`}
              />
              <span className={isUpdatingCart ? "animate-pulse" : ""}>
                Cập nhật giỏ hàng
              </span>
            </Button>
            <div className="flex items-center gap-8">
              <p className="md::text-[18px] text-base font-semibold">
                Tổng: {cartDefaults.length || 0} sản phẩm
              </p>
              <Link href="/thanh-toan" passHref>
                <Button
                  variant="by_now"
                  className="flex ml-auto rounded-[20px] sm:px-8 bg-[#e74c3c] hover:bg-[#d26e4b] text-white"
                >
                  Liên hệ đặt hàng
                </Button>
              </Link>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default CartSection;
