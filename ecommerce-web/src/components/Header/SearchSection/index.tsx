import Cart from "./Cart";
import Logo from "./Logo";
import SearchBar from "./SearchBar";

function SearchSection() {
  return (
    <div className="container flex items-center justify-between py-5">
      <Logo />
      <SearchBar />
      <Cart />
    </div>
  );
}
export default SearchSection;
