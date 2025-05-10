'use client';
import { useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import { ImagesProductStyled } from './styles';

interface ImagesProductProps {
  images: any[];
}

const ImagesProduct = (props: ImagesProductProps) => {
  const { images } = props;

  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  return (
    <ImagesProductStyled>
      <Swiper
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="swiper-container"
      >
        {images.map((img: any) => (
          <SwiperSlide key={img.id}>
            <img
              src={img.imageUrl}
              className="h-[300px] w-full object-cover rounded-[8px]"
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
        {images.map((img: any) => (
          <SwiperSlide
            key={img.id}
            className="max-h-[70px] p-0 h-full rounded-[7px] cursor-pointer"
          >
            <img
              src={img.imageUrl}
              className="object-cover w-full h-[70px] rounded-[8px]"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </ImagesProductStyled>
  );
};

export default ImagesProduct;
