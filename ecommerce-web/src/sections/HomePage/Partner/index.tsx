"use client";
import { useEffect } from "react";

import Aos from "aos";
import Image from "next/image";
import { A11y, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";

import logo1 from "@/images/partners/logo.png";
import logo2 from "@/images/partners/logo2.png";
import TitleSection from "@/components/TitleSection";
import { information } from "@/config/data/information";

const partnerIcon = [
  {
    url: logo1,
  },
  {
    url: logo2,
  },
  {
    url: logo1,
  },
  {
    url: logo2,
  },
  {
    url: logo2,
  },
  {
    url: logo2,
  },
];

function PartnerSection() {
  useEffect(function () {
    Aos.init({ duration: 1500, once: true });
  }, []);

  return (
    <section className="mt-4 mb-8">
      <TitleSection title={`Đối tác của ${information.shopName}`} />

      <Swiper
        className="partners_slide"
        modules={[A11y, Autoplay]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        breakpoints={{
          1024: {
            slidesPerView: 5,
            spaceBetween: 15,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 15,
          },
          640: {
            slidesPerView: 3,
            spaceBetween: 15,
          },
          414: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          320: {
            slidesPerView: 2,
            spaceBetween: 5,
          },
        }}
        data-aos="fade-up"
      >
        {partnerIcon.map((item, idx) => (
          <SwiperSlide key={idx}>
            <Image
              src={item.url}
              alt="img"
              width={120}
              height={80}
              className="lg:h-[80] md:h-[60px] h-[50px] w-auto mx-auto object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
export default PartnerSection;
