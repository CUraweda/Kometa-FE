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
        roleId: string;
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
  