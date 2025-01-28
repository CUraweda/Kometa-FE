import { createBrowserRouter } from "react-router-dom";
import ForgetPage from "../../pages/Forget.page";
import HomePage from "../../pages/Home.page";
import PaidPage from "../../pages/Paid.page";
import PaymentPage from "../../pages/Payment.page";
import RegisterMember from "../../pages/Register.page";
import ResetPage from "../../pages/Reset.page";
import SentPage from "../../pages/Sent.page";
import SignInPage from "../../pages/SignIn.page";
import SignUpPage from "../../pages/SignUp.page";
import VerifyOTPPage from "../../pages/VerifyOTP.page";
import { listedUser, listedAdmin } from "./listed";
import NotFoundPage from "../../pages/NotFound.page";
import DashboardPage from "../../pages/Dashboard.page";
import ProtectedLayout from "../../layout/Protected.layout";
import LandingLayout from "../../layout/Landing.layout";
import DashboardLayout from "../../layout/Dashboard.layout";
import PlantingPage from "../../pages/Planting.page";
import SupplierPage from "../../pages/Supplier.page";
import FinancePage from "../../pages/Finance.page";
import ProfilePage from "../../pages/Profile.page";
import Pendapatan from "@/pages/admin/Pendapatan";
import Anggota from "@/pages/admin/Anggota";
import DetailAnggota from "@/pages/admin/DetailAnggota";
import AnggotaBaru from "@/pages/admin/AnggotaBaru";
import DetailAnggotaBaru from "@/pages/admin/DetailAnggotaBaru";
import AddLandPage from "@/pages/AddLand.page";
import DashboardAdminLayout from "../../layout/DashboardAdmin.layout";
import Lahan from "@/pages/admin/Lahan";
import DashboardAdmin from "@/pages/admin/DashboardAdmin";
import LahanBaru from "@/pages/admin/LahanBaru";
import Budidaya from "@/pages/admin/Budidaya";
import Simpanan from "@/pages/admin/Simpanan";
import Tagihan from "@/pages/admin/Tagihan";
// import OTPVerification from "@/pages/testOTP";
import Test from "@/pages/test";
import LandDetails from "@/pages/land/LandDetails.page";
import LandPage from "@/pages/land/Land.page";
import UnVerifiedPage from "@/pages/UnVerified.page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
  { path: listedUser.signin, element: <SignInPage /> },
  { path: listedUser.signup, element: <SignUpPage /> },
  { path: listedUser.forget, element: <ForgetPage /> },
  { path: listedUser.reset, element: <ResetPage /> },
  { path: listedUser.sent, element: <SentPage /> },
  { path: listedUser.verify, element: <VerifyOTPPage /> },
  { path: listedUser.registerMember, element: <RegisterMember /> },
  { path: listedUser.payment, element: <PaymentPage /> },
  { path: listedUser.paid, element: <PaidPage /> },
  { path: listedUser.error, element: <NotFoundPage /> },

  {
    element: (
      <ProtectedLayout>
        <DashboardLayout />
      </ProtectedLayout>
    ),
    children: [
      {
        path: listedUser.dashboard,
        element: <DashboardPage />,
      },
      {
        path: listedUser.land,
        children: [
          {
            index: true,
            element: <LandPage />,
          },
          { path: listedUser.tambahLahan, element: <AddLandPage /> },
          { path: listedUser.detailLahan, element: <LandDetails /> },
        ],
      },
      { path: listedUser.planting, element: <PlantingPage /> },
      { path: listedUser.supplier, element: <SupplierPage /> },
      { path: listedUser.finance, element: <FinancePage /> },
      { path: listedUser.profile, element: <ProfilePage /> },

      { path: listedUser.test, element: <Test /> },
      { path: listedUser.dahsboardVerfi, element: <UnVerifiedPage /> },
    ],
  },
  {
    element: (
      <ProtectedLayout>
        <DashboardAdminLayout />
      </ProtectedLayout>
    ),
    children: [
      { path: listedAdmin.dashboard, element: <DashboardAdmin /> },
      { path: listedAdmin.adminAnggota, element: <Anggota /> },
      { path: listedAdmin.detailAnggota, element: <DetailAnggota /> },
      { path: listedAdmin.anggotaBaru, element: <AnggotaBaru /> },
      { path: listedAdmin.DetailAnggotaBaru, element: <DetailAnggotaBaru /> },
      { path: listedAdmin.lahan, element: <Lahan /> },
      { path: listedAdmin.pendapatan, element: <Pendapatan /> },
      { path: listedAdmin.lahanBaru, element: <LahanBaru /> },
      { path: listedAdmin.budidaya, element: <Budidaya /> },
      { path: listedAdmin.simpanan, element: <Simpanan /> },
      { path: listedAdmin.tagihan, element: <Tagihan /> },
    ],
  },
]);
