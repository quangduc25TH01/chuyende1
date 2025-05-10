import "./styles.scss";
import Product from "@/components/Product";
import TitleSection from "@/components/TitleSection";
import Categories from "./Categories";
import { ICategory, IProduct } from "@/config/entities";
import config from "@/config";

interface IAllProducts {
  categorySelected?: ICategory;
  categories: ICategory[];
}

const fetchProductsByCategoryId = async (categoryId?: number) => {
  try {
    let url = `${config.apiServerUrl}/api/products?client=true`;

    if (categoryId) {
      url += `&categoryId=${categoryId}`;
    }

    const res = await fetch(url, {
      next: { revalidate: 60 },
      cache: "force-cache",
    });

    if (!res.ok) {
      throw new Error("Network response was not ok");
    }

    return res.json();
  } catch (error) {
    return [];
  }
};

async function AllProducts(props: IAllProducts) {
  const { categorySelected, categories } = props;

  const products: IProduct[] = await fetchProductsByCategoryId(
    categorySelected?.id
  );

  return (
    <section>
      <TitleSection
        title={
          categorySelected && categorySelected.name
            ? categorySelected.name
            : "Tất cả sản phẩm"
        }
        isLine={false}
        dataAos="flip-left"
      />

      <div className="flex items-start flex-col">
        <div className="relative w-full md:mb-8 mb-4">
          <Categories
            categorySelected={categorySelected}
            categories={categories}
          />
        </div>
        <div className="w-full">
          <div className="flex items-start items-center justify-start sm:gap-[15px] gap-[10px] flex-wrap all-products">
            {!!products.length ? (
              products.map((product) => (
                <Product key={product.id} product={product} />
              ))
            ) : (
              <p className="w-full text-center text-base">
                Không có sản phẩm nào
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
export default AllProducts;
