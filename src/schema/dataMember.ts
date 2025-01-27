import * as yup from "yup";

 export const schemaMember = yup.object().shape({
    membershipTypeId: yup.string().required("Membership Type is required"),
    fullName: yup.string().required("Full Name is required"),
    nik: yup
      .string()
      .required("NIK is required")
      .matches(/^[0-9]+$/, "NIK must be numeric")
      .min(16, "NIK must be exactly 16 characters")
      .max(16, "NIK must be exactly 16 characters"),
    gender: yup.string().required("Gender is required"),
    pob: yup.string().required("Place of Birth is required"),
    dob: yup
      .string()
      .required("Date of Birth is required")
      .test("isValidDate", "Invalid date format", (value) => {
        return !isNaN(new Date(value!).getTime());
      }),
    isVerified: yup.boolean().required("Verification status is required"),
    KtpProvince: yup.string().required("KTP Province is required"),
    KtpProvinceId: yup.string().required("KTP Province ID is required"),
    KtpCity: yup.string().required("KTP City is required"),
    KtpCityId: yup.string().required("KTP City ID is required"),
    KtpDistrict: yup.string().required("KTP District is required"),
    KtpDistrictId: yup.string().required("KTP District ID is required"),
    KtpSubDistrict: yup.string().required("KTP Sub-District is required"),
    KtpSubDistrictId: yup.string().required("KTP Sub-District ID is required"),
    KtpAddressDetail: yup.string().required("KTP Address Detail is required"),
    addressIsDifferent: yup.boolean().required("Address difference status is required"),
    DomicileProvince: yup.string().required("Domicile Province is required"),
    DomicileProvinceId: yup.string().required("Domicile Province ID is required"),
    DomicileCity: yup.string().required("Domicile City is required"),
    DomicileCityId: yup.string().required("Domicile City ID is required"),
    DomicileDistrict: yup.string().required("Domicile District is required"),
    DomicileDistrictId: yup.string().required("Domicile District ID is required"),
    DomicileSubDistrict: yup.string().required("Domicile Sub-District is required"),
    DomicileSubDistrictId: yup.string().required("Domicile Sub-District ID is required"),
    DomicileAddressDetail: yup.string().required("Domicile Address Detail is required"),
    ktp: yup
      .mixed<File>()
      .required()
      .defined()
      .required("KTP file is required")
      .test(
        "fileSize",
        "File size must not exceed 2MB",
        (value) => value ? value.size <= 2 * 1024 * 1024 : false // 2MB limit
      )
      .test("fileType", "Only image files jpeg, jpg, png are allowed", (value) =>
        value ? ["image/jpeg", "image/png"].includes(value.type) : false
      ),
    ktp_selfie: yup
      .mixed<File>()
      .required()
      .defined()
      .required("KTP Selfie file is required")
      .test(
        "fileSize",
        "File size must not exceed 2MB",
        (value) => value ? value.size <= 2 * 1024 * 1024 : false // 2MB limit
      )
      .test("fileType", "Only image jpeg, jpg, png files are allowed", (value) =>
        value ? ["image/jpeg", "image/png"].includes(value.type) : false
      ),
  });
  
