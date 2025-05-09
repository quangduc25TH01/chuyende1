"use client";

import React from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
import moment from "moment";

import OrderProduct from "@/api/OrderProduct";
import { Button } from "@/components/ui/button";
import { BiArrowBack } from "react-icons/bi";

const OrderStatus: any = {
  pending: "Đang xác nhận",
  shipping: "Đang giao hàng",
  completed: "Hoàn thành",
  canceled: "Hủy bỏ",
};

const OrderDetailSection = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const orderIds =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("orderIds") || "[]")
      : [];

  useEffect(() => {
    if (!!orderIds.length) {
      const fetchOrders = async () => {
        try {
          const { data } = await OrderProduct.getOrderDetailsByOrderIds({
            orderIds,
          });
          setOrders(data);
        } catch (error) {
          console.error("Error fetching orders:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchOrders();
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <section>
      <h2 className="mb-4 text-center">Chi tiết đơn hàng của bạn</h2>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : orders.length ? (
        orders.map((order: any) => (
          <div key={order.id} className="order-detail p-4 ">
            <p>
              Mã đơn hàng: <strong>#{order.orderId}</strong>
            </p>
            <p>
              Ngày tạo:{" "}
              <span>{moment(order.createdAt).format("HH:MM DD/MM/YYYY")}</span>
            </p>
            <p>
              Trạng thái đơn hàng:{" "}
              <span className={`text-${order.status}`}>
                {OrderStatus[order.status]}
              </span>
            </p>

            <div className="overflow-x-auto mt-4">
              <table className="w-full border-collapse md:text-base text-sm min-w-[640px]">
                <thead>
                  <tr>
                    <th className="p-2 border-[2px]">Mã sản phẩm</th>
                    <th className="p-2 border-[2px]">Tên sản phẩm</th>
                    <th className="py-2 border-[2px]">Số lượng</th>
                    <th className="py-2 border-[2px]">Giá</th>
                  </tr>
                </thead>
                <tbody>
                  {order.orderItems.map((orderItem: any) => (
                    <tr key={orderItem.id}>
                      <td className="p-2 border text-center">
                        <span className="font-medium">
                          {orderItem.product.code}
                        </span>
                      </td>
                      <td className="p-2 border text-center">
                        {orderItem.product.name}
                      </td>
                      <td className="p-2 border text-center">
                        {orderItem.quantity} Cái
                      </td>
                      <td className="p-2 border text-center">
                        {orderItem?.price?.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))
      ) : (
        <div className="h-[300px] flex flex-col items-center justify-center">
          <p className="w-full text-center mt-4">Không có đơn hàng nào</p>

          <Link href="/cua-hang" passHref>
            <Button
              variant="outline"
              className="mx-auto flex items-center mt-6"
            >
              Quay lại cửa hàng
            </Button>
          </Link>
        </div>
      )}
    </section>
  );
};

export default OrderDetailSection;
