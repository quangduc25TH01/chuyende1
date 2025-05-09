import { categories } from "./categories";

interface INavbarList {
  title: string;
  url: string;
}

export const NavbarList: INavbarList[] = [
  { title: "Trang chủ", url: "/" },
  {
    title: "Cửa hàng",
    url: "/cua-hang",
  },
  { title: "Tin tức", url: "/tin-tuc" },
  { title: "Liên hệ", url: "/lien-he" },
];
