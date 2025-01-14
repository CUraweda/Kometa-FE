import { useLocation, useNavigate } from "react-router-dom";
import forgetBackground from "../assets/content/forget.jpg";
import Header from "../component/content/header.sign";
import SignLayout from "../layout/Sign.layout";

function SentPage() {
  const navigate = useNavigate();
  const {
    state: { email, type },
  } = useLocation();

  const info = {
    reset_sent: {
      title: "Email Berhasil Dikirim",
      description: (
        <>
          Instruksi reset kata sandi telah kami kirimkan ke
          <span className="text-emeraldGreen font-medium ml-1">{email}</span>.
          Silakan periksa kotak masuk atau folder spam Anda untuk melanjutkan
          proses reset.
        </>
      ),
      buttonLabel: "Kembali ke Beranda",
      path: "/",
    },
    password_changed: {
      title: "Berhasil Reset Kata Sandi",
      description: `Kata sandi Anda telah berhasil diperbarui.
        Silakan masuk dengan kata sandi baru Anda.`,
      buttonLabel: "Masuk Kembali",
      path: "/signin",
    },
  };

  const selected = type as keyof typeof info;
  const { title, description, buttonLabel, path } = info[selected] || {};

  return (
    <SignLayout bg={forgetBackground} hideBack>
      <>
        <Header title={title} description={description} />
        <button
          onClick={() =>
            navigate(path, {
              state: {
                hideBack: true,
              },
            })
          }
          className="btn btn-primary text-white mt-10"
        >
          {buttonLabel}
        </button>
      </>
    </SignLayout>
  );
}

export default SentPage;
