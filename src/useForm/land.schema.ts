import * as yup from 'yup';

export const landSchema = yup.object().shape({
    memberId: yup.string().required("Member ID wajib diisi"),
    ownerFullName: yup.string().required("Nama pemilik wajib diisi"),
    ownerProvince: yup.string().required("Provinsi pemilik wajib diisi"),
    ownerCity: yup.string().required("Kota pemilik wajib diisi"),
    arrayLocation: yup.string().required("Data Pemetaan Tanah Wajib diisi"),
    ownerDistrict: yup.string().required("Kecamatan pemilik wajib diisi"),
    ownerSubDistrict: yup.string().required("Kelurahan/Desa wajib diisi"),
    ownershipStatus: yup
      .string()
      .oneOf(["SHM", "Girik", "Kontrak/Sewa"], "Status kepemilikan tidak valid")
      .required("Status kepemilikan wajib diisi"),
    ownerNotes: yup.string().default("").required("Catatan Wajib Diisi"),
    landCondition: yup.string().required("Kondisi tanah wajib diisi"),
    landAddress: yup.string().required("Alamat tanah wajib diisi"),
    documentShmCertificateNo: yup.string().required("Nomor sertifikat wajib diisi"),
    documentOwnerFullName: yup.string().required("Nama pemilik dokumen wajib diisi"),
    documentWideArea: yup
      .number()
      .typeError("Luas dokumen harus berupa angka")
      .positive("Luas dokumen harus lebih dari 0")
      .required("Luas dokumen wajib diisi"),
    status: yup.string().required("Status wajib diisi"),
    
    file_certificate: yup
         .mixed<File>()
         .required()
         .defined()
         .required("Sertifikat file is required")
         .test(
           "fileSize",
           "File size must not exceed 2MB",
           (value) => value ? value.size <= 2 * 1024 * 1024 : false // 2MB limit
         )
         .test("fileType", "Only image files jpeg, jpg, png are allowed", (value) =>
           value ? ["image/jpeg", "image/png"].includes(value.type) : false
         ),
});