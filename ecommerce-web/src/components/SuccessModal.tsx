import { useRef } from "react";
import { Button } from "@/components/ui/button";
import Modal, { ModalProps } from "@/components/ui/Modal";
import { information } from "@/config/data/information";

interface SuccessModalProps extends ModalProps {
  title?: string;
}

const SuccessModal = (props: SuccessModalProps) => {
  const { title } = props;
  const modalRef = useRef<any>(null);

  function onClose(): void {
    modalRef.current.close();
  }

  return (
    <Modal
      {...props}
      ref={modalRef}
      title={title || "Đăng ký tư vấn thành công!"}
    >
      <p className="mt-4">
        Cảm ơn bạn đã liên hệ với{" "}
        <strong className="text-main">{information.shopName}</strong>
        <p>Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.</p>
      </p>
      <div className="mt-4 text-right" onClick={() => onClose()}>
        <Button variant="destructive">Đóng</Button>
      </div>
    </Modal>
  );
};

export default SuccessModal;
