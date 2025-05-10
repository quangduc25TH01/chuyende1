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
import TitleSection from "@/components/TitleSection";

import "./styles.scss";
import { IArticle } from "@/config/entities";
import { useFetch } from "@/hooks/useFetch";
import moment from "moment";

function SimilarArticlesPage({ currentArticle }: { currentArticle: IArticle }) {
  useEffect(function () {
    Aos.init({ duration: 1500, once: true });
  }, []);

  const { data: articles } = useFetch<IArticle[]>("articles?client=true", {
    revalidateOnFocus: false,
  });

  const filteredArticles = articles.filter(
    (article) =>
      article.id !== currentArticle.id &&
      article.category === currentArticle.category
  );

  if (!filteredArticles.length) return null;

  return (
    <section>
      <TitleSection title="Bài viết khác" />

      <Swiper
        className="similar-articles-slide swiper-section-container"
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
        {filteredArticles &&
          filteredArticles.map((article) => (
            <SwiperSlide className="blog-item-wrapper">
              <div className="relative blog-item overflow-hidden z-10">
                <Image
                  src={article.thumbnail}
                  alt="blog-img"
                  width={300}
                  height={200}
                  className="object-cover w-full"
                />
              </div>
              <div className="absolute z-20 p-4 py-2 top-1.5 left-1.5 min-w-[50px] text-white md:text-[15px] text-sm bg-main text-center rounded-[8px] font-medium flex items-center justify-center">
                {moment(article.createdAt).format("dd-MM")}
              </div>
              <div className="z-20 absolute bottom-8 px-6 w-full text text-white md:text-[16px] text-[15px] font-bold">
                <Link href={`/tin-tuc/${article.slug}`} className="truncate">
                  {article.slug}
                </Link>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
}
export default SimilarArticlesPage;
