"use client";

import { useEffect, useState } from "react";
import Aos from "aos";
import { Input, TextArea } from "@/components/ui/Input";
import Notification, { ModuleNotification } from "../../../api/Notification";
import SuccessModal from "@/components/SuccessModal";
import { information } from "@/config/data/information";

const RegisterPromotions = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  useEffect(function () {
    Aos.init({ duration: 1500, once: true });
  }, []);

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    setIsLoading(true);

    Notification.createNewNotification({
      ...data,
      module: ModuleNotification.CONSULTING,
    });

    setIsLoading(false);
    setIsSuccessModalOpen(true);
    // Clear form
    e.currentTarget.reset();
  };

  return (
    <>
      <section
        className="mt-4"
        data-aos="fade-up"
        data-aos-anchor-placement="top-center"
      >
        <form
          className="form rounded-xl bg-main sm:py-8 sm:px-10 py-6 px-6 text-white text-center"
          onSubmit={handleOnSubmit}
        >
          <h2 className="text-white text-center mb-0 md:text-[20px] text-[18px]">
            Đăng ký nhận báo giá
          </h2>
          <p className="mt-1 mb-8 md:text-base text-[15px] text-center">
            <strong>{information.shopName}</strong> luôn sẵn sàng cho mọi đơn
            hàng và giải đáp các thắc mắc một cách nhanh chóng và hài lòng nhất.
          </p>
          <div className="flex justify-between gap-[20px] lg:flex-row flex-col">
            <div>
              <Input placeholder="Họ và Tên" name="name" type="text" required />
              <Input
                placeholder="Số điện thoại"
                name="phone"
                type="tel"
                required
              />
              <Input placeholder="Email" name="email" type="email" required />
            </div>
            <TextArea
              cols="50"
              name="content"
              placeholder="Nội dung cần tư vấn..."
            />
          </div>
          <button
            className="mt-4 px-[14px] py-[6px] bg-white text-black-1 flex lg:ml-auto lg:mx-0 mx-auto
          font-[600] rounded-[6px] text-[15px] cursor-pointer"
            type="submit"
            disabled={isLoading}
          >
            Đăng ký
          </button>
        </form>
      </section>
      {isSuccessModalOpen && (
        <SuccessModal
          isOpen={isSuccessModalOpen}
          onClose={() => setIsSuccessModalOpen(false)}
          title="Đăng ký tư vấn thành công!"
        />
      )}
    </>
  );
};
export default RegisterPromotions;
