import { useEffect, useState } from 'react';
import { LuCopy, LuCopyCheck } from 'react-icons/lu';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
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

function PaymentVaPage() {
  const [searchParams] = useSearchParams();

  const id = searchParams.get('id');
  const type = searchParams.get('type');
  const [data, setData] = useState<any>();

  const navigate = useNavigate();
  const { Modal, openModal, closeModal } = useModal();

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

      // if (isPaid) {
      //   navigate(listedUser.dahsboardVerfi);
      // }
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
    console.log(payload);
    
    try {
      const response = await paymentRest.generatePayment(payload);
      const id = response.data.data.id;
      const params = new URLSearchParams({
        id: id,
      });
      // navigate(`${listedUser.payment}?${params.toString()}`);
      // window.location.reload()
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
            .writeText('1234 5678 9102')
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
        <div className="flex  w-full min-h-[600px]">
          <div className="flex flex-col justify-center w-1/2">
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
                    onClick={() => navigate(listedUser.paid)}
                    className="btn btn-outline hover:bg-primary border-primary hover:border-transparent text-primary"
                  >
                    Cek Status
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className='w-1/2 flex flex-col justify-start '>

          <div role="tablist" className="tabs tabs-bordered w-full">
            <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="ATM" defaultChecked/>
            <div role="tabpanel" className="tab-content p-10">ATM</div>

            <input
              type="radio"
              name="my_tabs_1"
              role="tab"
              className="tab"
              aria-label="iBanking"
               />
            <div role="tabpanel" className="tab-content p-10">Tab content 2</div>

            <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="mBanking" />
            <div role="tabpanel" className="tab-content p-10">Tab content 3</div>
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
