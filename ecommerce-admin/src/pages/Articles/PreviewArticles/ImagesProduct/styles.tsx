import styled from 'styled-components';

export const ImagesProductStyled = styled.div`
  .swiper-container {
    border-radius: 8px;
    .swiper-button-prev,
    .swiper-button-next {
      opacity: 0;
      transition:
        transform 0.3s,
        opacity 0.3s;
      &::after {
        font-size: 30px;
        font-weight: bolder;
        color: #ffffff;
      }
    }
    .swiper-button-next {
      right: 2%;
      transform: translateX(-20%);
    }
    .swiper-button-prev {
      left: 2%;
      transform: translateX(20%);
    }
    &:hover {
      .swiper-button-prev,
      .swiper-button-next {
        opacity: 1;
        transform: translateX(0);
      }
    }
    .swiper-pagination {
      .swiper-pagination-bullet {
        width: 12px;
        height: 12px;
        background-color: #fff;
      }
    }
  }

  .slide-thumb .swiper-slide {
    opacity: 0.5;
  }

  .slide-thumb .swiper-slide-thumb-active {
    opacity: 1;
  }
`;
