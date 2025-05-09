"use client";

import { IProduct } from "@/config/entities";
import React, { useState } from "react";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";

const ReadMore = ({ content }: { content: string }) => {
  const [isReadMore, setIsReadMore] = useState(false);

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  const contentShow = isReadMore ? content : content.slice(0, 1500);
  const contentLength = content.length;

  return (
    <>
      <div
        className="editor-content"
        dangerouslySetInnerHTML={{ __html: contentShow }}
      />

      {contentLength > 1500 && (
        <div
          onClick={toggleReadMore}
          className="cursor-pointer text-main text-center relative h-[40px] leading-[40px]"
        >
          <span className="flex items-center justify-center font-[500] text-base">
            {!isReadMore ? (
              <>
                Xem thêm <MdArrowDropDown size={35} />
              </>
            ) : (
              <>
                Thu gọn <MdArrowDropUp size={35} />
              </>
            )}
          </span>

          {!isReadMore && (
            <div
              className="h-[40px] absolute -top-[35px] w-full"
              style={{
                background: `linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,1))`,
              }}
            />
          )}
        </div>
      )}
    </>
  );
};

const DescriptionProduct = ({ product }: { product: IProduct }) => (
  <ReadMore content={product.description} />
);
export default DescriptionProduct;
