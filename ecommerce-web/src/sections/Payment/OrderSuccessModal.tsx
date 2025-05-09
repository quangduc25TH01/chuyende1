import { useRef } from "react";
import moment from "moment";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Modal, { ModalProps } from "@/components/ui/Modal";
import { ACTION_TYPES, useCart } from "@/context/CartContext";
import { information } from "@/config/data/information";

interface IOrderSuccessModal extends ModalProps {
  orders: any;
}

const OrderSuccessModal = (props: IOrderSuccessModal) => {
  const { orders } = props;

  const modalRef = useRef<any>(null);
  const router = useRouter();
  const { dispatch } = useCart();

  function onClose(): void {
    modalRef.current.close();
    router.push("/cua-hang");

    // Reset cart
    dispatch({ type: ACTION_TYPES.CLEAR_CART });
  }

  function onViewOrderDetail(): void {
    router.push("/chi-tiet-don-hang");
    // Reset cart
    dispatch({ type: ACTION_TYPES.CLEAR_CART });
  }

  return (
    <Modal
      {...props}
      ref={modalRef}
      title="Đặt hàng thành công!"
      description={
        <>
          Cảm ơn bạn đã đặt hàng tại{" "}
          <strong className="text-main">{information.shopName}</strong>
        </>
      }
    >
      <ul className="mt-4 list-disc pl-5">
        <li>
          <strong>Mã đơn hàng:</strong>{" "}
          <span
            className="font-bold underline text-main cursor-pointer"
            onClick={onViewOrderDetail}
          >
            #{orders.orderId}
          </span>
        </li>
        <li className="my-2">
          <strong>Ngày đặt hàng:</strong>{" "}
          {moment(orders.createdAt).format("DD/MM/YYYY")}
        </li>
        <li className="my-2">
          <strong>Phương thức thanh toán:</strong> Thanh toán khi nhận hàng hoặc
          chuyển khoản
        </li>
        <li>
          <strong>Xem chi tiết đơn hàng tại</strong>{" "}
          <span
            className="font-bold underline text-main cursor-pointer"
            onClick={onViewOrderDetail}
          >
            đây
          </span>
        </li>
      </ul>

      <p className="mt-4 italic md:text-base text-sm">
        Chúng tôi sẽ liên hệ với bạn qua số điện thoại để xác nhận đơn hàng. Đơn
        hàng sẽ được giao sau khi chúng tôi đã xác nhận thành công. Mọi thắc mắc
        vui lòng liên hệ hotline: 0347.366.345. Xin cảm ơn!
      </p>

      <div className="mt-4 text-right" onClick={() => onClose()}>
        <Button variant="secondary">Đóng</Button>
      </div>
    </Modal>
  );
};

export default OrderSuccessModal;
