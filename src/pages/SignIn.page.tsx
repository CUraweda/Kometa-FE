import SignInForm from "../component/form/signin.form";
import SignLayout from "../layout/sign.layout";
import signinBackground from "../assets/content/signin-bg.png";

function SignInPage() {
  return (
    <SignLayout bg={signinBackground}>
      <SignInForm />
    </SignLayout>
  );
}

export default SignInPage;
