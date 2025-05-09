"use client";

import { cache, useEffect, useState } from "react";
import Link from "next/link";
import { FaBars } from "react-icons/fa";
import { usePathname } from "next/navigation";
import Image from "next/image";

import styles from "./styles.module.scss";
import { useWindowScrollPositions } from "@/hooks/useWindowScrollPositions";
import config from "@/config";
import { ICategory } from "@/config/entities";
import { useFetch } from "@/hooks/useFetch";

function Categories() {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(true);
  const pathname = usePathname();
  const { scrollY } = useWindowScrollPositions();
  const isShowButtonScrollToTop = scrollY > 200;

  const isHomePage = pathname === "/";

  const { data: categories } = useFetch<ICategory[]>("categories?client=true", {
    revalidateOnFocus: false,
  });

  useEffect(() => {
    setIsCategoriesOpen(isHomePage);
  }, [isHomePage]);

  useEffect(() => {
    if (isHomePage) {
      if (isShowButtonScrollToTop) {
        setIsCategoriesOpen(false);
      } else {
        setIsCategoriesOpen(true);
      }
    } else {
      setIsCategoriesOpen(false);
    }
  }, [isShowButtonScrollToTop, isHomePage]);

  return (
    <div className="relative w-1/4 h-full lg:block hidden">
      <div
        className="flex items-center h-full bg-gradient-to-b from-blue-7 to-blue-8 text-white px-4 py-4 cursor-pointer capitalize"
        onClick={() => {
          isHomePage && !isShowButtonScrollToTop
            ? null
            : setIsCategoriesOpen(!isCategoriesOpen);
        }}
      >
        <FaBars className="mr-3" />
        <span className="font-medium text-base">Danh mục sản phẩm</span>
      </div>
      {isCategoriesOpen && (
        <ul className={`${styles.nav_categories} overflow-y-auto`}>
          {categories &&
            categories.map((category: ICategory) => {
              return (
                <li key={category.id} className="border-b">
                  <Link
                    href={`/${category.slug}`}
                    className="flex items-center gap-3"
                  >
                    <Image
                      src={category.logoURL}
                      alt={category.name}
                      width={30}
                      height={30}
                    />
                    <div className="flex items-center text-base">
                      {category.name}
                    </div>
                  </Link>
                </li>
              );
            })}
        </ul>
      )}
    </div>
  );
}

export default Categories;
