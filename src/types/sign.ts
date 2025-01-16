export type SignIn = {
  email: string;
  password: string;
};

export type SignUp = {
  email: string;
  phoneNumber: string;
  password: string;
  repeatPassword: string;
};

export type Reset = Omit<SignUp, "email" | "phoneNumber">;

export type Forget = Omit<SignIn, "password">;
