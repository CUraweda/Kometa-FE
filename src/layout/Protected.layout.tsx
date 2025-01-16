import { ReactNode } from "react";
import CenterLayout from "./Center.layout";

function ProtectedLayout({ children }: { children: ReactNode }) {
  const isAuthenticated = true;
  return isAuthenticated ? (
    children
  ) : (
    <CenterLayout>
      <p>Anda tidak memiliki akses ke halaman ini</p>
    </CenterLayout>
  );
}

export default ProtectedLayout;
