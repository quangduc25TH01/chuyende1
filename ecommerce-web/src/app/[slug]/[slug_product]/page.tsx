import ProductDetail from "@/sections/ProductDetail";
import { notFound } from "next/navigation";
import config from "@/config";
import { IProduct } from "@/config/entities";

export const revalidate = 60;

async function getProducts() {
  try {
    const res = await fetch(`${config.apiServerUrl}/api/products?client=true`, {
      next: { revalidate: 60 },
      cache: "no-cache",
    });

    return res.json();
  } catch (error) {
    return [];
  }
}

async function getProductBySlug(slug: string) {
  try {
    const res = await fetch(
      `${config.apiServerUrl}/api/products/${slug}?client=true`,
      {
        next: { revalidate: 60 },
        cache: "no-cache",
      }
    );

    return res.json();
  } catch (error) {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug_product: string };
}) {
  const product = await getProductBySlug(params.slug_product);

  if (!product) {
    return {
      title: "Sản phẩm không tồn tại",
      description: "Không tìm thấy sản phẩm",
    };
  }

  return {
    title: product.name || "Sản phẩm",
    description: `Sản phẩm thuộc ${product.category.name}`,
    icons: product.category.logoURL,
  };
}

export async function generateStaticParams() {
  const products: IProduct[] = await getProducts();

  return products.map((_product) => ({
    slug_product: _product.slug.toString(),
  }));
}

export default async function ProductDetailPage({
  params,
}: {
  params: { slug_product: string };
}) {
  const product = await getProductBySlug(params.slug_product);

  if (!product) {
    return notFound();
  }

  return (
    <main className="container">
      <ProductDetail product={product} />
    </main>
  );
}
