"use client";

import { BsCart4 } from "react-icons/bs";
import { ACTION_TYPES, useCart } from "@/context/CartContext";
import { IProduct } from "@/config/entities";

interface IAddToCart {
  product: IProduct;
  text?: string;
}

const AddToCart = (props: IAddToCart) => {
  const { product, text } = props;
  const { dispatch, handleOpenCartSlider } = useCart();

  const addToCart = () => {
    const newProduct = {
      id: product.id,
      code: product.code,
      name: product.name,
      image: product.images[0].imageUrl,
      price: product.price,
      quantity: 1,
    };

    dispatch({ type: ACTION_TYPES.ADD_PRODUCT, payload: newProduct });
    handleOpenCartSlider(true);
  };

  return (
    <>
      <div
        className="flex items-center font-medium text-main hover:text-red-1 cursor-pointer gap-2"
        onClick={() => addToCart()}
      >
        <BsCart4 size={20} />
        {text && <span className="sm:text-base text-sm">{text}</span>}
      </div>
    </>
  );
};

export default AddToCart;
