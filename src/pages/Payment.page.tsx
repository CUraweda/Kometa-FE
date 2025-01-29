import { useState } from "react";
import { LuCopy, LuCopyCheck } from "react-icons/lu";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PaymentMethod from "../components/shared/payment.component";
import { paymentList } from "../constant/form/payment.list";
import { modalList } from "../constant/modals";
import { listedUser } from "../constant/routers/listed";
import { useModal } from "../hooks/useModal";
import { useTimer } from "../hooks/useTimer";
import PaymentLayout from "../layout/payment.layout";
import { Payment } from "../types/common";

function PaymentPage() {
  const {
    state: { payment },
  } = useLocation();

  const [paymentId, setPaymentId] = useState(payment);

  const { startTimer, element } = useTimer({
    second: 2,
    elementBefore: (
      <LuCopy
        onClick={() =>
          navigator.clipboard
            .writeText("1234 5678 9102")
            .then(handleStartTimer)
            .catch(() => {
              toast.error("Gagal menyalin nomor akun virtual!");
            })
        }
        className="ml-1 w-4 h-4 cursor-pointer"
      />
    ),
    elementAfter: <LuCopyCheck className="ml-1 w-4 h-4 cursor-pointer" />,
  });

  function handleStartTimer() {
    toast.info("Nomor Akun Virtual telah disalin!");
    startTimer();
  }

  const navigate = useNavigate();
  const { Modal, openModal, closeModal } = useModal();

  const handleChangePayment = () => {
    closeModal(modalList.updatePayment);
    navigate(listedUser.payment, { state: { payment: paymentId } });
  };

  const selectedPayment = (
    paymentList.find((item) => (item as Payment).value == payment) as Payment
  )?.img;

  return (
    <>
      <PaymentLayout>
        <div className="flex gap-5 w-full min-h-[600px]">
          <div className="flex flex-col justify-center w-[800px]">
            <div className="text-center">
              <div>
                <p className="text-sm tracking-wide mb-2">Total Pembayaran</p>
                <span className="flex justify-center">
                  <pre>Rp</pre>
                  <h3 className="text-5xl ml-1 font-bold text-primary">
                    5.000
                  </h3>
                </span>
              </div>
              <div>
                <img
                  className="h-40 mx-auto"
                  src={selectedPayment}
                  alt="payment-logo"
                />
                <div className="relative -top-6 flex gap-4 mx-auto justify-center">
                  <div className="space-y-1">
                    <p className="text-xs tracking-wider">Nama Akun</p>
                    <h3 className="tracking-wider">Kometa</h3>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs tracking-wider">Nomor Akun Virtual</p>
                    <span className="flex gap-1 items-center">
                      <h3 className="tracking-wider">1234 5678 9102</h3>
                      {element}
                    </span>
                  </div>
                </div>
                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => openModal(modalList.updatePayment)}
                    className="btn btn-outline hover:bg-primary border-primary hover:border-transparent text-primary"
                  >
                    Ubah Pembayaran
                  </button>
                  <button
                    onClick={() => navigate(listedUser.paid)}
                    className="btn btn-outline hover:bg-primary border-primary hover:border-transparent text-primary"
                  >
                    Cek Status
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="max-w-5xl px-20 flex flex-col justify-center">
            <div role="tablist" className="tabs tabs-bordered">
              {["ATM", "iBanking", "mBanking"].map((item, index) => (
                <a
                  key={item}
                  role="tab"
                  onClick={() => undefined}
                  className={`tab ${!index ? "tab-active" : ""}`}
                >
                  {item}
                </a>
              ))}
            </div>
            <div>
              <p className="font-medium mt-5 mb-1">Cari ATM Terdekat</p>
              <ul className="px-5 space-y-2">
                {[
                  "Masukkan kartu ATM BJB dan PIN Anda",
                  "Masukkan kartu ATM BJB dan PIN Anda",
                ].map((item) => (
                  <li className="list-decimal pl-1 text-sm">{item}</li>
                ))}
              </ul>

              <p className="font-medium mt-5 mb-1">Cari ATM Terdekat</p>
              <ul className="px-5 space-y-2">
                {[
                  `Pilih Menu "Transaksi Lain"`,
                  `Pilih "Transfer"`,
                  `Pilih "Ke Rekening Virtual BJB"`,
                  `Masukkan Nomor Rekening Virtual 1234 5678 9102
                Tekan "Benar" untuk melanjutkan`,
                  `Verifikasi detail Rekening Virtual dan kemudian masukkan jumlah 
                yang akan ditransfer dan pilih "Benar" untuk mengonfirmasi`,
                  `Konfirmasi detail transaksi Anda yang ditampilkan`,
                  `Pilih "Ya" jika detailnya benar atau "Tidak" jika detailnya tidak benar`,
                ].map((item) => (
                  <li className="list-decimal pl-1 text-sm">{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </PaymentLayout>
      <Modal
        id={modalList.updatePayment}
        title="Ubah Pembayaran"
        alignTitle="left"
        width="w-5/12 max-w-2xl"
      >
        <PaymentMethod
          onChange={(item) => setPaymentId(item.value)}
          selected={paymentId}
        />
        <div className="flex gap-3 justify-end mt-6">
          <button
            onClick={() => {
              closeModal(modalList.updatePayment);
            }}
            className="btn btn-ghost"
          >
            Tutup
          </button>
          <button
            onClick={handleChangePayment}
            className="btn btn-primary text-white"
          >
            Konfirmasi
          </button>
        </div>
      </Modal>
    </>
  );
}

export default PaymentPage;
