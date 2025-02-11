import * as yup from "yup";

 export const createSavingSchame = yup.object().shape({
    memberId: yup.string().required("Member is required"),
    savingRefId: yup.string().required("Date is required"),
    status: yup.string().required("Total is required"),
    isPaymentSuccess: yup.boolean().optional(),
   
  });
  
