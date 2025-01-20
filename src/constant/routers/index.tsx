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
import { listed } from "./listed";
import NotFoundPage from "../../pages/NotFound.page";
import DashboardPage from "../../pages/Dashboard.page";
import ProtectedLayout from "../../layout/Protected.layout";
import LandingLayout from "../../layout/Landing.layout";
import DashboardLayout from "../../layout/Dashboard.layout";
import DashboardLayoutAdmin from "../../layout/DashboardAdmin.layout";
import LandPage from "../../pages/Land.page";
import PlantingPage from "../../pages/Planting.page";
import SupplierPage from "../../pages/Supplier.page";
import FinancePage from "../../pages/Finance.page";
import ProfilePage from "../../pages/Profile.page";
import Pendapatan from "@/pages/admin/Pendapatan";
import Anggota from "@/pages/admin/Anggota";
import DetailAnggota from "@/pages/admin/DetailAnggota";
import AnggotaBaru from "@/pages/admin/AnggotaBaru";
import DetailAnggotaBaru from "@/pages/admin/DetailAnggotaBaru";

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
  { path: listed.signin, element: <SignInPage /> },
  { path: listed.signup, element: <SignUpPage /> },
  { path: listed.forget, element: <ForgetPage /> },
  { path: listed.reset, element: <ResetPage /> },
  { path: listed.sent, element: <SentPage /> },
  { path: listed.verify, element: <VerifyOTPPage /> },
  { path: listed.registerMember, element: <RegisterMember /> },
  { path: listed.payment, element: <PaymentPage /> },
  { path: listed.paid, element: <PaidPage /> },
  { path: listed.error, element: <NotFoundPage /> },
  {
    element: (
      <ProtectedLayout>
        <DashboardLayout />
      </ProtectedLayout>
    ),
    children: [
      {
        path: listed.dashboard,
        element: <DashboardPage />,
      },
      { path: listed.land, element: <LandPage /> },
      { path: listed.planting, element: <PlantingPage /> },
      { path: listed.supplier, element: <SupplierPage /> },
      { path: listed.finance, element: <FinancePage /> },
      { path: listed.profile, element: <ProfilePage /> },
      { path: listed.adminPendapatan, element: <Pendapatan /> },
    ],
  },
  {
    element: (
      <ProtectedLayout>
        <DashboardLayoutAdmin />
      </ProtectedLayout>
    ),
    children: [
      { path: listed.adminPendapatan, element: <Pendapatan /> },
      { path: listed.adminAnggota, element: <Anggota /> },
      { path: listed.detailAnggota, element: <DetailAnggota /> },
      { path: listed.anggotaBaru, element: <AnggotaBaru /> },
      { path: listed.DetailAnggotaBaru, element: <DetailAnggotaBaru /> },
    ],
  },
]);
