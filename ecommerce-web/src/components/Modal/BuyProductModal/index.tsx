import { useRef } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Modal, { ModalProps } from '@/components/ui/Modal';
import productImage from '@/images/product1.jpg';
import { Input, TextArea } from '@/components/ui/Input';

interface BuyProductModalProps extends ModalProps {}

const BuyProductModal = (props: BuyProductModalProps) => {
  const modalRef = useRef(null);

  return (
    <Modal {...props} ref={modalRef}>
      <div className="flex items-start">
        <div className="w-1/2 pr-3">
          <div className="flex items-center">
            <Image
              src={productImage}
              width={120}
              height={120}
              alt="img-product"
              className="rounded-lg"
            />
            <div className="pl-4">
              <h2 className="text-base font-medium mb-2 text-blue-3">
                Cửa Cổng Đẹp Sắt Kẽm SP-48535
              </h2>

              <p className="text-xl font-bold text-red-3">1,461,240₫</p>
            </div>
          </div>
          <div className="flex items-center mt-3">
            <p className="font-bold mr-4">Số lượng:</p>
            <div className="flex items-center my-2">
              <div className="flex items-center border-2 border-gray-5 rounded-[4px] h-[30px]">
                <button className="w-[40px] bg-gray-5 h-full text-xl">-</button>
                <input
                  type="number"
                  min={1}
                  max={999999}
                  defaultValue={1}
                  className="w-[60px] text-center focus:outline-none h-full appearance-none hover:appearance-none"
                />

                <button className="w-[40px] bg-gray-5 h-full text-xl">+</button>
              </div>
            </div>
          </div>
          <p className="mt-3 text-sm">
            Bạn vui lòng nhập đúng số điện thoại để chúng tôi gọi xác nhận đơn
            hàng trước khi giao hàng. Xin cảm ơn!
          </p>

          <p className="mt-6 flex items-center justify-between">
            <span>Tổng cộng:</span>{' '}
            <span className="font-bold text-xl ">8.000.000₫</span>
          </p>
        </div>

        <div className="w-1/2 pl-3">
          <p className="mb-3 font-bold text-base">Thông tin người mua</p>
          <form>
            <Input placeholder="Họ và tên" />
            <Input placeholder="Số điện thoại" type="phone" />
            <Input placeholder="Email" type="email" />
            <TextArea placeholder="Địa chỉ" />
            <TextArea placeholder="Ghi chú đơn hàng (không bắt buộc)" />
          </form>

          <Button className="bg-green-5 h-[40px] float-right mt-3">
            Đặt hàng ngay
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default BuyProductModal;
