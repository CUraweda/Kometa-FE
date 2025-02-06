
import { paymentMethod } from "../../constant/form/payment.list";
import { Payment } from "../../types/common";
import CardBox from "../ui/cardbox";

type Props = {
  onChange: (item: Payment) => void;
  selected: string;
};

function PaymentMethod({ onChange, selected }: Props) {
  const activeTab = "1"
 
  return (
    <>
      <div role="tablist" className="tabs tabs-bordered mt-6">
        
      </div>
      <div className="grid grid-cols-2 gap-4 mt-6 ">
        <CardBox
          data={paymentMethod[activeTab as keyof typeof paymentMethod].data}
          onChange={(item) => onChange(item)}
          selected={selected}
        />
      </div>
    </>
  );
}

export default PaymentMethod;
