'use client';

import Image from 'next/image';
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import HeroBanner from '@/images/hero_banner.png';
import './styles.scss';

function Hero() {
  return (
    <div className="lg:w-3/4 w-full ml-auto pt-0">
      <Swiper
        className="swiper_container"
        modules={[Navigation, Pagination, A11y, Autoplay]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation
        pagination={{ clickable: true }}
      >
        {Array(3)
          .fill(0)
          .map((_, index) => (
            <SwiperSlide key={index}>
              <Image
                src={HeroBanner}
                alt={`hero banner ${index}`}
                width={500}
                height={421}
                className="lg:h-[421px] md:h-[350px] sm:h-[330px] h-300px w-full"
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}

export default Hero;
