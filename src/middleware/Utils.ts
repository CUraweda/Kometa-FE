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
  