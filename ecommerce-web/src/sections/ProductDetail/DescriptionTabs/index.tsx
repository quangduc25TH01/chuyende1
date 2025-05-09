"use client";

import React, { useState } from "react";

import DescriptionProduct from "./DescriptionProduct";
import ReviewsProduct from "./ReviewsProduct";

import "./styles.scss";
import { IProduct } from "@/config/entities";

export const TypeTab = {
  DescriptionProduct: "description-product",
  ReviewsProduct: "reviews-product",
  InfoPayments: "info-payments",
};

const TAB_INDEX = {
  DescriptionProductTab: 1,
  ReviewsProductTab: 2,
};

const TabItems = [
  {
    id: TAB_INDEX.DescriptionProductTab,
    title: "Mô tả",
  },
  {
    id: TAB_INDEX.ReviewsProductTab,
    title: "Đánh giá",
  },
];

interface TabIndexProps {
  title: string;
  isActive: boolean;
  className: string;
  onItemClicked: () => void;
}

const TabIndex: React.FC<any> = (props: TabIndexProps) => {
  const { title, isActive, className, onItemClicked } = props;

  return (
    <div
      onClick={onItemClicked}
      className={`
        flex items-center justify-around sm:justify-center cursor-pointer text-base font-medium sm:px-16 ${
          className ? className : ""
        } ${isActive ? "active" : ""}`}
    >
      <div className="font-bold">{title}</div>
    </div>
  );
};

const DescriptionDetail = ({ product }: { product: IProduct }) => {
  const [isActive, setIsActive] = useState(TAB_INDEX.DescriptionProductTab);

  return (
    <div className="detail-product-wrapper">
      <div className="flex items-center gap-1">
        {TabItems.map(({ id, title }) => (
          <TabIndex
            key={id}
            title={title}
            isActive={isActive === id}
            onItemClicked={() => setIsActive(id)}
            className="tab-item"
          />
        ))}
      </div>

      <div className="py-4 content">
        {isActive === TAB_INDEX.DescriptionProductTab && (
          <DescriptionProduct product={product} />
        )}
        {isActive === TAB_INDEX.ReviewsProductTab && (
          <ReviewsProduct productId={product.id} />
        )}
      </div>
    </div>
  );
};

export default DescriptionDetail;
