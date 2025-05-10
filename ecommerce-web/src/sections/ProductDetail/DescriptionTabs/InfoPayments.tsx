import Image from "next/image";

const InfoPayments = () => (
  <div className="flex items-start sm:gap-16 gap-4 mt-2 sm:flex-row flex-col">
    <div className="sm:border-r-[2px] sm:border-[#3165ff] sm:w-1/2 w-full">
      <p className="font-medium my-2">Ngân Hàng Vietcombank:</p>
      <p>
        - Chủ tài khoản: <b>LE QUANG SON</b>
      </p>
      <p>
        - Số tài khoản: <b>0381000597930</b>
      </p>
      <p>
        - Chi nhánh: <b>Vietcombank Thủ Đức</b>{" "}
      </p>
      <div className="rounded-lg border border-black-2 p-2 w-auto mt-4 max-w-[250px] mx-auto">
        <Image
          src="/qr_bank.jpg"
          width={150}
          height={150}
          alt="qr_bank"
          className="object-cover mx-auto h-auto max-w-[200px]"
        />
      </div>
    </div>
    <div className="sm:w-1/2 w-full">
      <p className="font-medium my-2">MoMo:</p>
      <p>
        - Tên: <b>Lê Quang Sơn</b>
      </p>
      <p>
        - Số điện thoại: <b>0347.366.345</b>
      </p>
      <br />
      <div className="rounded-lg border border-black-2 p-4 w-auto mt-4 max-w-[250px] mx-auto">
        <Image
          src="/qr_momo.jpg"
          width={150}
          height={250}
          alt="qr_bank"
          className="object-cover mx-auto h-[200px] max-w-[200px]"
        />
      </div>
    </div>
  </div>
);

export default InfoPayments;
