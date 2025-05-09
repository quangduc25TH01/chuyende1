import TitleSection from "@/components/TitleSection";
import { information } from "@/config/data/information";

export default function PolicyPage() {
  return (
    <div className="container">
      <section id="hinh-thuc-dat-hang" className="pt-[80px]">
        <TitleSection title="Hình thức đặt hàng" />
        <ul className="list-decimal pl-[20px]">
          <li className="mb-4 font-bold">
            Cách thứ nhất:
            <ul className="list-disc pl-[20px] font-[400]">
              <li>
                Gọi điện thoại đến số hotline nhân viên của công ty sẽ tư vấn và
                hỗ trợ cho khác hàng tất cả các thông tin về sản phẩm và dịch
                vụ..
              </li>
            </ul>
          </li>
          <li className="mb-4 font-bold">
            Cách thứ hai:{" "}
            <span className="font-[400]"> Đặt hàng qua website:</span>
            <ul className="list-disc pl-[20px] font-[400]">
              <li>
                Bấm vào nút “Add to cart” để đưa sản phẩm vào giỏ hàng sau khi
                đã lựa chọn sản phẩm mình muốn mua.
              </li>
              <li>
                Sau khi chọn xong sản phẩm đặt mua, vào giỏ hàng kiểm tra lại
                thông tin sản phẩm.
              </li>
              <li>
                Bấm nút “Liên hệ đặt hàng”, tại đây vui lòng điền đầy các thông
                tin theo yêu cầu của chúng tôi và tiến hành đặt hàng.
              </li>
            </ul>
          </li>
        </ul>
        <p className="mt-2">
          Đơn hàng của bạn đã hoàn tất và được chuyển tới chúng tôi. Chúng tôi
          sẽ xử lý và liên lạc lại với bạn để thực hiện giao dịch.
        </p>
      </section>

      <section id="chinh-sach-ban-hang" className="pt-[80px]">
        <TitleSection title="Chính sách bán hàng" />
        <ul className="list-decimal pl-[20px]">
          <li className="mb-4 font-bold">
            Đặt hàng:
            <ul className="list-disc pl-[20px] font-[400]">
              <li>
                Cách thức và phương tiện mà khách hàng có thể đặt hàng, bao gồm
                trên trang web của công ty, qua điện thoại, qua email, hoặc
                thông qua đại lý.
              </li>
              <li>
                Yêu cầu cung cấp thông tin đầy đủ và chính xác về sản phẩm, số
                lượng, và thông tin liên hệ để đảm bảo xác nhận đơn hàng chính
                xác.
              </li>
            </ul>
          </li>
          <li className="mb-4 font-bold">
            Xác nhận đơn hàng:
            <ul className="list-disc pl-[20px] font-[400]">
              <li>
                Quy định về thời gian và phương thức xác nhận đơn hàng sau khi
                khách hàng đặt hàng.
              </li>
              <li>
                Quy trình xác nhận đơn hàng có thể bao gồm việc gửi lại email
                xác nhận hoặc gọi điện thoại để xác nhận thông tin đơn hàng.
              </li>
            </ul>
          </li>
          <li className="mb-4 font-bold">
            Vận chuyển và giao hàng:
            <ul className="list-disc pl-[20px] font-[400]">
              <li>
                Thông tin về chi phí vận chuyển dự kiến và các tùy chọn giao
                hàng khác nhau.
              </li>
              <li>
                Thời gian giao hàng dự kiến và quy định về đổi trả sản phẩm
                trong trường hợp sản phẩm bị hỏng hoặc giao hàng không đúng
                hàng.
              </li>
            </ul>
          </li>
          <li className="mb-4 font-bold">
            Hủy đơn hàng:
            <ul className="list-disc pl-[20px] font-[400]">
              <li>
                Quy định về việc hủy đơn hàng, bao gồm thời hạn hủy đơn hàng và
                các chi phí liên quan .
              </li>
            </ul>
          </li>
        </ul>
      </section>

      <section id="chinh-sach-thanh-toan" className="pt-[80px]">
        <TitleSection title="Chính sách thanh toán" />
        <ul className="list-decimal pl-[20px]">
          <li className="mb-4 font-bold">
            Phương thức thanh toán:
            <ul className="list-disc pl-[20px] font-[400]">
              <li>
                - Xác định các phương thức thanh toán được chấp nhận, như thanh
                toán qua thẻ tín dụng, chuyển khoản ngân hàng, hoặc các phương
                tiện thanh toán trực tuyến.
              </li>
            </ul>
          </li>
          <li className="mb-4 font-bold">
            Thanh toán trước và sau:
            <ul className="list-disc pl-[20px] font-[400]">
              <li>
                Quy định xem công ty yêu cầu thanh toán trước giao hàng, thanh
                toán sau khi nhận hàng, hoặc có chính sách nào khác liên quan
                đến việc thanh toán.
              </li>
            </ul>
          </li>
          <li className="mb-4 font-bold">
            Chi tiết hóa đơn:
            <ul className="list-disc pl-[20px] font-[400]">
              <li>
                Chính sách về cách cung cấp chi tiết hóa đơn, bao gồm thông tin
                về sản phẩm, giá cả, chi phí vận chuyển, và bất kỳ phí nào khác.
              </li>
            </ul>
          </li>
          <li className="mb-4 font-bold">
            Quy định về thanh toán trễ:
            <ul className="list-disc pl-[20px] font-[400]">
              <li>
                Thông tin về chi phí hoặc hậu quả nếu khách hàng thanh toán trễ
                so với điều khoản thanh toán.
              </li>
            </ul>
          </li>
          <li className="mb-4 font-bold">
            Chính sách thuế:
            <ul className="list-disc pl-[20px] font-[400]">
              <li>
                Cung cấp thông tin về việc có hay không áp dụng thuế và cách
                tính thuế trong hóa đơn thanh toán.
              </li>
            </ul>
          </li>
          <li className="mb-4 font-bold">
            Thông tin bảo mật thanh toán:
            <ul className="list-disc pl-[20px] font-[400]">
              <li>
                Đảm bảo rằng thông tin thanh toán của khách hàng được bảo vệ và
                duy trì theo các tiêu chuẩn bảo mật.
              </li>
            </ul>
          </li>
          <li className="mb-4 font-bold">
            Chính sách trả hàng và hoàn tiền:
            <ul className="list-disc pl-[20px] font-[400]">
              <li>
                Nếu có, quy định về chính sách trả hàng và hoàn tiền, bao gồm
                thời gian áp dụng và điều kiện liên quan.
              </li>
            </ul>
          </li>
        </ul>
        <p>
          Chính sách thanh toán giúp tạo ra một quá trình thanh toán minh bạch
          và công bằng giữa công ty và khách hàng, đồng thời giảm thiểu rủi ro
          và tranh chấp.
        </p>
      </section>

      <section id="chinh-sach-bao-hanh" className="pt-[80px]">
        <TitleSection title="Chính sách bảo hành" />
        <ul className="list-decimal pl-[20px]">
          <li className="mb-4 font-bold">
            Thời gian bảo hành:
            <ul className="list-disc pl-[20px] font-[400]">
              <li>
                Bảo hành có thể áp dụng trong một khoảng thời gian cụ thể sau
                ngày mua hàng.
              </li>
            </ul>
          </li>
          <li className="mb-4 font-bold">
            Điều kiện bảo hành:
            <ul className="list-disc pl-[20px] font-[400]">
              <li>
                Bảo hành chỉ áp dụng cho sản phẩm được sử dụng đúng cách theo
                hướng dẫn sử dụng.
              </li>
              <li>
                Sản phẩm không được sửa chữa hoặc thay đổi bởi người tiêu dùng
                hoặc bên thứ ba.
              </li>
            </ul>
          </li>
          <li className="mb-4 font-bold">
            Quy trình đổi trả:
            <ul className="list-disc pl-[20px] font-[400]">
              <li>
                Khách hàng cần liên hệ với bộ phận hỗ trợ khách hàng để bắt đầu
                quy trình đổi trả.
              </li>
              <li>
                Đòi hỏi việc cung cấp chứng minh mua hàng và mô tả chi tiết về
                vấn đề.
              </li>
            </ul>
          </li>
          <li className="mb-4 font-bold">
            Lựa chọn đổi trả:
            <ul className="list-disc pl-[20px] font-[400]">
              <li>
                Cung cấp lựa chọn đổi sản phẩm mới, sửa chữa hoặc hoàn tiền tùy
                thuộc vào tình trạng cụ thể.
              </li>
            </ul>
          </li>
          <li className="mb-4 font-bold">
            Chi phí đổi trả:
            <ul className="list-disc pl-[20px] font-[400]">
              <li>
                Chi phí đổi trả có thể áp dụng nếu nguyên nhân đổi trả không
                phải do lỗi sản xuất.
              </li>
            </ul>
          </li>
          <li className="mb-4 font-bold">
            Hạn chế bảo hành:
            <ul className="list-disc pl-[20px] font-[400]">
              <li>
                Một số điều kiện hoặc sản phẩm có thể không được bảo hành, được
                mô tả rõ trong chính sách.
              </li>
            </ul>
          </li>
        </ul>
      </section>

      <section id="chinh-sach-doi-tra" className="pt-[80px]">
        <TitleSection title="Chính sách đổi trả" />
        <p className="mb-2">
          Tại {information.shopName}, chúng tôi trân trọng sự tin tưởng của
          khách hàng khi đặt mua sản phẩm. Chính sách hậu mãi của Son Pack được
          xây dựng dựa trên cam kết bảo vệ quyền lợi người tiêu dùng để quý
          khách có thể yên tâm mua hàng và tin tưởng sử dụng sản phẩm của công
          ty.
        </p>
        <ul className="list-decimal pl-[20px]">
          <li className="mb-4 font-bold">
            Điều kiện đổi trả sản phẩm:
            <p className="font-[400] my-2">
              Khi nhận được sản phẩm, Quý khách luôn kiểm tra lại hàng:
            </p>
            <ul className="list-disc pl-[20px] font-[400]">
              <li>Bao bì bên ngoài</li>
              <li>Chất lượng sản phẩm bên trong</li>
              <li>Số lượng sản phẩm</li>
            </ul>
          </li>
        </ul>

        <p className="mb-2">
          - Nếu phát hiện sản phẩm bị hư hại do quá trình vận chuyển hoặc có lỗi
          ngoại quan (lỗi hình thức bên ngoài quan sát được bằng mắt, không phải
          lỗi kỹ thuật), quý khách cần gọi điện, nhắn tin kèm hình ảnh lại NGAY
          cho Son Pack trong vòng 24h kể từ lúc đơn hàng giao tới.
        </p>
        <p className="mb-2">
          - Sau khi tiếp nhận ý kiến của khách, Son Pack sẽ hỗ trợ xử lý theo
          từng trường hợp cụ thể: đổi sản phẩm khác tương tự hoặc bù lại số
          lượng bị hư hại. Đơn hàng đổi cần được đảm bảo giữ nguyên chưa qua sử
          dụng
        </p>
        <p className="mb-2">
          - Trường hợp, quá thời hạn 72h hoặc đơn hàng đã có biên bản đồng kiểm
          giữa bên vận chuyển và quý khách, Son Pack sẽ không đồng ý gửi bù sản
          phẩm trong mọi điều kiện.
        </p>
        <p>
          {information.shopName} sẽ tiếp nhận thông tin và phản hồi về hướng xử
          lý thích hợp nhất ngay khi nhận được yêu cầu của khách hàng.
        </p>
      </section>
    </div>
  );
}
