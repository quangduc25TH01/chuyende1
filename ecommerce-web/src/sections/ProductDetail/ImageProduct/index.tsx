"use client";
import { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import "./styles.scss";
import { ImageProduct } from "@/config/entities";

const Images = ({ images }: { images: ImageProduct[] }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  return (
    <>
      <Swiper
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="swiper-container"
      >
        {images &&
          images.map((img: ImageProduct) => (
            <SwiperSlide key={img.id} className="border rounded-[8px]">
              <img
                src={img.imageUrl}
                className="md:h-[370px] sm:h-[330px] h-[280px] w-full object-contain rounded-[8px]"
              />
            </SwiperSlide>
          ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mt-3 slide-thumb"
      >
        {images &&
          images.map((img: ImageProduct) => (
            <SwiperSlide
              key={img.id}
              className="max-h-[70px] p-0 h-full rounded-[8px] cursor-pointer border rounded-[7px]"
            >
              <img
                src={img.imageUrl}
                className="object-contain w-full h-[65px] rounded-[8px]"
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
};

export default Images;
