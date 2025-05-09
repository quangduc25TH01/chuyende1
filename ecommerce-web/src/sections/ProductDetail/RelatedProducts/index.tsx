'use client';

import { Navigation, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import './styles.scss';

import Product from '@/components/Product';
import TitleSection from '@/components/TitleSection';
import { IProduct } from '@/config/entities';
import { useFetch } from '@/hooks/useFetch';

const RelatedProducts = ({
  categoryId,
  currentProductId,
}: {
  categoryId: number;
  currentProductId: number;
}) => {
  const { data: products } = useFetch<IProduct[]>(
    `products?client=true&categoryId=${categoryId}`,
    {
      revalidateOnFocus: false,
      caches: ['products'],
    }
  );

  const productsFilters = products.filter(
    (product) => product.id !== currentProductId
  );

  if (productsFilters.length === 0) {
    return null;
  }

  return (
    <section>
      <TitleSection title="Sản phẩm tương tự" />

      <Swiper
        navigation={true}
        autoplay={{
          delay: 3000,
          pauseOnMouseEnter: true,
        }}
        breakpoints={{
          1024: {
            slidesPerView: 4,
            spaceBetween: 30,
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
      >
        {productsFilters &&
          productsFilters.map((product) => (
            <SwiperSlide key={product.id}>
              <Product product={product} />
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
};

export default RelatedProducts;
