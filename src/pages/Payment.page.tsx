import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { listedAdmin, listedUser } from '../constant/routers/listed';
import PaymentLayout from '../layout/payment.layout';
import { paymentRest } from '@/middleware/Rest';
import { formatRupiah } from '@/utils/formatRupiah';
import CountdownTimer from '@/components/ui/countDown';
import animation from '@/assets/gif/Fill out.gif';

function PaymentPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const id = searchParams.get('id');
  const payment = searchParams.get('payment');
  const type = searchParams.get('type');
  const idUser = searchParams.get('idUser');
  const [data, setData] = useState<any>();

  useEffect(() => {
    checkPayment();
    if (!data) {
      generatePayment();
    }
  }, []);

  const checkPayment = async () => {
    try {
      const response = await paymentRest.getStatusPayment(id);
      const data = response?.data?.data;
      const isPaid = response.data.data.isPaid;
      const paymentType = response.data.data.paymentMethod;
      const idTransaksi = response.data.data.id;

      if (isPaid) {
        type === 'create-admin'
          ? navigate(listedAdmin.anggotaBaru)
          : navigate(listedUser.dahsboardVerfi);
      }
      if (paymentType !== 'QRIS') {
        const params = new URLSearchParams({
          id: idTransaksi,
          payment: paymentType,
        });
        navigate(`${listedUser.paymentVa}?${params.toString()}`);
      }
      setData(data);
    } catch (error) {
      await generatePayment();
      console.log('ini jalan gk ada datanya');
    }
  };

  const generatePayment = async () => {
    const payload = {
      paymentType: payment,
      idUser,
    };
    try {
      const response = await paymentRest.generatePayment(payload);
      const id = response.data.data.id;
      const params = new URLSearchParams({
        id: id,
        type: type ?? '',
      });
      navigate(`${listedUser.payment}?${params.toString()}`);
      window.location.reload();
    } catch (error) {
      console.log('ini jalan gk ada datanya');
    }
  };

  return (
    <>
      <PaymentLayout>
        <>
          {data ? (
            <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gray-100 p-4">
              <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
                <h1 className="text-2xl font-bold text-center mb-6">
                  Pembayaran QRIS
                </h1>
                <div className="flex justify-center mb-6">
                  <img src={data?.qrisLink} alt="" />
                </div>
                <div className="w-full flex justify-center my-5">
                  <CountdownTimer expiredDate={data?.expiredDate} />
                </div>

                <div className="text-center mb-6">
                  <p className="text-gray-700 mb-2">
                    Silahkan scan QR code di atas untuk melakukan pembayaran.
                  </p>
                  <p className="text-gray-500 text-sm">
                    Pastikan nominal pembayaran sesuai dengan yang tertera.
                  </p>
                </div>

                {data && (
                  <div className="bg-gray-50 p-4 rounded-lg mb-6 gap-2 flex flex-col">
                    <div className="flex justify-between">
                      <span className="text-gray-700">Total Pembayaran:</span>
                      <span className="font-bold text-gray-900">
                        {formatRupiah(data?.paymentTotal)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Metode Pembayaran:</span>
                      <span className="text-gray-900">
                        {data?.paymentMethod}
                      </span>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex justify-center gap-4">
                  <button
                    className="btn btn-ghost bg-emeraldGreen text-white"
                    onClick={checkPayment}
                  >
                    Cek Pembayaran
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full flex flex-col items-center">
              <img src={animation} alt="animasi" className="w-1/3" />
              <span>
                Sedang menyiapkan data pembayaran, mohon tunggu beberapa saat
              </span>
            </div>
          )}
        </>
      </PaymentLayout>
    </>
  );
}

export default PaymentPage;
