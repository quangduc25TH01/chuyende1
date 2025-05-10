"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavbarList } from "@/config/data/navbar";
import Categories from "./Categories";
import Mobile from "./NavbarMobile/Mobile";
import ContentMobileMenu from "./NavbarMobile/ContentMobileMenu";

const Navbar = () => {
  const pathName = usePathname();
  const [isShowMenuMobile, setIsShowMenuMobile] = useState(false);

  const isActive = (path: string) => {
    return pathName === path || pathName.startsWith(`${path}/`);
  };

  return (
    <>
      <nav className="shadow-navbar sticky top-0 bg-gradient-to-b from-blue-7 to-blue-8 z-40 h-[60px]">
        <div className="container items-center h-full lg:flex hidden">
          <Categories />
          <div className="flex items-center xl:gap-4 gap-3 text-white ml-6 font-medium text-base">
            {NavbarList.map((item, idx) => (
              <Link
                key={idx}
                href={item.url}
                className={`rounded-[4px] transition hover:text-green-4 px-3 py-2 leading-none
                  ${isActive(item.url) ? "bg-white text-green-4" : ""}`}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>

        <Mobile setIsShowMenuMobile={setIsShowMenuMobile} />
      </nav>

      <ContentMobileMenu
        isShowMenuMobile={isShowMenuMobile}
        setIsShowMenuMobile={setIsShowMenuMobile}
      />
    </>
  );
};

export default Navbar;
