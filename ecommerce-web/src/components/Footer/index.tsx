import Link from "next/link";
import { FaFacebookF, FaHome, FaTiktok } from "react-icons/fa";
import { MdOutlineChevronRight } from "react-icons/md";
import { AiOutlineMail, AiFillPhone } from "react-icons/ai";
import Image from "next/image";
import { BsInstagram, BsYoutube } from "react-icons/bs";
import { information } from "@/config/data/information";
import FacebookEmbedComponent from "./FacebookEmbed";

interface ItemLinkProps {
  label: string;
  url: string;
}

const ItemLink = (props: ItemLinkProps) => {
  const { label, url } = props;
  return (
    <Link
      href={url}
      className="md:text-[15px] text-sm flex items-center hover:text-green-2 mb-3 last:mb-0"
    >
      <MdOutlineChevronRight size={20} className="mr-2 text-green-2" />
      <span>{label}</span>
    </Link>
  );
};

const Footer = () => {
  return (
    <>
      <footer className="w-full bg-[#292a2d] text-white sm:rounded-t-[60px] rounded-t-[30px] sm:mt-[30px] mt-[20px] text">
        <section className="container py-[40px] px-3 lg:flex hidden items-start justify-between gap-6">
          <div>
            <h3 className="mb-2 capitalize">Giới thiệu</h3>
            <ItemLink label="Sản phẩm" url="/cua-hang" />
            <ItemLink label="Tin tức" url="/tin-tuc" />
            <ItemLink label="Liên hệ" url="/lien-he" />

            <Image
              className="mt-8 rounded-lg"
              src="/zalo_qrcode.jpg"
              alt="qrcode"
              width={120}
              height={120}
            />
          </div>
          <div>
            <h3 className="mb-2 capitalize">Hỗ trợ khách hàng</h3>
            <ItemLink
              label="Hình thức đặt hàng"
              url="/ho-tro#hinh-thuc-dat-hang"
            />
            <ItemLink
              label="Chính sách bán hàng"
              url="/ho-tro#chinh-sach-ban-hang"
            />
            <ItemLink
              label="Chính sách thanh toán"
              url="/ho-tro#chinh-sach-thanh-toan"
            />
            <ItemLink
              label="Chính sách bảo hành"
              url="/ho-tro#chinh-sach-bao-hanh"
            />
            <ItemLink
              label="Chính sách đổi trả"
              url="/ho-tro#chinh-sach-doi-tra"
            />
            <p className="font-bold mt-8">Kết nối với chúng tôi</p>
            <div className="flex items-center gap-4 mt-3">
              <a href={information.facebook} target="_blank" rel="noreferrer">
                <FaFacebookF size={25} className="cursor-pointer" />
              </a>
              <a href={information.instagram} target="_blank" rel="noreferrer">
                <BsInstagram size={25} className="cursor-pointer" />
              </a>
              <a href={information.tiktok} target="_blank" rel="noreferrer">
                <FaTiktok size={25} className="cursor-pointer" />
              </a>
              <a href={information.youtube} target="_blank" rel="noreferrer">
                <BsYoutube size={25} className="cursor-pointer" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="mb-2 capitalize">Liên hệ</h3>
            <ul>
              <li className="flex items-start mb-3">
                <FaHome className="mr-2 text-green-2" size={20} />
                <span className="max-w-[250px]">{information.address}</span>
              </li>
              <li className="flex items-center mb-3">
                <AiFillPhone className="mr-2 text-green-2" size={20} />
                <>
                  {information.phones.map((phone, index) => (
                    <span key={index}>
                      &nbsp;{phone}
                      {index < information.phones.length - 1 ? " - " : ""}
                    </span>
                  ))}
                </>
              </li>

              {information.emails.map((email, index) => (
                <li key={index} className="flex items-center mb-3">
                  <AiOutlineMail className="mr-2 text-green-2" size={20} />
                  {email}
                </li>
              ))}

              <li className="flex items-center mt-8">
                <Image
                  src="/noti_logo.png"
                  alt="logo"
                  width={200}
                  height={75}
                />
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 capitalize">Fanpage</h3>
            <FacebookEmbedComponent />
          </div>
        </section>

        {/* mobile */}
        <section className="container sm:py-[40px] py-[25px] flex flex-col lg:hidden items-start justify-between gap-4 text-sm">
          <div className="flex items-start sm:gap-14 gap-6">
            <div>
              <h3 className="mb-2 capitalize">Giới thiệu</h3>
              <ItemLink label="Sản phẩm" url="/cua-hang" />
              <ItemLink label="Tin tức" url="/tin-tuc" />
              <ItemLink label="Liên hệ" url="/lien-he" />
            </div>
            <div>
              <h3 className="mb-2 capitalize">Hỗ trợ khách hàng</h3>
              <ItemLink
                label="Hình thức đặt hàng"
                url="/ho-tro#hinh-thuc-dat-hang"
              />
              <ItemLink
                label="Chính sách bán hàng"
                url="/ho-tro#chinh-sach-ban-hang"
              />
              <ItemLink
                label="Chính sách thanh toán"
                url="/ho-tro#chinh-sach-thanh-toan"
              />
              <ItemLink
                label="Chính sách bảo hành"
                url="/ho-tro#chinh-sach-bao-hanh"
              />
              <ItemLink
                label="Chính sách đổi trả"
                url="/ho-tro#chinh-sach-doi-tra"
              />
            </div>
            <div className="sm:block hidden">
              <h3 className="mb-2 capitalize">Fanpage</h3>
              <FacebookEmbedComponent />
            </div>
          </div>
          <div className="flex items-end w-full relative my-4">
            <div>
              <h3 className="mb-2 capitalize">Liên hệ</h3>
              <ul>
                <li className="flex items-start mb-3">
                  <FaHome
                    className="mr-2 text-green-2 min-w-[20px]"
                    size={20}
                  />
                  <span className="max-w-[300px]">{information.address}</span>
                </li>
                <li className="flex items-center mb-3">
                  <AiFillPhone className="mr-2 text-green-2" size={20} />
                  <>
                    {information.phones.map((phone, index) => (
                      <span key={index}>
                        {phone}
                        {index < information.phones.length - 1 ? ` - ` : ""}
                      </span>
                    ))}
                  </>
                </li>

                {information.emails.map((email, index) => (
                  <li key={index} className="flex items-center mb-3">
                    <AiOutlineMail className="mr-2 text-green-2" size={20} />
                    {email}
                  </li>
                ))}
              </ul>
            </div>
            <Image
              className="rounded-lg absolute right-0 min-[500px]:right-[25%] bottom-0 min-[350px]:w-[80px] min-[350px]:h-[80px]"
              src="/zalo_qrcode.jpg"
              alt="qrcode"
              width={110}
              height={110}
            />
          </div>
          <div className="flex items-center min-[500px]:justify-start justify-between min-[500px]:gap-10 gap-0 w-full min-[350px]:flex-row flex-col">
            <div>
              <p className="font-bold">Kết nối với chúng tôi</p>
              <div className="flex items-center gap-4 mt-3">
                <a href={information.facebook} target="_blank" rel="noreferrer">
                  <FaFacebookF size={25} className="cursor-pointer" />
                </a>
                <a
                  href={information.instagram}
                  target="_blank"
                  rel="noreferrer"
                >
                  <BsInstagram size={25} className="cursor-pointer" />
                </a>
                <a href={information.tiktok} target="_blank" rel="noreferrer">
                  <FaTiktok size={25} className="cursor-pointer" />
                </a>
                <a href={information.youtube} target="_blank" rel="noreferrer">
                  <BsYoutube size={25} className="cursor-pointer" />
                </a>
              </div>
            </div>

            <Image
              src="/noti_logo.png"
              alt="logo"
              width={150}
              height={75}
              className="min-[350px]:mt-0 mt-4"
            />
          </div>
        </section>

        <div className="container border-t w-full text-center text-white text-sm py-4">
          Copyright 2023 © Thiết kế website{" "}
          <strong>{information.shopName}</strong> bởi BDU
        </div>
      </footer>
    </>
  );
};

export default Footer;
