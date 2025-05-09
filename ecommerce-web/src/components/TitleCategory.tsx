"use client";

import { useEffect } from "react";
import Link from "next/link";
import Aos from "aos";
import "aos/dist/aos.css";

interface ICategoryProps {
  name: string;
  url: string;
}

interface TitleCategoryProps {
  category: ICategoryProps;
}

const TitleCategory = (props: TitleCategoryProps) => {
  const { category } = props;

  useEffect(function () {
    Aos.init({ duration: 1500, once: true });
  }, []);

  return (
    <div
      className="flex items-center justify-between border-b-[2px] border-gray-4 mb-8"
      data-aos="flip-left"
    >
      <h2 className="border-b-[2px] border-main pb-[7.5px] -mb-[1px]">
        {category.name}
      </h2>
      <Link
        href={category.url}
        className="flex items-center gap-2 text-white bg-main leading-none hover:bg-main 
          rounded-[5px] py-[10px] px-[12px] md:text-[15px] text-sm font-medium"
      >
        Xem thêm
      </Link>
    </div>
  );
};

export default TitleCategory;
