"use client";

// import { useEffect } from "react";
// import Aos from "aos";

import Image from "next/image";
import { Navigation, A11y, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import { ICategory } from "@/config/entities";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";

// import "./styles.scss";

interface ICategoryComponent {
  categorySelected?: ICategory;
  categories: ICategory[];
}

const CategoriesComponent = (props: ICategoryComponent) => {
  const { categories, categorySelected } = props;

  return (
    <>
      <Swiper
        className="swiper-section-container"
        modules={[Navigation, A11y, Autoplay]}
        navigation
        breakpoints={{
          1440: {
            slidesPerView: 6,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 5,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          425: {
            slidesPerView: 3,
            spaceBetween: 8,
          },
          320: {
            slidesPerView: 3,
            spaceBetween: 3,
          },
        }}
        loop={true}
      >
        {categories.map((category) => (
          <SwiperSlide
            key={category.id}
            className={
              categorySelected?.id === category.id ? "pointer-events-none" : ""
            }
          >
            <Link
              href={`/${category.slug}`}
              key={category.id}
              className="flex flex-col items-center group"
            >
              <div className="rounded-full overflow-hidden border p-1">
                <Image
                  src={category.imageURL}
                  alt={category.name}
                  width={100}
                  height={100}
                  className="rounded-full object-cover lg:w-[130px] lg:h-[130px] md:w-[110px] md:h-[110px] sm:w-[90px] sm:h-[90px] transition-transform duration-300 group-hover:scale-105 box-shadow-lg"
                  priority
                />
              </div>
              <p
                className={`mt-2 text-[14px] lg:text-base md:[15px] font-medium transition-colors duration-300 group-hover:text-main text-center ${
                  categorySelected?.id === category.id ? "text-main" : ""
                }`}
              >
                {category.name}
              </p>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default CategoriesComponent;
