"use client";

import { useEffect } from "react";
import Aos from "aos";

import "./styles.scss";
import CategoryItem from "./CategoryItem";
import { useFetch } from "@/hooks/useFetch";
import { ICategory } from "@/config/entities";
import config from "@/config";
import { information } from "@/config/data/information";

function Categories() {
  useEffect(function () {
    Aos.init({ duration: 1500, once: true });
  }, []);

  const { data: categories, isLoading } = useFetch<ICategory[]>(
    "categories?client=true",
    {
      revalidateOnFocus: false,
    }
  );

  if (isLoading) return null;

  return (
    <section>
      <h2
        className="relative flex items-center w-full justify-between"
        data-aos="flip-left"
      >
        <b className="flex-1 h-[2px] bg-black-1 opacity-10" />
        <span className="mx-4">
          Sản phẩm của {information.shopName}
          <img src="/title-main.png" alt="icon" className="mx-auto mt-1" />
        </span>

        <b className="flex-1 h-[2px] bg-black-1 opacity-10" />
      </h2>

      <div className="flex items-start justify-start xl:gap-[30px] lg:gap-[25px] gap-[15px] flex-wrap mb-[20px]">
        {categories &&
          categories.map((category: ICategory, index: number) => (
            <CategoryItem key={index} category={category} dataAos="fade-up" />
          ))}
      </div>

      <section className="flex items-center gap-x-4 pb-0">
        <div
          className="bg-[url('/selling-banner-1.jpg')] lg:h-[130px] h-[115px] sm:w-1/2 w-full rounded-[6px] bg-no-repeat bg-cover bg-top"
          data-aos="flip-up"
        />
        <div
          className="bg-[url('/selling-banner-2.jpg')] lg:h-[130px] h-[115px] w-1/2 rounded-[6px] bg-no-repeat bg-cover bg-top sm:block hidden"
          data-aos="flip-down"
        />
      </section>
    </section>
  );
}
export default Categories;
