"use client";

import { useEffect } from "react";
import Aos from "aos";

import Image from "next/image";
import { Navigation, A11y, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";

import "./styles.scss";
import TitleSection from "@/components/TitleSection";
import { IArticle } from "@/config/entities";
import config from "@/config";

async function getArticles() {
  try {
    const res = await fetch(`${config.apiServerUrl}/api/articles?client=true`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) return [];

    return res.json();
  } catch (error) {
    return [];
  }
}

async function NewsSection() {
  useEffect(function () {
    Aos.init({ duration: 1500, once: true });
  }, []);

  const articles: IArticle[] = await getArticles();

  return (
    <section className="mt-4">
      <TitleSection title="Tin tức - sự kiện" />

      <Swiper
        className="news_slide swiper-section-container"
        modules={[Navigation, A11y, Autoplay]}
        navigation
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          1024: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 15,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          320: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
        }}
        data-aos="fade-up"
      >
        {articles &&
          articles.map((article) => (
            <SwiperSlide className="blog-item-wrapper" key={article.id}>
              <div className="relative blog-item overflow-hidden z-10">
                <Image
                  src={article.thumbnail}
                  alt={article.title}
                  width={300}
                  height={200}
                  className="object-cover w-full"
                />
              </div>
              <div className="z-20 absolute bottom-8 px-6 w-full text text-white md:text-[16px] text-[15px] font-bold">
                <Link href={`/tin-tuc/${article.slug}`}>{article.title}</Link>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
}
export default NewsSection;
