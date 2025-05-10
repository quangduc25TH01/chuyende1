const productImage = '/images/products/product-image.jpg';

export interface IProduct {
  id: number;
  image: string;
  name: string;
  categoryId: number;
  slug: string;
}

export const products: IProduct[] = [
  {
    id: 1,
    image: productImage,
    name: 'Ly giấy 8oz',
    slug: 'ly-giay-8oz',
    categoryId: 1,
  },
  {
    id: 2,
    image: productImage,
    name: 'Ly nhựa Kraft',
    slug: 'ly-nhua-kraft',
    categoryId: 3,
  },
  {
    id: 3,
    image: productImage,
    name: 'Tô giấy 10oz',
    slug: 'ly-giay-10oz',
    categoryId: 2,
  },
  {
    id: 4,
    image: productImage,
    name: 'Hộp bã mía 12oz',
    slug: 'hop-ba-mia-12oz',
    categoryId: 5,
  },
  {
    id: 5,
    image: productImage,
    name: 'Ống hút giấy',
    slug: 'ong-hut-giay',
    categoryId: 8,
  },
  {
    id: 6,
    image: productImage,
    name: 'Túi giấy Kraft',
    slug: 'tui-giay-kraft',
    categoryId: 7,
  },
  {
    id: 7,
    image: productImage,
    name: 'Hộp nhôm 16oz',
    slug: 'hop-nhom-16oz',
    categoryId: 6,
  },
  {
    id: 8,
    image: productImage,
    name: 'Ly giấy 12oz',
    slug: 'ly-giay-12oz',
    categoryId: 1,
  },
  {
    id: 9,
    image: productImage,
    name: 'Tô nhựa 12oz',
    slug: 'to-nhua-12oz',
    categoryId: 4,
  },
  {
    id: 10,
    image: productImage,
    name: 'Hộp nhôm 12oz',
    slug: 'hop-nhom-12oz',
    categoryId: 9,
  },
];
