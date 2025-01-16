import SignInForm from "../component/form/signin.form";
import SignLayout from "../layout/sign.layout";
import signinBackground from "../assets/content/signin-bg.png";
import { useLocation } from "react-router-dom";

function SignInPage() {
  const location = useLocation();

  return (
    <SignLayout
      bg={signinBackground}
      hideBack={Boolean(location?.state?.hideBack)}
    >
      <SignInForm />
    </SignLayout>
  );
}

export default SignInPage;
