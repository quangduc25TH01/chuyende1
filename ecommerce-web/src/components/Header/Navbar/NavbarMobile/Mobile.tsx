import { useState } from 'react';
import { HiBars3 } from 'react-icons/hi2';
import { IoIosSearch } from 'react-icons/io';

import SearchResults from './SearchResults';
import Cart from '../../SearchSection/Cart';
import Logo from '../../SearchSection/Logo';

interface IMobile {
  setIsShowMenuMobile: (value: boolean) => void;
}

const Mobile = (props: IMobile) => {
  const { setIsShowMenuMobile } = props;

  const [isSearchResultPanelOpen, setIsSearchResultPanelOpen] = useState(false);

  const handleOpenSearchResultPanel = (isOpen: boolean) => {
    setIsSearchResultPanelOpen(isOpen);
  };

  return (
    <div className="container h-full lg:hidden flex items-center justify-between relative">
      <HiBars3
        size={30}
        className="cursor-pointer text-white"
        onClick={() => setIsShowMenuMobile(true)}
      />
      <Logo />
      <div className="flex items-center gap-4 sm:gap-5">
        <IoIosSearch
          className="text-white mx-auto cursor-pointer"
          size={28}
          onClick={() => setIsSearchResultPanelOpen(!isSearchResultPanelOpen)}
        />
        {isSearchResultPanelOpen && (
          <SearchResults
            handleOpenSearchResultPanel={handleOpenSearchResultPanel}
          />
        )}

        <Cart />
      </div>
    </div>
  );
};

export default Mobile;
