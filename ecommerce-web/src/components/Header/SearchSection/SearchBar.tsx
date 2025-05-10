"use client";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { FiSearch } from "react-icons/fi";
import styles from "./styles.module.scss";
import SearchResults from "./SearchResults";
import Product from "@/api/Product";
import { IProduct } from "@/config/entities";

function SearchBar() {
  const [searchValue, setSearchValueInput] = useState("");
  const [isSearchResultPanelOpen, setIsSearchResultPanelOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<IProduct[]>([]);
  const [searching, setSearching] = useState(false);

  const handleChangeSearchValue = (value: string) => {
    setSearchValueInput(value);
    if (!value) {
      setIsSearchResultPanelOpen(false);
    }
  };

  const handleSearch = async () => {
    try {
      if (!searchValue.trim()) {
        return;
      }

      setSearching(true);
      const { data } = await Product.search(searchValue);

      setSearchResults(data);
      setIsSearchResultPanelOpen(true);
    } catch (error) {
      console.log("error", error);
    } finally {
      setSearching(false);
    }
  };

  const handleOpenSearchResultPanel = (isOpen: boolean) => {
    setIsSearchResultPanelOpen(isOpen);
  };

  return (
    <div className="relative">
      <div className={`flex items-center ${styles.search_bar}`}>
        <input
          className="font-medium"
          placeholder="Tìm kiếm danh mục, sản phẩm..."
          onChange={(e) => handleChangeSearchValue(e.target.value)}
          value={searchValue}
        />
        <button onClick={handleSearch}>
          {searching ? (
            <AiOutlineLoading3Quarters
              className="text-white text-sm mx-auto"
              size={20}
              style={{
                animation: "spin 1s linear infinite",
              }}
            />
          ) : (
            <FiSearch className="text-white mx-auto" />
          )}
        </button>
      </div>

      {isSearchResultPanelOpen && (
        <SearchResults
          searchResults={searchResults}
          handleOpenSearchResultPanel={handleOpenSearchResultPanel}
        />
      )}
    </div>
  );
}
export default SearchBar;
