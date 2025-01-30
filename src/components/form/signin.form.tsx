import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import * as yup from "yup";
import { commonMessage } from "../../constant/form/validation.message";
import { listedAdmin, listedUser } from "../../constant/routers/listed";
import { SignIn } from "../../types/sign";
import Header from "../content/header.sign";
import Input from "../ui/input";
import Password from "../ui/password";
import { authentication, memberRest } from "@/middleware";
import { MemberData } from "@/middleware/Utils";

function SignInForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setFocus,
  } = useForm<SignIn>({
    defaultValues: { email: "", password: "" },
    resolver: yupResolver(
      yup.object().shape({
        email: yup
          .string()
          .required(commonMessage.emailRequired)
          .email(commonMessage.emailInvalidFormat),
        password: yup.string().required(commonMessage.passwordRequired),
      })
    ),
  });

  const onSubmit = async (formData: SignIn) => {
    try {
      const response = await authentication.login(formData)
      checkData(response)
      reset();
    } catch (error) {
      console.log(error);
    }

  };

  const checkData = async (role: string) => {
    try {
      if (role === 'ADMIN') {
        navigate(listedAdmin.dashboard)
        return;
      }
      const response = await memberRest.checkData();

      if (!response || typeof response !== 'object' || !('data' in response)) {
        navigate(listedUser.registerMember);
        return;
      }

      const dataRest = response.data as MemberData;
      const isVerified = dataRest?.data?.isVerified;
      const isPaid = dataRest?.data?.registrationIsPaid;
      const idPayment = dataRest?.data?.registrationPaymentId;

      if (!isPaid) {
        const params = new URLSearchParams({
          id: idPayment ? idPayment : ''
        });

        navigate(`${listedUser.payment}?${params.toString()}`);
        return;
      }
      if (!isVerified) {
        navigate(listedUser.dahsboardVerfi);
        return;
      }

      navigate(listedUser.dashboard);
    } catch (error) {
      console.error('Error checking data:', error);
      navigate(listedUser.registerMember);
    }
  };


  useEffect(() => {
    setFocus("email");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header
        title="Selamat Datang di Kometa"
        description="Masuk sekarang untuk menikmati layanan terbaik dari koperasi kami. Akses
        mudah, cepat, dan mendukung kebutuhan Anda."
      />
      <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          placeholder="Email"
          error={errors?.email}
          {...register("email")}
        />

        <Password
          className="mt-4"
          placeholder="Kata Sandi"
          error={errors?.password}
          {...register("password")}
        />

        <div className="flex justify-end mt-2">
          <button
            type="button"
            onClick={() => navigate(listedUser.forget)}
            className="text-sm justify-self-end text-blue-700"
          >
            Lupa kata sandi?
          </button>
        </div>
        <button className="font-medium tracking-wider w-full btn bg-emeraldGreen hover:bg-emeraldGreen hover:opacity-95 text-white mt-6">
          Masuk
        </button>
        <button className="text-sm mt-6">
          Belum punya akun?
          <Link
            className="ml-1 text-emeraldGreen font-medium"
            to={listedUser.signup}
          >
            Daftar
          </Link>
        </button>
      </form>
    </>
  );
}

export default SignInForm;
