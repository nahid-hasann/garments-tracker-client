import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MainLayout from './LayOut/MainLayout.jsx';
import Home from './Page/Home.jsx';
import NotFound from './Page/NotFound.jsx';
import AllProducts from './Page/AllProducts.jsx';
import About from './Page/About.jsx';
import Contact from './Page/Contact.jsx';
import Login from './Page/Login.jsx';
import Register from './Page/Register.jsx';
import AuthProvider from './Context/AuthProvider.jsx';
import { Toaster } from 'react-hot-toast';
import DashBoard from './Page/DashBoard.jsx';
import PrivateRout from './Rout/PrivateRout.jsx';
import DashboardLayout from './Page/DashboardLayout.jsx';
import MyOrders from './Dashboardpages/MyOrders.jsx';
import TrackOrder from './Dashboardpages/TrackOrder.jsx';
import AddProduct from './Dashboardpages/AddProduct.jsx';
import ManageProducts from './Dashboardpages/ManageProducts.jsx';
import PendingOrders from './Dashboardpages/PendingOrders.jsx';
import ManageUsers from './Dashboardpages/ManageUsers.jsx';
import AllProductsAdmin from './Dashboardpages/AllProductsAdmin.jsx';
import AllOrders from './Dashboardpages/AllOrders.jsx';
import ProductDetails from './Page/ProductDetails.jsx';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import OrderDetails from './Dashboardpages/OrderDetails.jsx';
import RoleRoute from './Rout/RoleRoute.jsx';
import ManagerRoute from './Rout/ManagerRoute.jsx';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <NotFound></NotFound>,
    element: <MainLayout></MainLayout>,
    children: [
      {
        index: true,
        element: <Home></Home>
      },
      {
        path: '/all-products',
        element: <AllProducts></AllProducts>
      },
      {
        path: '/about',
        element: <About></About>
      },
      {
        path: '/contact',
        element: <Contact></Contact>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/register',
        element: <Register></Register>
      },
      {
        path: '/products/:id',
        element: (
          <PrivateRout>
            <ProductDetails />
          </PrivateRout>
        )
      },
    ]
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRout>
        <DashboardLayout></DashboardLayout>
      </PrivateRout>
    ),
    children: [
      {
        index: true,
        element: <DashBoard />
      },
      { path: "my-orders", element: <MyOrders /> },
      { path: "track-order", element: <TrackOrder /> },
      { path: "add-product", element: <ManagerRoute> <AddProduct /> </ManagerRoute> },
      { path: "manage-products", element: <ManageProducts /> },
      { path: "pending-orders", element: <PendingOrders /> },
      { path: "manage-users", element: <ManageUsers /> },
      { path: "all-products", element: <AllProductsAdmin /> },
      { path: "all-orders", element: <AllOrders /> },
      { path: "orders/:id", element: <OrderDetails /> },
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster position="top-right" />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)
