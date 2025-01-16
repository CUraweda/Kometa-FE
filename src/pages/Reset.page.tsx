import { useSearchParams } from "react-router-dom";
import signinBackground from "../assets/content/signin-bg.png";
import Error from "../component/content/error.component";
import SignLayout from "../layout/Sign.layout";
import ResetForm from "../component/form/reset.form";

function ResetPage() {
  const [searchParam] = useSearchParams();
  const token = searchParam.get("token");

  if (!token) {
    return <Error />;
  }

  return (
    <SignLayout bg={signinBackground} hideBack>
      <ResetForm />
    </SignLayout>
  );
}

export default ResetPage;
