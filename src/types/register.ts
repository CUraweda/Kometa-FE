export interface Register {
  membershipTypeId: string;
  fullName: string;
  nik: string;
  gender: string;
  pob: string;
  dob: string;
  isVerified: boolean;
  KtpProvince: string;
  KtpProvinceId: string;
  KtpCity: string;
  KtpCityId: string;
  KtpDistrict: string;
  KtpDistrictId: string;
  KtpSubDistrict: string;
  KtpSubDistrictId: string;
  KtpAddressDetail: string;
  addressIsDifferent: boolean;
  DomicileProvince: string;
  DomicileProvinceId: string;
  DomicileCity: string;
  DomicileCityId: string;
  DomicileDistrict: string;
  DomicileDistrictId: string;
  DomicileSubDistrict: string;
  DomicileSubDistrictId: string;
  DomicileAddressDetail: string;
  ktp: File;
  ktp_selfie: File;
  registrationFee? : number
  registrationPaymentMethod?: string
}
