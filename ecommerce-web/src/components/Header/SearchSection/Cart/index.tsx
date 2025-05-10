'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { BsCart4 } from 'react-icons/bs';
import { useCart } from '@/context/CartContext';
import SlideCart from '@/components/SlideCart';

function Cart() {
  const { cart, isSliderCartOpen, handleOpenCartSlider } = useCart();

  useEffect(() => {
    if (isSliderCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isSliderCartOpen]);

  return (
    <div>
      <Link
        href="/gio-hang"
        className="uppercase text-sm font-bold flex items-center lg:text-main text-white cursor-pointer transition hover:text-red-1"
      >
        <span className="lg:block hidden">Giỏ hàng</span>
        <div className="relative lg:ml-2 ml-0">
          <BsCart4 size={25} />
          {cart.length > 0 && (
            <div
              className="absolute lg:-top-4 lg:right-0.5 -top-[5px] -right-[3px] border rounded-full text-white bg-red-1 
          lg:w-5 w-4 lg:h-5 h-4 flex items-center justify-center text-xs"
            >
              {cart.length}
            </div>
          )}
        </div>
      </Link>
      <SlideCart
        isOpenCart={isSliderCartOpen}
        handleOpenCart={handleOpenCartSlider}
      />
    </div>
  );
}
export default Cart;
