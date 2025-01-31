import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import OTPInput from "react-otp-input";
import { useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import signupBackground from "../assets/content/signup-bg.png";
import Header from "../components/content/header.sign";
import { Message } from "../components/form/error.field";
import { commonMessage } from "../constant/form/validation.message";
import { modalList } from "../constant/modals";
import { listedUser } from "../constant/routers/listed";
import { useCountdown } from "../hooks/useCountdown";
import { useModal } from "../hooks/useModal";
import SignLayout from "../layout/sign.layout";

function VerifyOTPPage() {
  const MAX_OTP = 6;
  const navigate = useNavigate();
  const {
    state: { phoneNumber },
  } = useLocation();

  const [otp, setOTP] = useState("");
  const [phone] = useState(phoneNumber);

  const { openModal, closeModal, Modal } = useModal();

  const { time, clear, isNull } = useCountdown(120);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<{ mobilePhoneNumber: string }>({
    defaultValues: { mobilePhoneNumber: "" },
    resolver: yupResolver(
      yup.object().shape({
        mobilePhoneNumber: yup
          .string()
          .matches(/^[0-9]+$/gi, commonMessage.notanumber)
          .required(commonMessage.phoneRequired)
          .min(10, commonMessage.phoneMaxDigit),
      })
    ),
  });

  const handleResetTimer = () => {
    clear();
    window.location.reload();
  };

  const handleUpdatePhone = () => {
    handleSubmit(({ mobilePhoneNumber }) => {
      reset();
      handleResetTimer();
      closeModal(modalList.updatePhone);
      navigate(listedUser.verify, { state: { phoneNumber: mobilePhoneNumber } });
    })();
  };

  const handleSendOTP = () => {
    if (otp.length == MAX_OTP) {
      window.alert(otp);
      clear();
      navigate(listedUser.registerMember);
    }
  };

  return (
    <SignLayout bg={signupBackground}>
      <Header
        title="Masukkan Kode OTP"
        description={
          <>
            <p>Masukkan 6 digit kode yang telah dikirim</p>
            <p>
              ke Whatsapp
              <span className="text-emeraldGreen ml-1 font-bold">
                +62 {phone}
              </span>
            </p>
          </>
        }
      />
      <OTPInput
        inputStyle={{
          borderRadius: 6,
          width: 54,
          height: 48,
          fontSize: 18,
          marginTop: 42,
        }}
        containerStyle={{
          display: "flex",
          justifyContent: "center",
          gap: 12,
        }}
        numInputs={MAX_OTP}
        onChange={(value) => setOTP(value)}
        value={otp}
        inputType={"text" as const}
        renderInput={(props) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { className, ...rest } = props;
          return (
            <input
              className="outline-none border border-darkMetal focus:border-emeraldGreen"
              {...rest}
            />
          );
        }}
        shouldAutoFocus
      />
      <div className="flex justify-between text-sm mt-3 px-2">
        {isNull ? (
          <button onClick={handleResetTimer} className="text-emeraldGreen">
            Kirim Ulang
          </button>
        ) : (
          <span className="text-emeraldGreen">{time}</span>
        )}
        <button
          className="text-blue-700"
          onClick={() => openModal(modalList.updatePhone)}
        >
          Ganti Nomor
        </button>
      </div>
      <button
        onClick={handleSendOTP}
        className="font-medium tracking-wider w-[390px] btn btn-primary text-white mt-8"
      >
        Lanjut
      </button>
      <Modal
        id={modalList.updatePhone}
        title="Perbaharui nomor"
        alignTitle="left"
      >
        <div className="flex gap-3 mt-5">
          <label className="form-control w-full">
            <input
              type="text"
              placeholder="Nomor Telepon"
              className={`input input-bordered ${
                errors.mobilePhoneNumber ? "border-red-600" : ""
              }`}
              {...register("mobilePhoneNumber")}
            />
          </label>
          <button
            type="button"
            onClick={handleUpdatePhone}
            className="btn btn-primary text-white"
          >
            Kirim OTP
          </button>
        </div>
        <Message
          isError={Boolean(errors.mobilePhoneNumber)}
          message={errors.mobilePhoneNumber?.message}
        />
      </Modal>
    </SignLayout>
  );
}

export default VerifyOTPPage;
