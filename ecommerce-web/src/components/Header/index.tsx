import Navbar from "./Navbar";
import SearchSection from "./SearchSection";
import TopBar from "./TopBar";

function Header() {
  return (
    <>
      <header className="w-full bg-white lg:block hidden">
        <TopBar />
        <SearchSection />
      </header>
      <Navbar />
    </>
  );
}

export default Header;
