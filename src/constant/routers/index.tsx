import { createBrowserRouter } from "react-router-dom";
import HomePage from "../../pages/Home.page";
import Layout from "../../layout";
import SignInPage from "../../pages/SignIn.page";
import SignUpPage from "../../pages/SignUp.page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
  { path: "/signin", element: <SignInPage /> },
  { path: "/signup", element: <SignUpPage /> },
]);
