"use client";

import React, {
  createContext,
  useReducer,
  useContext,
  useEffect,
  ReactNode,
  useState,
} from "react";

export enum ACTION_TYPES {
  ADD_PRODUCT = "ADD_PRODUCT",
  REMOVE_PRODUCT = "REMOVE_PRODUCT",
  UPDATE_CART = "UPDATE_CART",
  UPDATE_QUANTITY = "UPDATE_QUANTITY",
  UPDATE_UNIT_OF_MEASURE = "UPDATE_UNIT_OF_MEASURE",
  CLEAR_CART = "CLEAR_CART",
  INITIALIZE_CART = "INITIALIZE_CART",
}

export interface ProductItemCart {
  id: number;
  code: string;
  name: string;
  image: string;
  quantity: number;
  price: number;
}

type CartState = ProductItemCart[];

type CartAction =
  | { type: ACTION_TYPES.ADD_PRODUCT; payload: ProductItemCart }
  | { type: ACTION_TYPES.REMOVE_PRODUCT; payload: number }
  | { type: ACTION_TYPES.UPDATE_CART; payload: CartState }
  | {
      type: ACTION_TYPES.UPDATE_QUANTITY;
      payload: {
        id: number;
        quantity: number;
      };
    }
  | { type: ACTION_TYPES.CLEAR_CART }
  | { type: ACTION_TYPES.INITIALIZE_CART; payload: CartState };

const CartContext = createContext<{
  cart: CartState;
  dispatch: React.Dispatch<CartAction>;
  isSliderCartOpen: boolean;
  handleOpenCartSlider: (isOpen: boolean) => void;
} | null>(null);

const CART_STORAGE_KEY = "packing_cart";

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case ACTION_TYPES.ADD_PRODUCT: {
      const existingItem = state.find((item) => item.id === action.payload.id);
      if (existingItem) {
        return state.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...state, { ...action.payload, quantity: 1 }];
    }

    case ACTION_TYPES.UPDATE_CART:
      return action.payload;

    case ACTION_TYPES.REMOVE_PRODUCT:
      return state.filter((item) => item.id !== action.payload);

    case ACTION_TYPES.UPDATE_QUANTITY:
      return state.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );

    case ACTION_TYPES.CLEAR_CART:
      return [];

    case ACTION_TYPES.INITIALIZE_CART:
      return action.payload;

    default:
      throw new Error("Unhandled action type");
  }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);
  const [isSliderCartOpen, setIsSliderCartOpen] = useState(false);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (storedCart) {
      dispatch({
        type: ACTION_TYPES.INITIALIZE_CART,
        payload: JSON.parse(storedCart),
      });
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (cart.length === 0) {
      localStorage.removeItem(CART_STORAGE_KEY);
      return;
    }

    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (isSliderCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isSliderCartOpen]);

  const handleOpenCartSlider = (isOpen: boolean) => {
    setIsSliderCartOpen(isOpen);
  };

  return (
    <CartContext.Provider
      value={{ cart, dispatch, isSliderCartOpen, handleOpenCartSlider }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
