import * as yup from "yup";

 export const billSchame = yup.object().shape({
    description: yup.string().required("Detail is required"),
    paymentDueDate: yup.string().required("Date is required"),
    totalPayment: yup.number().required("Total is required"),
    createPayment: yup.boolean().required("is required"),
   
  });
  
