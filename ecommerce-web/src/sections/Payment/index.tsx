"use client";

import { useState } from "react";
import Image from "next/image";
import { Input, TextArea } from "@/components/ui/Input";
import { Button } from "@/components/ui/button";
import OrderSuccessModal from "./OrderSuccessModal";
import ButtonLoading from "@/components/Loading/ButtonLoading";
import { useCart } from "@/context/CartContext";
import OrderProduct from "@/api/OrderProduct";

const PaymentSection = () => {
  const [orders, setOrders] = useState(null);
  const [ordering, setOrdering] = useState(false);
  const { cart } = useCart();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setOrdering(true);
      const formData = new FormData(e.currentTarget);
      const informationOrder = Object.fromEntries(formData.entries());
      const { data } = await OrderProduct.createOrder({
        ...informationOrder,
        orderItems: cart.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
      });

      const orderIds =
        typeof window !== "undefined"
          ? JSON.parse(localStorage.getItem("orderIds") || "[]")
          : [];

      if (typeof window !== "undefined") {
        localStorage.setItem(
          "orderIds",
          JSON.stringify([...orderIds, data.orderId])
        );
      }

      setOrders(data);
    } catch (error) {
      console.error("Error ordering:", error);
    } finally {
      setOrdering(false);
    }
  };

  return (
    <>
      <section>
        <div className="flex items-start md:flex-row flex-col-reverse md:gap-8 gap-4">
          <div className="md:w-1/2 w-full">
            <div className="text-xl font-bold mb-4 text-main">
              Thông tin đặt hàng
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Họ và tên <span className="text-red-1">*</span>
                </label>
                <Input type="text" required id="name" name="name" />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Địa chỉ <span className="text-red-1">*</span>
                </label>
                <TextArea
                  id="address"
                  name="address"
                  required
                  rows={3}
                ></TextArea>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Số điện thoại <span className="text-red-1">*</span>
                </label>
                <Input type="tel" id="phone" name="phone" required />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Địa chỉ email
                </label>
                <Input type="email" id="email" name="email" />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="note"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Ghi chú đơn hàng (tùy chọn)
                </label>
                <TextArea id="note" name="note" rows={3}></TextArea>
              </div>
              <Button
                variant="by_now"
                className="ml-auto flex mt-4 rounded-[20px] px-6 bg-[#e74c3c] hover:bg-[#ec3131] text-white"
              >
                Đặt hàng {ordering && <ButtonLoading className="ml-3" />}
              </Button>
            </form>
          </div>
          <div className="border border-gray-1 md:p-6 p-4 shadow-input md:w-1/2 w-full rounded-[4px]">
            <div className="text-xl font-bold md:mb-11 mb-4 flex items-baseline justify-between sm:flex-row flex-col">
              <span className="text-main">Đơn hàng của bạn</span>
              <p className="font-semibold mt-2 md:text-[18px] text-base">
                Tổng: {cart.length} sản phẩm
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse md:text-base text-sm min-w-[640px]">
                <thead>
                  <tr>
                    <th className="p-2 border-b-[3px]">Mã SP</th>
                    <th className="p-2 border-b-[3px]">Sản phẩm</th>
                    <th className="py-2 border-b-[3px]">Số lượng</th>
                    <th className="p-2 border-b-[3px]">Tổng tiền</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <tr key={item.id}>
                      <td className="p-2 border-b text-center">
                        <span className="font-medium">{item.code}</span>
                      </td>
                      <td className="p-2 border-b">
                        <div className="flex items-center">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={50}
                            height={50}
                            className="rounded-md"
                          />
                          <span className="ml-3 font-medium md::text-base text-[14px] max-w-[200px]">
                            {item.name}
                          </span>
                        </div>
                      </td>
                      <td className="p-2 border-b text-center">
                        {item.quantity}
                      </td>
                      <td className="p-2 py-4 border-b text-center">
                        <p className="text-[16px] font-bold text-red-1">
                          {(item.price * item.quantity).toLocaleString(
                            "vi-VN",
                            {
                              style: "currency",
                              currency: "VND",
                            }
                          )}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      {!!orders && (
        <OrderSuccessModal
          isOpen={!!orders}
          orders={orders}
          onClose={() => setOrders(null)}
        />
      )}
    </>
  );
};

export default PaymentSection;
