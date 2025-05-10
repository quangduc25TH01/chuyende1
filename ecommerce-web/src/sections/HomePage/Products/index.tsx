"use client";

import { useEffect, useState } from "react";
import { Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import Aos from "aos";

import TitleCategory from "@/components/TitleCategory";
import { useFetch } from "@/hooks/useFetch";
import { IProduct } from "@/config/entities";
import Product from "@/components/Product";

const initData = [
  {
    category: {
      name: "Sản phẩm bán chạy",
      url: "/cua-hang",
    },
    products: [] as IProduct[],
  },
  {
    category: {
      name: "Sản phẩm mới",
      url: "/cua-hang",
    },
    products: [] as IProduct[],
  },
];

const ProductList = () => {
  const [productsNewAndBestSellerData, setProductsNewAndBestSellerData] =
    useState(initData);

  useEffect(function () {
    Aos.init({ duration: 1500, once: true });
  }, []);

  const { data: products, isLoading } = useFetch<IProduct[]>(
    "products?client=true",
    {
      revalidateOnFocus: false,
    }
  );

  useEffect(() => {
    if (products?.length) {
      const newProducts = products.filter((product) => product.isNew);
      const bestSellerProducts = products.filter(
        (product) => product.isBestSeller
      );

      productsNewAndBestSellerData[0].products = newProducts;
      productsNewAndBestSellerData[1].products = bestSellerProducts;

      setProductsNewAndBestSellerData([...productsNewAndBestSellerData]);
    }
  }, [products]);

  if (isLoading) return null;

  return (
    <section>
      {productsNewAndBestSellerData.map((item, idx: number) => {
        return (
          <section key={idx}>
            {item.category && <TitleCategory category={item.category} />}
            <Swiper
              navigation={true}
              autoplay={{
                delay: 3000,
                pauseOnMouseEnter: true,
              }}
              breakpoints={{
                1024: {
                  slidesPerView: 5,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 4,
                  spaceBetween: 20,
                },
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                320: {
                  slidesPerView: 2,
                  spaceBetween: 15,
                },
              }}
              modules={[Autoplay, Navigation]}
              className="swiper-section-container"
              data-aos="fade-up"
            >
              {item.products.map((product, idx) => (
                <SwiperSlide key={idx}>
                  <Product product={product} />
                </SwiperSlide>
              ))}
            </Swiper>
          </section>
        );
      })}
    </section>
  );
};

export default ProductList;
