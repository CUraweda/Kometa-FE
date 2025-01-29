import { ReactNode } from "react";
import CenterLayout from "./center.layout";
import useAuthStore from "@/store/auth.store";
import { useNavigate } from "react-router-dom";

function ProtectedLayout({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  
  return isAuthenticated ? (
    children
  ) : (
    <CenterLayout className="flex flex-col">
      <p>Anda tidak memiliki akses ke halaman ini</p>
      <button className="btn btn-ghost bg-emeraldGreen text-white" onClick={() => navigate('/')}>Home</button>
    </CenterLayout>
  );
}

export default ProtectedLayout;
