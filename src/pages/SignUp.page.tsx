import SignUpForm from "../component/form/signup.form";
import SignLayout from "../layout/sign.layout";
import signupBackground from "../assets/content/signup-bg.png";

function SignUpPage() {
  return (
    <SignLayout bg={signupBackground}>
      <SignUpForm />
    </SignLayout>
  );
}

export default SignUpPage;
