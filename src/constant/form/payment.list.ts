import bca from "../../assets/logo/bank/bca.png";
import mandiri from "../../assets/logo/bank/mandiri.png";
import bri from "../../assets/logo/bank/bri.png";
import bsi from "../../assets/logo/bank/bsi.png";
import bni from "../../assets/logo/bank/bni.png";
import btn from "../../assets/logo/bank/btn.png";
import permata from "../../assets/logo/bank/permata.png";
import qris from "@/assets/logo/bank/qris.png"

export const bank = [
  
  {
    id: "payment",
    value: "BCAVA",
    img: bca,
    label: "BCA",
    price: 10000,
  },
  {
    id: "payment",
    value: "MandiriVA",
    img: mandiri,
    label: "Mandiri",
    price: 10000,
    height: 80,
  },
  {
    id: "payment",
    value: "BRIVA",
    img: bri,
    label: "BRI",
    price: 10000,
  },
  {
    id: "payment",
    value: "BNIVA",
    img: bni,
    label: "BNI",
    price: 10000,
  },
  {
    id: "payment",
    value: "BTNVA",
    img: btn,
    label: "BTN",
    price: 10000,
  },
  {
    id: "payment",
    value: "BSIVA",
    img: bsi,
    label: "BSI",
    price: 10000,
  },
  {
    id: "payment",
    value: "PermataVA",
    img: permata,
    label: "Permata",
    price: 10000,
  },
  {
    id: "payment",
    value: "QRIS",
    img: qris,
    label: "QRIS",
    price: 10000,
  },
 
];

export const paymentMethod = {
  "1": {
    title: "Virtual Account",
    data: bank,
  },
 
};

export const paymentList = [
  ...bank,
  
];