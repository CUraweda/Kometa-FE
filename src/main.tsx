import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./constant/routers";
import "./index.css";
import { Toaster } from "sonner";
import ErrorBoundary from "./ErrorBoundary";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>

      <Toaster position="top-right" duration={3000} />
      <RouterProvider router={router} />
    </ErrorBoundary>
  </StrictMode>
);
