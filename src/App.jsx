
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import HomePage2 from './pages/HomePage2';
import About from './pages/About';
import Shop from './pages/Shop';
import Contact from './pages/Contact';
import Products from './pages/Products';

const RootLayout = () => (
  <>
    <Header />
    <Outlet />
    <Footer />
  </>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: 'home2', element: <HomePage2 /> },
      { path: 'shop/:id', element: <Shop /> }, 
      { path: 'shop', element: <Shop /> }, 
      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },
      { path: 'products', element: <Products /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
