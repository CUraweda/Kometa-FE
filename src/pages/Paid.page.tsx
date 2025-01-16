import paidAnimation from "../assets/gif/paid.gif";
import { useNavigate } from "react-router-dom";
import { listed } from "../constant/routers/listed";
import { twMerge } from "tailwind-merge";
import PaymentLayout from "../layout/payment.layout";

function PaidPage() {
  const navigate = useNavigate();

  return (
    <PaymentLayout>
      <div className="h-[500px] flex justify-center items-center">
        <div className="text-center">
          <img className="mx-auto" src={paidAnimation} alt="paid-gift" />
          <h2 className="text-4xl font-semibold text-gray-700 mb-3">
            Berhasil
          </h2>
          <p className="text-sm tracking-wide text-gray-500 whitespace-pre-line">
            {`Formulir pendaftaran Anda sedang kami tinjau.
            Silakan tunggu konfirmasi dari kami.`}
          </p>

          <div className="grid grid-cols-2 max-w-xl gap-6 my-10">
            {[
              { label: "Transaksi ID", value: "REG 1234 4545 4545" },
              { label: "Tanggal", value: "12 Januari 2025, 16:00" },
              { label: "Metode Pembayaran", value: "Bank Bjb" },
              { label: "Total Pembayaran", value: "Rp 5000" },
            ].map((item, index) => (
              <div key={item.value}>
                <h3 className="text-xs tracking-wider mb-1">{item.label}</h3>
                <p
                  className={twMerge("text-sm", index == 2 && "font-semibold")}
                >
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          <button
            onClick={() => navigate(listed.signin)}
            className="btn btn-primary text-white font-light"
          >
            Masuk ke Akun
          </button>
        </div>
      </div>
    </PaymentLayout>
  );
}

export default PaidPage;
