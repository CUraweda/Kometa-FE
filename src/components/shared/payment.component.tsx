
import { bank, paymentMethod } from "../../constant/form/payment.list";
import { Payment } from "../../types/common";
import CardBox from "../ui/cardbox";

type Props = {
  onChange: (item: Payment) => void;
  selected: string;
};

function PaymentMethod({ onChange, selected }: Props) {
 
  return (
    <>
    
      <div className="grid grid-cols-2 gap-4 mt-6 ">
        <CardBox
          data={bank}
          onChange={(item) => onChange(item)}
          selected={selected}
        />
      </div>
    </>
  );
}

export default PaymentMethod;
