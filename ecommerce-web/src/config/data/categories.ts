export interface ICategory {
  id: number;
  title: string;
  slug: string;
  icon: string;
  image: string;
  isHideOnPage?: boolean;
}

const image = '/images/products/product-image.jpg';

export const categories: ICategory[] = [
  {
    id: 1,
    title: 'Ly giấy',
    slug: 'ly-giay',
    icon: '/icons/ly-coc.png',
    image,
  },
  {
    id: 3,
    title: 'Ly nhựa',
    slug: 'ly-nhua',
    icon: '/icons/ly-coc.png',
    image,
  },
  {
    id: 2,
    title: 'Tô / Hộp giấy',
    slug: 'san-pham-giay',
    icon: '/icons/hop.png',
    image,
  },
  {
    id: 4,
    title: 'Tô / Hộp nhựa',
    slug: 'san-pham-nhua',
    icon: '/icons/to.png',
    image,
  },
  {
    id: 5,
    title: 'Hộp bã mía',
    slug: 'san-pham-ba-mia',
    icon: '/icons/hop.png',
    image,
  },
  {
    id: 6,
    title: 'Hộp nhôm',
    slug: 'san-pham-nhom',
    icon: '/icons/hop-qua.png',
    image,
  },
  {
    id: 7,
    title: 'Túi giấy',
    slug: 'tui-giay',
    icon: '/icons/tui.png',
    image,
  },
  {
    id: 8,
    title: 'Ống hút',
    slug: 'ong-hut',
    icon: '/icons/dao-dia.png',
    image,
  },
  {
    id: 9,
    title: 'Sản phẩm khác',
    slug: 'san-pham-khac',
    icon: '/icons/dao-dia.png',
    image,
    isHideOnPage: true,
  },
];
