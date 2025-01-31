import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { router } from "./constant/routers";
import "./index.css";
import { Toaster } from "sonner";
import { queryClient } from "./config/tanstack";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Toaster position="top-right" duration={3000} />
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
