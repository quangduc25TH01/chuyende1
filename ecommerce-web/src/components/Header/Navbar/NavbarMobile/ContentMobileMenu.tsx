'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { GoChevronRight } from 'react-icons/go';
import { usePathname, useRouter } from 'next/navigation';

import Logo from '../../SearchSection/Logo';
import { NavbarList } from '@/config/data/navbar';
import { ICategory } from '@/config/entities';
import { useFetch } from '@/hooks/useFetch';

interface IContentMobileMenu {
  isShowMenuMobile: boolean;
  setIsShowMenuMobile: (value: boolean) => void;
}

const ContentMobileMenu = (props: IContentMobileMenu) => {
  const { isShowMenuMobile, setIsShowMenuMobile } = props;
  const router = useRouter();
  const pathName = usePathname();

  const { data: categories, isLoading } = useFetch<ICategory[]>(
    'categories?client=true',
    {
      revalidateOnFocus: false,
    }
  );

  useEffect(() => {
    if (isShowMenuMobile) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [isShowMenuMobile]);

  if (isLoading) return null;

  return (
    <div
      className={`w-full h-full bg-gray-1 fixed top-0 z-50 transition-all duration-300 overflow-y-auto ${
        isShowMenuMobile ? 'left-0' : '-left-[100%]'
      }`}
    >
      <div className="flex items-center justify-between px-[20px] h-[60px] bg-main text-white">
        <div />
        <Logo />
        <GoChevronRight
          size={30}
          className="cursor-pointer"
          onClick={() => setIsShowMenuMobile(false)}
        />
      </div>

      <div className="flex flex-col bg-white items-start justify-start overflow-y-auto">
        {NavbarList.map((menu, index) => (
          <div
            className={`flex items-center justify-between w-full py-2 px-6 border-b border-gray-1 cursor-pointer hover:text-[#5dac46]
                  ${pathName == menu.url ? ' text-[#5dac46]' : ''}`}
            key={index}
            onClick={() => {
              router.push(menu.url);
              setIsShowMenuMobile(false);
            }}
          >
            <span className="text-base font-medium">{menu.title}</span>
            <GoChevronRight size={20} />
          </div>
        ))}
      </div>

      <div className="bg-white mt-1 h-full">
        <div className="flex items-start gap-3 flex-wrap p-5">
          {categories &&
            categories.map((category) => (
              <Link
                key={category.id}
                href={`/${category.slug}`}
                className="relative flex items-center text-center px-3 justify-center md:w-[calc(33%_-_6px)] w-[calc(50%_-_6px)]
                h-[100px] rounded-[8px] cursor-pointer bg-cover bg-center bg-no-repeat text-[15px] font-medium text-white
                before:content-[''] before:w-full before:h-full before:absolute before:z-[1] before:rounded-[8px] before:bg-[rgba(0,0,0,0.3)]"
                style={{
                  backgroundImage: `url(${category.imageURL})`,
                }}
                onClick={() => {
                  setIsShowMenuMobile(false);
                }}
              >
                <span className="z-[2]">{category.name}</span>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ContentMobileMenu;
