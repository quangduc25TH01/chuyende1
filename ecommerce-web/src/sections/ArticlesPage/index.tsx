"use client";

import Image from "next/image";
import moment from "moment";

import "./styles.scss";
import TitleSection from "@/components/TitleSection";
import Link from "next/link";
import { useFetch } from "@/hooks/useFetch";
import { IArticle } from "@/config/entities";
import { useEffect, useState } from "react";

export const ArticleCategoryOptions: any = {
  all: "Tất cả",
  product: "Sản phẩm",
  promotion: "Khuyến mãi",
  other: "Tin tức khác",
};

const ArticleCard = ({ article }: { article: IArticle }) => {
  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden 
      lg:w-[calc(25%_-_18px)] sm:w-[calc(33.3%_-_16px)] w-[70%] 
      cursor-pointer relative"
    >
      <Link href={`/tin-tuc/${article.slug}`}>
        <Image
          src={article.thumbnail}
          alt={article.title}
          width={300}
          height={200}
          className="object-cover w-full"
        />
        <div className="p-3 h-[70px]">
          <p
            className="md:text-[15px] text-[14px] font-medium text-black-1 hover:text-main"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: "2",
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {article.title}
          </p>
        </div>
        <div className="absolute p-4 py-2 top-1.5 left-1.5 min-w-[50px] text-white md:text-[15px] text-sm bg-main text-center rounded-[8px] font-medium flex items-center justify-center">
          {moment(article.createdAt).format("DD-MM")}
        </div>
      </Link>
    </div>
  );
};

export default function ArticlesPage() {
  const [activeCategory, setActiveCategory] = useState(
    ArticleCategoryOptions.all
  );

  const {
    data: articles,
    isLoading,
    mutate,
  } = useFetch<IArticle[]>(
    `articles?client=true${
      activeCategory !== ArticleCategoryOptions.all
        ? `&category=${activeCategory}`
        : ""
    }`,
    {
      revalidateOnFocus: false,
    }
  );

  useEffect(() => {
    mutate();
  }, [activeCategory, mutate]);

  return (
    <div className="container">
      <section>
        <TitleSection title="Tin tức" isLine={false} />
        <div className="flex items-center justify-center md:gap-6 gap-4 my-4 md:mb-10 mb-7 flex-wrap">
          {Object.keys(ArticleCategoryOptions).map((key) => (
            <div
              key={key}
              className={`border border-slate-300 bg-[#f7f7f7] font-medium hover:text-main rounded-[50px] md:px-6 px-4 py-2 cursor-pointer ${
                activeCategory === ArticleCategoryOptions[key]
                  ? "text-main"
                  : "text-black-1"
              }`}
              onClick={() => setActiveCategory(ArticleCategoryOptions[key])}
            >
              {ArticleCategoryOptions[key]}
            </div>
          ))}
        </div>
        {isLoading && (
          <div className="flex items-center justify-center h-[300px] w-full text-center text-black-1 text-lg">
            Đang tải...
          </div>
        )}
        <div className="flex items-start gap-6 flex-wrap sm:justify-start justify-center">
          {articles &&
            articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
        </div>
      </section>
    </div>
  );
}
