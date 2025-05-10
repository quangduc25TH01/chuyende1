'use client';

import React from 'react';
import { FaAngleDoubleUp } from 'react-icons/fa';

import { useWindowScrollPositions } from '@/hooks/useWindowScrollPositions';

export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

const ButtonScrollOnTop = (props: any) => {
  const { className } = props;
  const { scrollY } = useWindowScrollPositions();

  const isShowButtonScrollToTop = scrollY > 40;

  return (
    <div
      className={`${
        className ? className : ''
      } bg-main w-10 h-10 fixed bottom-[12px] right-[20px] rounded-full
      border-0 flex justify-center items-center cursor-pointer ${
        isShowButtonScrollToTop ? 'opacity-50' : '!opacity-0'
      } transition-opacity scroll-to-top hover:opacity-100`}
      onClick={scrollToTop}
    >
      <FaAngleDoubleUp className="icon-double-up text-[17px] text-white" />
    </div>
  );
};

export default ButtonScrollOnTop;
