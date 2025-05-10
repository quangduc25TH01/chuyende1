import Image from "next/image";
import Link from "next/link";
import { IoCheckmarkDoneSharp } from "react-icons/io5";

import "./styles.scss";
import TitleSection from "@/components/TitleSection";
import { information } from "@/config/data/information";

const PrintingServicesPage = () => {
  return (
    <div className="printing-services-page">
      <section className="bg-[#373f50] py-[0]">
        <div className="container lg:py-10 pb-4 pt-10 flex lg:flex-row flex-col items-center lg:gap-[40px] gap-[0] relative">
          <div className="ld:w-1/2 w-full lg:text-left text-center">
            <h1 className="text-white lg:text-[40px] sm:text-[30px] text-[24px] lg:text-left text-center font-bold mb-4">
              Dịch vụ in ấn theo yêu cầu
            </h1>
            <p className="text-white lg:pr-8 lg:text-left text-center">
              Dịch vụ in ấn theo yêu cầu linh hoạt cho doanh nghiệp, cửa hàng,
              các đơn vị và tổ chức với chất lượng cao, thiết kế sáng tạo và
              giao hàng toàn quốc. Biến ý tưởng độc đáo của bạn thành hiện thực
              với dịch vụ in ấn theo yêu cầu của Inchi Việt Nam!
            </p>

            <Link className="contact-button lg:mt-10 mt-8" href="/lien-he">
              Liên hệ
            </Link>
          </div>

          <Image
            src="/images/printing-page/in-theo-yeu-cau.jpg"
            alt="img"
            width={580}
            height={390}
            className="rounded-[8px] lg:translate-y-[70px] translate-y-[40px]"
          />
        </div>
      </section>

      <section className="container flex items-start lg:gap-[70px] gap-[30px] py-[70px] md:flex-row flex-col">
        <div className="md:w-1/3 w-full">
          <Image
            src="/images/printing-page/cmyk.jpg"
            alt="img"
            width={56}
            height={56}
            className="mx-auto mb-2"
          />
          <p>
            <strong>Dịch vụ in ấn toàn diện</strong>, từ thiết kế, in ấn, gia
            công hoàn thiện đến đóng gói và giao hàng, mang đến trải nghiệm đầy
            đủ cho khách hàng
          </p>
        </div>
        <div className="md:w-1/3 w-full">
          <Image
            src="/images/printing-page/design.jpg"
            alt="img"
            width={56}
            height={56}
            className="mx-auto mb-2"
          />
          <p>
            Năng lực <strong>thiết kế in ấn vượt trội</strong> của{" "}
            {information.shopName} đã giúp hàng trăm doanh nghiệp đến từ mọi
            ngành hàng thành công trong chiến dịch tiếp thị của họ
          </p>
        </div>
        <div className="md:w-1/3 w-full">
          <Image
            src="/images/printing-page/distribution.jpg"
            alt="img"
            width={56}
            height={56}
            className="mx-auto mb-2"
          />
          <p>
            Với khả năng <strong>phục vụ trên toàn quốc</strong>, bạn có thể đặt
            in ấn phẩm theo yêu cầu từ bất kỳ địa điểm nào bạn muốn
          </p>
        </div>
      </section>

      <section className="bg-[#f7f7f9]">
        <div className="container">
          <TitleSection title="Dịch vụ in ấn theo yêu cầu cho Doanh nghiệp" />

          <div className="flex items-center lg:flex-row flex-col lg:gap-[40px] gap-[20px]">
            <div className="lg:w-1/2">
              <div className="mb-6">
                <h6 className="mb-2 flex items-center gap-2 text-[18px] font-bold text-black-1">
                  <IoCheckmarkDoneSharp size={25} className="text-[#fea569]" />
                  Quảng bá thương hiệu hiệu quả
                </h6>
                <p>
                  Doanh nghiệp có thể truyền đạt thông điệp và hình ảnh thương
                  hiệu của mình một cách rõ ràng và sáng tạo thông qua các sản
                  phẩm in ấn tùy chỉnh. Mỗi sản phẩm được in ấn theo yêu cầu
                  không chỉ thể hiện rõ phong cách và bản sắc thương hiệu, mà
                  còn giúp thu hút sự chú ý, tạo ấn tượng mạnh mẽ trong tâm trí
                  khách hàng, khuyến khích họ tương tác và kết nối với thương
                  hiệu.
                </p>
              </div>

              <div className="mb-6">
                <h6 className="mb-2 flex items-center gap-2 text-[18px] font-bold text-black-1">
                  <IoCheckmarkDoneSharp size={25} className="text-[#fea569]" />
                  Khả năng tùy chỉnh và cá nhân hóa
                </h6>
                <p>
                  In theo yêu cầu là một giải pháp linh hoạt và hiệu quả cho các
                  doanh nghiệp muốn tạo ra các ấn phẩm tùy chỉnh cho doanh
                  nghiệp của mình. Các sản phẩm in theo yêu cầu có thể được tùy
                  chỉnh bằng văn bản, hình ảnh, logo hay thiết kế mà bạn lựa
                  chọn. Doanh nghiệp có thể cá nhân hóa cho từng sản phẩm nếu
                  muốn.
                </p>
              </div>

              <div className="mb-6">
                <h6 className="mb-2 flex items-center gap-2 text-[18px] font-bold text-black-1">
                  <IoCheckmarkDoneSharp size={25} className="text-[#fea569]" />
                  Kiểm soát số lượng in và tối ưu hóa chi phí
                </h6>
                <p>
                  Với dịch vụ in ấn theo yêu cầu, bạn không cần phải lo lắng về
                  việc in số lượng lớn và tồn kho. Bạn chỉ cần chi trả cho số
                  lượng sản phẩm thực sự cần in, giúp tiết kiệm chi phí và giảm
                  nguy cơ tồn kho.
                </p>
              </div>

              <div className="mb-6">
                <h6 className="mb-2 flex items-center gap-2 text-[18px] font-bold text-black-1">
                  <IoCheckmarkDoneSharp size={25} className="text-[#fea569]" />
                  Tiết kiệm thời gian
                </h6>
                <p>
                  Không cần phải chờ đợi hàng loạt sản phẩm được in xong, khách
                  hàng có thể in số lượng nhỏ hoặc theo nhu cầu cụ thể, giúp
                  tiết kiệm thời gian và đáp ứng nhanh chóng các nhu cầu cấp
                  bách.
                </p>
              </div>
            </div>
            <div className="flex items-start justify-between lg:w-1/2 sm:w-2/3 w-full pb-[500px] pl-4 relative">
              <Image
                src="/images/img.jpg"
                alt="about us"
                width={230}
                height={270}
                className="object-cover rounded-[15px] info-img"
              />

              <Image
                src="/images/img.jpg"
                alt="about us"
                width={230}
                height={270}
                className="object-cover rounded-[15px] info-img"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="container">
        <TitleSection
          title={`Quy trình dịch vụ in ấn theo yêu cầu tại ${information.shopName}`}
          dataAos="flip-left"
        />
        <div className="md:block hidden">
          <div className="flex items-center justify-center gap-10 lg:ml-12 ml-0 ">
            <div className="w-1/4">
              <Image
                src="/images/printing-page/buoc-1-tu-ban-bao-gia.jpg"
                alt="img"
                width={200}
                height={200}
              />
            </div>
            <div className="w-1/4">
              <Image
                src="/images/printing-page/buoc-2-thiet-ke-theo-yeu-cau.jpg"
                alt="img"
                width={200}
                height={200}
              />
            </div>
            <div className="w-1/4">
              <Image
                src="/images/printing-page/buoc-3-in-san-pham.jpg"
                alt="img"
                width={200}
                height={200}
              />
            </div>
            <div className="w-1/4">
              <Image
                src="/images/printing-page/buoc-4-giao-hang.jpg"
                alt="img"
                width={200}
                height={200}
              />
            </div>
          </div>
          <div className="border-t-[2px] border-[#e1e1e1] w-full my-10 max-w-full" />
          <div className="flex items-start justify-between lg:gap-10 gap-6 -mt-[60px]">
            <div className="w-1/4">
              <div className="bg-white border-[2px] border-[#e1e1e1] rounded-full w-[40px] h-[40px] flex items-center justify-center font-bold mx-auto mb-4">
                1
              </div>
              <h6 className="mb-2 font-bold text-[17px] text-center">
                Tư vấn và báo giá
              </h6>
              <p>
                Khách hàng liên hệ với Inchi để nêu rõ yêu cầu in ấn. Đội ngũ tư
                vấn viên của Inchi sẽ lắng nghe và đưa ra giải pháp phù hợp nhất
                dựa trên nhu cầu và ngân sách của bạn
              </p>
            </div>
            <div className="w-1/4">
              <div className="bg-white border-[2px] border-[#e1e1e1] rounded-full w-[40px] h-[40px] flex items-center justify-center font-bold mx-auto mb-4">
                2
              </div>
              <h6 className="mb-2 font-bold text-[17px] text-center">
                Thiết kế theo yêu cầu
              </h6>
              <p>
                Khách hàng lựa chọn mẫu thiết kế có sẵn hoặc nêu ý tưởng thiết
                kế mới. Đội ngũ của Inchi sẽ thiết kế theo yêu cầu của khách
                hàng, tương tác và chỉnh sửa đến khi bạn hoàn toàn hài lòng với
                mẫu thiết kế in ấn
              </p>
            </div>
            <div className="w-1/4">
              <div className="bg-white border-[2px] border-[#e1e1e1] rounded-full w-[40px] h-[40px] flex items-center justify-center font-bold mx-auto mb-4">
                3
              </div>
              <h6 className="mb-2 font-bold text-[17px] text-center">
                In ấn sản phẩm
              </h6>
              <p>
                Sau khi chốt thiết kế cuối cùng, Inchi tiến hành in ấn sản phẩm.
                Với phương pháp in hiện đại, nguyên vật liệu cao cấp, sản phẩm
                in ấn theo yêu cầu tại Inchi luôn chất lượng và độc đáo
              </p>
            </div>
            <div className="w-1/4">
              <div className="bg-white border-[2px] border-[#e1e1e1] rounded-full w-[40px] h-[40px] flex items-center justify-center font-bold mx-auto mb-4">
                4
              </div>
              <h6 className="mb-2 font-bold text-[17px] text-center">
                Giao hàng
              </h6>
              <p>
                Tùy thuộc vào khối lượng, khoảng cách và chi phí, Inchi lựa chọn
                đơn vị vận chuyển phù hợp. Sản phẩm được đóng gói cẩn thận và
                giao đến tận tay khách hàng đúng hẹn
              </p>
            </div>
          </div>
        </div>

        <div className="md:hidden block">
          <div className="mt-10">
            <div className="w-full mb-6">
              <h6 className="mb-2 font-bold text-[17px] text-center">
                1. Tư vấn và báo giá
              </h6>
              <p>
                Khách hàng liên hệ với Inchi để nêu rõ yêu cầu in ấn. Đội ngũ tư
                vấn viên của Inchi sẽ lắng nghe và đưa ra giải pháp phù hợp nhất
                dựa trên nhu cầu và ngân sách của bạn
              </p>
            </div>
            <div className="w-full mb-6">
              <h6 className="mb-2 font-bold text-[17px] text-center">
                2. Thiết kế theo yêu cầu
              </h6>
              <p>
                Khách hàng lựa chọn mẫu thiết kế có sẵn hoặc nêu ý tưởng thiết
                kế mới. Đội ngũ của Inchi sẽ thiết kế theo yêu cầu của khách
                hàng, tương tác và chỉnh sửa đến khi bạn hoàn toàn hài lòng với
                mẫu thiết kế in ấn
              </p>
            </div>
            <div className="w-full mb-6">
              <h6 className="mb-2 font-bold text-[17px] text-center">
                3. In ấn sản phẩm
              </h6>

              <p>
                Sau khi chốt thiết kế cuối cùng, Inchi tiến hành in ấn sản phẩm.
                Với phương pháp in hiện đại, nguyên vật liệu cao cấp, sản phẩm
                in ấn theo yêu cầu tại Inchi luôn chất lượng và độc đáo
              </p>
            </div>
            <div className="w-full">
              <h6 className="mb-2 font-bold text-[17px] text-center">
                4. Giao hàng
              </h6>

              <p>
                Tùy thuộc vào khối lượng, khoảng cách và chi phí, Inchi lựa chọn
                đơn vị vận chuyển phù hợp. Sản phẩm được đóng gói cẩn thận và
                giao đến tận tay khách hàng đúng hẹn
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="text-center md:py-[50px] py-[10px]">
        <div className="container">
          <h2 className="text-main font-bold mb-6">
            Bạn đã sẵn sàng cho dịch vụ in ấn theo yêu cầu?
          </h2>

          <Link className="contact-button mx-auto md:mb-0 mb-4" href="/lien-he">
            Tư vấn báo giá ngay
          </Link>
        </div>
      </section>
    </div>
  );
};

export default PrintingServicesPage;
