import Link from "next/link";
import Image from "next/image";
import { information } from "@/config/data/information";

function Logo() {
  return (
    <Link href="/">
      <Image
        src={information.shopLogo}
        alt={information.shopName}
        width={100}
        height={28}
        className="dark:invert lg:w-[100px] w-[80px] h-auto"
      />
    </Link>
  );
}
export default Logo;
