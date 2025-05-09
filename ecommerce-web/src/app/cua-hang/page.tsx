import { Metadata } from "next";

import AllProducts from "@/sections/AllProducts";
import config from "@/config";

export const metadata: Metadata = {
  title: "Cửa hàng",
  description: "Tất cả các sản phẩm",
  icons: "ly-icon.png",
};

const fetchCategories = async () => {
  try {
    const res = await fetch(
      `${config.apiServerUrl}/api/categories?client=true`,
      {
        cache: "no-cache",
      }
    );

    if (!res.ok) {
      throw new Error("Network response was not ok");
    }

    return res.json();
  } catch (error) {
    return [];
  }
};

export default async function Products() {
  const categories = await fetchCategories();
  return (
    <main className="container">
      <AllProducts categories={categories} />
    </main>
  );
}
