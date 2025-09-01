import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
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

// Auth pages
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

// Product create page
import ProductCreatePage from "./pages/ProductCreatePage";
import RequireAdmin from "./components/RequireAdmin";

// Import CartPage
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
        { path: "home2", element: <HomePage2 /> },
        { path: "shop/:id", element: <Shop /> },
        { path: "shop", element: <Shop /> },
        { path: "about", element: <About /> },
        { path: "contact", element: <Contact /> },
        { path: "products", element: <Products /> },
        { path: "cart", element: <CartPage /> },
        { path: "/success/:session_id", element: <Success /> },
        { path: "/cancel", element: <Cancel /> },
        { path: "/orders" ,element: <OrdersPage />} ,
        {
          path: "/users",
          element: (
            <RequireAdmin>
              <UsersPage />
            </RequireAdmin>
          ),
        },
      ],
    },
    // Auth routes (no Header/Footer)
    { path: "/login", element: <LoginPage /> },
    { path: "/register", element: <RegisterPage /> },
    { path: "/forgot-password", element: <ForgotPasswordPage /> },
    { path: "/reset-password/:token", element: <ResetPasswordPage /> },

    // Admin-protected route
    {
      path: "create-product",
      element: (
        <RequireAdmin>
          <ProductCreatePage />
        </RequireAdmin>
      ),
    },
    {
      path: "/create-product/:id",
      element: (
        <RequireAdmin>
          <ProductCreatePage />
        </RequireAdmin>
      ),
    },
    {
      path: "/categories",
      element: (
        <RequireAdmin>
          <CategoriesPage />
        </RequireAdmin>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}
