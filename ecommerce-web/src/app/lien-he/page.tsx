"use client";

import { useState } from "react";
import { TextArea } from "@/components/ui/Input";
import { MdLocationOn } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { FaClock } from "react-icons/fa6";

import "./styles.scss";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/button";
import { ModuleNotification } from "@/api/Notification";
import Notification from "@/api/Notification";
import SuccessModal from "@/components/SuccessModal";
import { information } from "@/config/data/information";
import DynamicMap from "@/components/Maps/DynamicMap";

export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

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
      <div className="container">
        <section>
          <div className="flex items-start justify-between gap-5 xl:flex-row flex-col">
            <div className="xl:w-1/2 w-full">
              <div className="border border-main rounded-[8px]">
                <p className="bg-main px-3 py-3 rounded-tl-[8px] text-center rounded-tr-[8px] text-white text-[17px] font-bold">
                  {information.shopName}
                </p>
                <div className="px-3 py-3">
                  <div className="flex items-center mb-4 mb-0 sm:flex-row flex-col gap-4">
                    <div className="flex items-center gap-3 sm:w-[calc(50%_-_6px)] w-full">
                      <MdLocationOn
                        size={40}
                        className="text-main border border-main rounded-full p-[7px] min-w-[40px]"
                      />
                      <div>
                        <p className="font-bold">Địa chỉ</p>
                        <p>{information.address}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 sm:w-[calc(50%_-_6px)] w-full">
                      <FaClock
                        size={40}
                        className="text-main border border-main rounded-full p-[7px] min-w-[40px]"
                      />
                      <div>
                        <p className="font-bold">Thời gian làm việc</p>
                        <p>8h - 20h</p>
                        <p>Từ thứ 2 đến Chủ nhật</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center sm:flex-row flex-col gap-4">
                    <div className="flex items-center gap-3 sm:w-[calc(50%_-_6px)] w-full">
                      <FaPhoneAlt
                        size={40}
                        className="text-main border border-main rounded-full p-[7px] min-w-[40px]"
                      />
                      <div>
                        <p className="font-bold">Hotline/Zalo</p>
                        <span>
                          {information.phones[0]}
                          {information.phones[1] &&
                            ` - ${information.phones[1]}`}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 sm:w-[calc(50%_-_6px)] w-full">
                      <IoMail
                        size={40}
                        className="text-main border border-main rounded-full p-[7px] min-w-[40px]"
                      />
                      <div>
                        <p className="font-bold">Email</p>
                        <p>{information.emails[0]}</p>
                        {information.emails[1] && (
                          <p>{information.emails[1]}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border border-main rounded-[8px] mt-6">
                <p className="bg-main px-3 py-3 rounded-tl-[8px] text-center rounded-tr-[8px] text-white text-[17px] font-bold">
                  Liên hệ với chúng tôi
                </p>
                <form
                  className="form rounded-xl p-4 text-white text-center"
                  onSubmit={handleOnSubmit}
                >
                  <Input
                    placeholder="Họ và Tên"
                    name="name"
                    type="text"
                    required
                  />
                  <Input
                    placeholder="Số điện thoại"
                    name="phone"
                    type="tel"
                    required
                  />
                  <Input
                    placeholder="Email"
                    name="email"
                    type="email"
                    required
                  />

                  <TextArea
                    rows="4"
                    cols="50"
                    name="content"
                    placeholder="Nội dung cần tư vấn..."
                  />

                  <Button
                    className="mt-4 px-[14px] py-[8px] bg-main text-white flex ml-auto
                  font-medium rounded-[6px]"
                    type="submit"
                    disabled={isLoading}
                  >
                    Gửi thông tin
                  </Button>
                </form>
              </div>
            </div>
            <div className="xl:w-1/2 w-full">
              <DynamicMap />
            </div>
          </div>
        </section>
      </div>
      {isSuccessModalOpen && (
        <SuccessModal
          isOpen={isSuccessModalOpen}
          onClose={() => setIsSuccessModalOpen(false)}
          title="Đăng ký tư vấn thành công!"
        />
      )}
    </>
  );
}
