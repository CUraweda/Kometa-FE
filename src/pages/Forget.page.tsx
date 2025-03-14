import forgetBackground from "../assets/content/forget.jpg";
import ForgetForm from "../components/form/forget.form";
import SignLayout from "../layout/sign.layout";

function ForgetPage() {
  return (
    <SignLayout bg={forgetBackground}>
      <ForgetForm />
    </SignLayout>
  );
}

export default ForgetPage;
