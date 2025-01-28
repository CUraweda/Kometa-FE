export interface provinces {
    id: string;
    name: string;
}

export interface Register {
    name: string,
    email: string,
    password: string,
    confirm_password: string,
    phoneWA: string
    roleId: string
}
export interface Login {

    email: string,
    password: string,

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
         id: string
        name: string
        code: string
        }
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
    data: {
        id: string;
        userId: string;
        membershipTypeId: string;
        fullName: string;
        nik: string;
        gender: "L" | "P";
        pob: string;
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
        membershipType: {
            id: string;
            name: string;
            foregroundColor: string;
            backgroundColor: string;
        };
        MemberFile: any[]; // If the structure of MemberFile is known, replace `any` with the appropriate type.
    };
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
  createdAt: string; // ISO date string
  fullName: string;
  membershipType: MembershipType;
  registrationPaymentMethod: string | null;
  isVerified: boolean;
  user: User;
}

interface MembershipType {
  id: string;
  name: string;
  foregroundColor: string;
  backgroundColor: string;
}

interface User {
  id: string;
  phoneWA: string;
  email: string;
}

export interface verifMember {
  isVerified: boolean
  rejectedMessage?: string
}