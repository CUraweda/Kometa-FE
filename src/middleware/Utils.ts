export interface provinces {
  id: string;
  name: string;
}

export interface Register {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
  phoneWA: string;
  roleId: string;
}
export interface Login {
  email: string;
  password: string;
}
export interface LoginResponse {
  status: boolean;
  message: string;
  data: {
    user: {
      id: string;
      email: string;
      phoneWA: string;
      tempOTP: string | null;
      role: {
        id: string;
        name: string;
        code: string;
      };
      emailVerified: boolean;
      resetToken: string | null;
      resetTokenExp: string | null;
    };
    token: {
      at: string; // Access Token
      rt: string; // Refresh Token
    };
  };
}

export interface MembershipTypeItem {
  id: string;
  name: string;
  foregroundColor: string;
  backgroundColor: string;
}

export interface MembershipTypeResponse {
  status: boolean;
  message: string;
  data: {
    total_items: number;
    page: number;
    limit: number;
    total_pages: number;
    items: MembershipTypeItem[];
  };
}

export interface MemberData {
  status: boolean;
  message: string;
  data: Member
}

export interface typeGetAllMember {
  status: boolean;
  message: string;
  data: {
    total_items: number;
    page: number;
    limit: number;
    total_pages: number;
    items: Member[];
  };
}

export interface Member {
  id: string;
  userId: string;
  membershipTypeId: string;
  fullName: string;
  nik: string;
  gender: 'L' | 'P';
  pob: string;
  job: string
  dob: string; // ISO date string
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
  registrationPaymentId: string | null;
  registrationPaymentMethod: string | null;
  registrationIsPaid: boolean;
  registrationFee: number | null;
  rejectedMessage: string | null;
  createdAt: string; // ISO date string
  user: {
    id: string;
    email: string;
    password: string;
    phoneWA: string;
    tempOTP: string | null;
    roleId: string;
    emailVerified: boolean;
    resetToken: string | null;
    resetTokenExp: string | null;
  };
  membershipType: MembershipType
  MemberFile: any[]; 
}

interface MembershipType {
  id: string;
  name: string;
  foregroundColor: string;
  backgroundColor: string;
}

interface Role {
  id: string;
  code: string;
}

export interface User {
  id: string;
  email: string;
  phoneWA: string;
  roleId: string;
  fullName: string
  emailVerified?: boolean;
  role?: Role;
  MemberFile?: [{ filePath: string }];
}

export interface getDataUser {
  status: boolean;
  message: string;
  data: User;
}

export interface verifMember {
  isVerified: boolean;
  rejectedMessage?: string;
}

export interface LandData {
  id?: string;
  memberId: string;
  ownerFullName: string;
  ownerProvince: string;
  ownerCity: string;
  ownerDistrict: string;
  ownerSubDistrict: string;
  ownershipStatus: 'SHM' | 'Girik' | 'Kontrak/Sewa';
  ownerNotes: string;
  landCondition: string;
  landAddress: string;
  documentShmCertificateNo: string;
  documentOwnerFullName: string;
  documentWideArea: number;
  status: string;
  isAccepted?: boolean;
  decisionBy?: string;
  decisionDate?: string;
  decisionMessage?: string;
  landFile?: {
    filePath: string;
  };
  file_certificate: File;
  arrayLocation: string; // Use `File` type for the file field
}

export interface generatePayment {
  paymentType: string;
}

export interface PaymentData {
  id: string;
  memberId: string;
  status: 'Tunda' | 'Selesai' | 'Gagal' | string; // Bisa diperluas sesuai dengan kemungkinan status lainnya
  purpose: string;
  transactionId: string;
  isPaid: boolean;
  paymentMethod: 'QRIS' | 'VirtualAccount' | 'CreditCard' | string; // Bisa ditambah opsi lainnya
  paymentTotal: number;
  paymentDate: string | null; // Bisa `null` jika belum dibayar
  merchantTradeNo: string;
  platformTradeNo: string;
  qrisLink?: string; // Opsional, karena bisa jadi metode pembayaran lain
  customerNo?: string | null; // Bisa `null` atau tidak ada
  virtualAccountNo?: string | null; // Bisa `null` atau tidak ada
  expiredDate: string;
  createdAt: string;
  member: Member;
}

export interface BillItem {
  id: string;
  differer: string | null;
  description: string;
  paymentDueDate: string | null;
  totalPayment: number;
  updatedAt: string;
  createdAt: string;
}

export interface BillReferenceResponse {
  status: boolean;
  message: string;
  data: {
    total_items: number;
    page: number;
    limit: number;
    total_pages: number;
    items: BillItem[];
  };
}
export interface getPaymentHistoryResponse {
  status: boolean;
  message: string;
  data: {
    total_items: number;
    page: number;
    limit: number;
    total_pages: number;
    items: PaymentData[];
  };
}

export interface createBillData {
  description: string;
  paymentDueDate: string;
  totalPayment: number;
  createPayment: boolean;
}

interface SavingReference {
  id: string;
  differer: string | null;
  description: string;
  paymentDueDate: string;
  totalPayment: number;
  updatedAt: string;
  createdAt: string;
}

interface Payment {
  id: string;
  memberId: string;
  status: string;
  purpose: string;
  transactionId: string;
  isPaid: boolean;
  paymentMethod: string | null;
  paymentTotal: number;
  paymentDate: string | null;
  merchantTradeNo: string | null;
  platformTradeNo: string | null;
  qrisLink: string | null;
  customerNo: string | null;
  virtualAccountNo: string | null;
  expiredDate: string | null;
  filePath: string | null;
}

export interface SavingData {
  id: string;
  memberId: string;
  paymentId: string;
  savingRefId: string;
  status: string;
  totalPayment: number;
  isPaymentSuccess: boolean;
  createdAt: string;
  SavingReference: SavingReference;
  payment: Payment;
  member: Member;
}

export interface BillDatas {
  status: boolean;
  message: string;
  data: {
    total_items: number;
    page: number;
    limit: number;
    total_pages: number;
    items: SavingData[];
  };
}

export interface Simpanan {
  memberId: string;
  savingRefId: string;
  status: string;
  isPaymentSuccess?: boolean;
}

export interface Notification {
  id: string;
  title: string;
  label: string;
  message: string;
  fromAdmin: boolean;
  directPath: string | null;
  subTopic: string;
  createdAt: string; // Use a Date type if you prefer to work with Date objects
}

export interface NotificationUser {
  notificationId: string;
  userId: string;
  isReaded: boolean;
  Notification: Notification;
}

export interface NotificationResponse {
  status: boolean;
  message: string;
  data: NotificationUser[];
}
