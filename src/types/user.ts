import { SignUp } from "./sign";

export type Profile = Omit<SignUp, "password" | "repeatPassword"> & {
  name: string;
};
