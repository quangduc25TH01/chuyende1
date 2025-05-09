"use client";

import { useEffect } from "react";
import Aos from "aos";
import Image from "next/image";
import "./styles.scss";
import TitleSection from "@/components/TitleSection";

const data = [
  {
    icon: "/images/why-choose-us/vs2.png",
    title: "Giá cả cạnh tranh",
    description:
      "Cam kết cung cấp sản phẩm với mức giá cạnh tranh nhất trên thị trường. Chiến lược giá linh hoạt để đảm bảo tính cạnh tranh và tiết kiệm cho khách hàng.",
  },
  {
    icon: "/images/why-choose-us/vs3.png",
    title: "Vận chuyển nhanh chóng",
    description:
      "Hệ thống vận chuyển hiện đại, đảm bảo hàng hóa được giao đến nhanh chóng và an toàn. Đối tác vận chuyển uy tín, giúp giảm thiểu thời gian và chi phí vận chuyển.",
  },
  {
    icon: "/images/why-choose-us/vs4.png",
    title: "Đội ngũ chăm sóc khách hàng",
    description:
      "Đội ngũ chăm sóc khách hàng chuyên nghiệp và chu đáo, luôn sẵn lòng hỗ trợ và giải quyết mọi vấn đề của khách hàng. Phản hồi nhanh chóng và linh hoạt đáp ứng mọi nhu cầu của khách hàng.",
  },
  {
    icon: "/images/why-choose-us/vs1.png",
    title: "Sản phẩm chất lượng cao",
    description:
      "Sản phẩm được sản xuất từ nguyên liệu chất lượng cao, đảm bảo an toàn và tiêu chuẩn. Quy trình sản xuất nghiêm ngặt và kiểm soát chất lượng chặt chẽ để đảm bảo sản phẩm đáp ứng hoặc vượt qua mong đợi của khách hàng.",
  },
];

const WhyChooseUs = () => {
  useEffect(function () {
    Aos.init({ duration: 1500, once: true });
  }, []);

  return (
    <section>
      <TitleSection title="Vì sao chọn chúng tôi?" />

      <div className="flex items-center justify-between lg:flex-row flex-col-reverse">
        <div className="lg:w-1/2 w-full lg:px-0 px-0">
          {data.map((item, index) => (
            <div
              key={index}
              data-aos="flip-left"
              data-aos-easing="ease-out-cubic"
              data-aos-anchor-placement={
                index === 0 ? "top-bottom" : "top-center"
              }
              className="flex items-center border-b-[2px] border-b-[#e4cca1] pb-[15px] mb-[15px] last:mb-[0] item"
            >
              <Image
                src={item.icon}
                alt="icon"
                width={87}
                height={87}
                className="w-full max-w-[60px] md:max-w-[87px] sm:max-w-[70px]"
              />
              <div className="ml-[20px]">
                <p className="text-[14px] md:text-[18px] sm:text-base font-bold text-[#65b741] pb-[6px] uppercase title">
                  {item.title}
                </p>
                <p className="text-[15px] text-[#3b3b3b]">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
        <Image
          src="/images/why-choose-us/ly.jpg"
          alt=""
          width={530}
          height={350}
          data-aos="flip-down"
          className="w-full xl:max-w-[530px] lg:max-w-[420px] md:max-w-[350px] rounded-[8px] mb-6 lg:mb-0"
        />
      </div>
    </section>
  );
};

export default WhyChooseUs;
