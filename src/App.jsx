import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import RequireAdmin from "./components/RequireAdmin";
import RedirectIfAuth from "./components/RedirectIfAuth.jsx";

import HomePage from "./pages/HomePage";
import HomePage2 from "./pages/HomePage2";
import About from "./pages/About";
import Shop from "./pages/Shop";
import Contact from "./pages/Contact";
import Products from "./pages/Products";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage.jsx";
import CategoriesPage from "./pages/CategoriesPage";
import UsersPage from "./pages/UsersPage";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";
import OrdersPage from "./pages/OrdersPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProductCreatePage from "./pages/ProductCreatePage";
import CartPage from "./pages/CartPage";

const RootLayout = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
    }}
  >
    <Header />
    <main style={{ flex: 1 }}>
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { path: "/", element: <HomePage /> },
        { path: "info", element: <HomePage2 /> },
        { path: "shop/:id", element: <Shop /> },
        { path: "shop", element: <Shop /> },
        { path: "about", element: <About /> },
        { path: "contact", element: <Contact /> },
        { path: "products", element: <Products /> },
        { path: "cart", element: <CartPage /> },
        { path: "/success/:session_id", element: <Success /> },
        { path: "/cancel", element: <Cancel /> },
        { path: "/orders" ,element: <OrdersPage />},
        // Admin-protected route
        { path: "/users", element: <RequireAdmin><UsersPage /></RequireAdmin>},
        { path: "create-product", element:   <RequireAdmin><ProductCreatePage /></RequireAdmin>},
        { path: "/create-product/:id", element:<RequireAdmin><ProductCreatePage /></RequireAdmin>},
        { path: "/categories", element:<RequireAdmin><CategoriesPage /></RequireAdmin> },
     ],
    },

    // Auth routes (no Header/Footer)
    { path: "/login", element: <RedirectIfAuth><LoginPage /></RedirectIfAuth> },
    { path: "/register", element: <RedirectIfAuth><RegisterPage /></RedirectIfAuth> },
    { path: "/forgot-password", element: <ForgotPasswordPage />},
    { path: "/reset-password/:token", element: <ResetPasswordPage /> },
  ]);

  return <RouterProvider router={router} />;
}
