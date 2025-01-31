import { useSearchParams } from "react-router-dom";
// import signinBackground from "../assets/content/signin-bg.png";
import Error from "../components/content/error.component";
// import SignLayout from "../layout/sign.layout";
// import ResetForm from "../components/form/reset.form";

function ResetPage() {
  const [searchParam] = useSearchParams();
  const token = searchParam.get("token");

  if (!token) {
    return <Error />;
  }

  return (
    <div>
      sa
    </div>
  //   <SignLayout bg={signinBackground} hideBack>
  //     <ResetForm />
  //   </SignLayout>
  );
}

export default ResetPage;
