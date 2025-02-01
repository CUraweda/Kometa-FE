import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { listedUser } from '../constant/routers/listed';
import PaymentLayout from '../layout/payment.layout';
import QRIS from '@/components/ui/Qris';
import { paymentRest } from '@/middleware/Rest';
import { formatRupiah } from '@/helper/formatRupiah';
import CountdownTimer from '@/components/ui/countDown';

function PaymentPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const id = searchParams.get('id');
  const type = searchParams.get('type');
  const [data, setData] = useState<any>();
  useEffect(() => {
   checkPayment();
    if(!data){
      generatePayment()
    }
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
      });
      navigate(`${listedUser.payment}?${params.toString()}`);
      window.location.reload()
    } catch (error) {
      console.log('ini jalan gk ada datanya');
    }
  };

  return (
    <>
      <PaymentLayout>
        <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gray-100 p-4">
          <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
            <h1 className="text-2xl font-bold text-center mb-6">
              Pembayaran QRIS
            </h1>

            {/* QR Code Display */}
            <div className="flex justify-center mb-6">
              {data && <QRIS qrisLink={data?.qrisLink} />}
            </div>
            <div className="w-full flex justify-center my-5">
              <CountdownTimer expiredDate={data?.expiredDate} />
            </div>
            {/* Payment Instructions */}
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
                  <span className="text-gray-900">{data?.paymentMethod}</span>
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
      </PaymentLayout>
    </>
  );
}

export default PaymentPage;
