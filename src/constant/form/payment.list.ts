import bca from "../../assets/logo/bank/bca.png";
import mandiri from "../../assets/logo/bank/mandiri.png";
import bri from "../../assets/logo/bank/bri.png";
import bsi from "../../assets/logo/bank/bsi.png";
import bni from "../../assets/logo/bank/bni.png";
import bjb from "../../assets/logo/bank/bjb.png";
import btn from "../../assets/logo/bank/btn.png";
import permata from "../../assets/logo/bank/permata.png";
import cimb from "../../assets/logo/bank/cimb.png";
import jcb from "../../assets/logo/bank/jcb.png";
import sampoerna from "../../assets/logo/bank/sahabatsampoerna.png";
import mastercard from "../../assets/logo/bank/mastercard.png";
import visa from "../../assets/logo/bank/visa.png";
import neobank from "../../assets/logo/bank/neobank.png";
import gopay from "../../assets/logo/ewallet/gopay.png";
import grabpay from "../../assets/logo/ewallet/grabpay.png";
import shopeepay from "../../assets/logo/ewallet/shopeepay.png";
import ovo from "../../assets/logo/ewallet/ovo.png";
import astrapay from "../../assets/logo/ewallet/astrapay.png";
import dana from "../../assets/logo/ewallet/dana.png";
import paylater from "../../assets/logo/ewallet/paylater.png";
import kredivo from "../../assets/logo/ewallet/kredivo.png";
import alfamart from "../../assets/logo/ewallet/alfamart.png";
import indomaret from "../../assets/logo/ewallet/indomaret.png";
import linkaja from "../../assets/logo/bank/linkaja.png";

export const bank = [
  {
    id: "payment",
    value: "QRIS",
    img: bjb,
    label: "QRIS",
    price: 5000,
    height: 80,
  },
  {
    id: "payment",
    value: "VA",
    img: bjb,
    label: "VA BANK",
    price: 5000,
    height: 80,
  },
  
];

export const creditCard = [
  {
    id: "payment",
    value: "53456",
    img: mastercard,
    label: "Master Card",
    price: 5000,
  },
  {
    id: "payment",
    value: "432345",
    img: visa,
    label: "Visa",
    price: 5000,
  },
  {
    id: "payment",
    value: "156255",
    img: jcb,
    label: "JCB",
    price: 5000,
  },
];

export const ewalletPayments = [
  {
    id: "payment",
    value: "31234",
    img: ovo,
    label: "OVO",
    price: 5000,
  },
  {
    id: "payment",
    value: "52345",
    img: dana,
    label: "Dana",
    price: 5000,
  },
  {
    id: "payment",
    value: "1234341",
    img: gopay,
    label: "Gopay",
    price: 5000,
  },
  {
    id: "payment",
    value: "1212434",
    img: grabpay,
    label: "Grabpay",
    price: 5000,
  },
  {
    id: "payment",
    value: "2451222",
    img: astrapay,
    label: "Astrapay",
    price: 5000,
  },

  {
    id: "payment",
    value: "25123773",
    img: shopeepay,
    label: "Shoopepay",
    price: 5000,
  },
  {
    id: "payment",
    value: "426112",
    img: linkaja,
    label: "Link Aja",
    price: 5000,
  },
];

export const paylaterPamyments = [
  {
    id: "payment",
    value: "3351124",
    img: paylater,
    label: "Paylater",
    price: 5000,
  },
  {
    id: "payment",
    value: "7345234",
    img: kredivo,
    label: "Kredivo",
    price: 5000,
  },
];

export const retailPayments = [
  {
    id: "payment",
    value: "24455",
    img: alfamart,
    label: "Alfamart",
    price: 5000,
  },
  {
    id: "payment",
    value: "24125512",
    img: indomaret,
    label: "JCB",
    price: 5000,
  },
];

export const paymentMethod = {
  "1": {
    title: "Virtual Account",
    data: bank,
  },
  "2": {
    title: "E - Wallet",
    data: ewalletPayments,
  },
  "3": {
    title: "Credit Card",
    data: creditCard,
  },
  "4": {
    title: "PayLater",
    data: paylaterPamyments,
  },
  "5": {
    title: "Retail Outlets",
    data: retailPayments,
  },
};

export const paymentList = [
  ...bank,
  ...ewalletPayments,
  ...creditCard,
  ...paylater,
  ...retailPayments,
];
