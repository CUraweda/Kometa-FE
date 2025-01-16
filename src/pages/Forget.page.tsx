import forgetBackground from "../assets/content/forget.jpg";
import ForgetForm from "../component/form/forget.form";
import SignLayout from "../layout/Sign.layout";

function ForgetPage() {
  return (
    <SignLayout bg={forgetBackground}>
      <ForgetForm />
    </SignLayout>
  );
}

export default ForgetPage;
