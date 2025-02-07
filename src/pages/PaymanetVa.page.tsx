import { useEffect, useState } from 'react';
import { LuCopy, LuCopyCheck } from 'react-icons/lu';
import {useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import PaymentMethod from '../components/shared/payment.component';
import { paymentList } from '../constant/form/payment.list';
import { modalList } from '../constant/modals';
import { listedUser } from '../constant/routers/listed';
import { useModal } from '../hooks/useModal';
import { useTimer } from '../hooks/useTimer';
import PaymentLayout from '../layout/payment.layout';
import { Payment } from '../types/common';
import { paymentRest } from '@/middleware/Rest';
import { formatRupiah } from '@/utils/formatRupiah';
import CountdownTimer from '@/components/ui/countDown';

function PaymentVaPage() {
  const [searchParams] = useSearchParams();

  const id = searchParams.get('id');
  const type = searchParams.get('type');
  const [data, setData] = useState<any>();

  const navigate = useNavigate();
  const { Modal, closeModal } = useModal();

  useEffect(() => {
    checkPayment();
   
  }, []);

  const checkPayment = async () => {
    try {
      const response = await paymentRest.getStatusPayment(id);
      const data = response?.data?.data;
      const isPaid = response.data.data.isPaid;

      if (isPaid) {
        navigate(listedUser.dahsboardVerfi);
      }
      setData(data);
    } catch (error) {
      await generatePayment();
      console.log('ini jalan gk ada datanya');
    }
  };

  const generatePayment = async () => {
    const payload = {
      paymentType: type,
    };
  
    try {
      const response = await paymentRest.generatePayment(payload);
      const id = response.data.data.id;
      const params = new URLSearchParams({
        id: id,
        type: type ?? 'QRIS',
      });
      navigate(`${listedUser.paymentVa}?${params.toString()}`);
      window.location.reload();
    } catch (error) {
      console.log('ini jalan gk ada datanya');
    }
  };

  const [paymentId, setPaymentId] = useState('payment');

  const { startTimer, element } = useTimer({
    second: 2,
    elementBefore: (
      <LuCopy
        onClick={() =>
          navigator.clipboard
            .writeText(data?.virtualAccountNo)
            .then(handleStartTimer)
            .catch(() => {
              toast.error('Gagal menyalin nomor akun virtual!');
            })
        }
        className="ml-1 w-4 h-4 cursor-pointer"
      />
    ),
    elementAfter: <LuCopyCheck className="ml-1 w-4 h-4 cursor-pointer" />,
  });

  function handleStartTimer() {
    toast.info('Nomor Akun Virtual telah disalin!');
    startTimer();
  }

  const handleChangePayment = () => {
    closeModal(modalList.updatePayment);
    navigate(listedUser.payment, { state: { payment: paymentId } });
  };

  const selectedPayment = (
    paymentList.find((item) => (item as Payment).value == type) as Payment
  )?.img;

  return (
    <>
      <PaymentLayout>
        <div className="flex flex-col sm:flex-row w-full min-h-[600px] mb-10">
          <div className="flex flex-col justify-center w-full sm:w-1/2 mt-5">
            <div className="text-center">
              <div>
                <p className="text-xl tracking-wide mb-2">Total Pembayaran</p>
                <span className="flex justify-center">
                  <h3 className="text-5xl ml-1 font-bold text-primary">
                    {formatRupiah(data?.paymentTotal)}
                  </h3>
                </span>
              </div>
              <div>
                <img
                  className="h-40 mx-auto"
                  src={selectedPayment}
                  alt="payment-logo"
                />
                <div className="relative -top-6 flex flex-col px-10 gap-4 mx-auto justify-center">
                  <div className="w-full flex justify-center my-5">
                    <CountdownTimer expiredDate={data?.expiredDate} />
                  </div>
                  <table className="table text-start">
                    <tr>
                      <td className="text-end">Id Transaksi</td>
                      <td>
                        <span className="flex gap-1 items-start">
                          {data?.transactionId}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-end">Nomor Virtual Account ( VA Pembayaran )</td>
                      <td>
                        <span className="flex gap-1 items-center">
                          <h3 className="tracking-wider font-bold">
                            {data?.virtualAccountNo ?? 'Virtual Account Tidak Tersedia'}
                          </h3>
                          {element}
                        </span>
                      </td>
                    </tr>
                  </table>
                </div>
                <div className="flex justify-center gap-3">
                  <button
                    className="btn btn-ghost bg-emeraldGreen text-white"
                    onClick={checkPayment}
                  >
                    Cek Pembayaran
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full sm:w-1/2 flex flex-col justify-start px-5 mt-5">
            <span className="my-5 text-xl font-bold">Cara Pembayaran</span>
            <div role="tablist" className="tabs tabs-bordered w-full">
              <input
                type="radio"
                name="my_tabs_1"
                role="tab"
                className="tab w-full"
                aria-label="ATM"
                defaultChecked
              />
              <div role="tabpanel" className="tab-content p-10">
                <ul className="list-decimal pl-6 space-y-2">
                  <li>Masukkan kartu ATM dan PIN.</li>
                  <li>Pilih menu "Pembayaran" atau "Transaksi Lainnya."</li>
                  <li>Pilih jenis pembayaran seperti "Virtual Account."</li>
                  <li>Masukkan nomor Virtual Account yang telah diberikan.</li>
                  <li>Konfirmasi jumlah yang harus dibayar.</li>
                  <li>
                    Pilih metode pembayaran yang diinginkan (misalnya, saldo
                    tabungan atau giro).
                  </li>
                  <li>Selesaikan pembayaran dan simpan struk sebagai bukti.</li>
                </ul>
              </div>

              <input
                type="radio"
                name="my_tabs_1"
                role="tab"
                className="tab"
                aria-label="iBanking"
              />
              <div role="tabpanel" className="tab-content p-10">
                <ul className="list-decimal pl-6 space-y-2">
                  <li>
                    Login ke akun iBanking menggunakan username dan password.
                  </li>
                  <li>Pilih menu "Pembayaran" atau "Transfer."</li>
                  <li>
                    Pilih opsi "Virtual Account" atau "Pembayaran ke Virtual
                    Account."
                  </li>
                  <li>Masukkan nomor Virtual Account yang sudah diberikan.</li>
                  <li>Verifikasi jumlah yang harus dibayar.</li>
                  <li>Pilih rekening yang akan digunakan untuk pembayaran.</li>
                  <li>Konfirmasi pembayaran dan simpan bukti pembayaran.</li>
                </ul>
              </div>

              <input
                type="radio"
                name="my_tabs_1"
                role="tab"
                className="tab"
                aria-label="mBanking"
              />
              <div role="tabpanel" className="tab-content p-10">
                <ul className="list-decimal pl-6 space-y-2">
                  <li>
                    Login ke aplikasi mBanking menggunakan username dan
                    password.
                  </li>
                  <li>Pilih menu "Pembayaran" atau "Transfer."</li>
                  <li>Pilih jenis pembayaran "Virtual Account."</li>
                  <li>Masukkan nomor Virtual Account yang diberikan.</li>
                  <li>Periksa jumlah yang akan dibayar.</li>
                  <li>Pilih sumber dana (tabungan atau giro).</li>
                  <li>Konfirmasi transaksi dan simpan bukti pembayaran.</li>
                </ul>
              </div>
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

export default PaymentVaPage;
