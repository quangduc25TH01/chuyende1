const ArticleCategoryOptions: any = {
  all: "Tất cả",
  product: "Sản phẩm",
  promotion: "Khuyến mãi",
  other: "Tin tức khác",
};

const Categories = () => {
  return (
    <div className="lg:w-1/4 lg:mt-0 mt-2 w-full">
      <div className="border border-main rounded-[8px]">
        <p className="bg-main px-3 py-3 rounded-tl-[8px] rounded-tr-[8px] text-white text-[17px] font-medium">
          Danh mục tin tức
        </p>
        <div className="px-3 py-3">
          <ul className="font-medium">
            {Object.keys(ArticleCategoryOptions).map((key) => (
              <li
                key={key}
                className="py-1 hover:underline cursor-pointer hover:text-[#5dac46] text-sm"
              >
                {ArticleCategoryOptions[key]}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Categories;
