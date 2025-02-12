
import maybank from "../../assets/logo/bank/Maybank.png";
import DanamonVA from "../../assets/logo/bank/danamon.png";
import bnc from "../../assets/logo/bank/bnc.jpg";
import ina from "../../assets/logo/bank/ina.png";
import bni from "../../assets/logo/bank/bni.png";
import permata from "../../assets/logo/bank/permata.png";
import muamalat from "../../assets/logo/bank/muamalat.jpg";
import bsi from "../../assets/logo/bank/bsi.png";
import bri from "../../assets/logo/bank/bri.png";
import mandiri from "../../assets/logo/bank/mandiri.png";
import qris from "@/assets/logo/bank/qris.png"

export const bank = [
  {
    id: "payment",
    value: "QRIS",
    img: qris,
    label: "QRIS",
    price: 10000,
    active: true
  },
  {
    id: "payment",
    value: "MaybankVA",
    img: maybank,
    label: "Maybank",
    price: 10000,
    active: false
  },
  {
    id: "payment",
    value: "DanamonVA",
    img: DanamonVA,
    label: "Bank Danamon",
    price: 10000,
    active: false
  },
  {
    id: "payment",
    value: "BNCVA",
    img: bnc,
    label: "Bank Neo Commerce",
    price: 10000,
    active: false
  },
  {
    id: "payment",
    value: "INAVA",
    img: ina,
    label: "Bank INA",
    price: 10000,
    active: false
  },
  {
    id: "payment",
    value: "BNIVA",
    img: bni,
    label: "Bank Nasional Indonesia ( BNI )",
    price: 15000,
    active: false
  },
  {
    id: "payment",
    value: "PermataVA",
    img: permata,
    label: "Bank Permata",
    price: 10000,
    active: false
  },
  {
    id: "payment",
    value: "MuamalatVA",
    img: muamalat,
    label: "Bank Permata",
    price: 10000,
    active: false
  },
  {
    id: "payment",
    value: "BSIVA",
    img: bsi,
    label: "Bank Syariah Indonesia ( BSI )",
    price: 10000,
    active: false
  },
  {
    id: "payment",
    value: "BRIVA",
    img: bri,
    label: "Bank Rakyat Indonesia ( BRI )",
    price: 10000,
    active: false
  },
  {
    id: "payment",
    value: "MandiriVA",
    img: mandiri,
    label: "Bank Mandiri",
    price: 10000,
    active: false
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