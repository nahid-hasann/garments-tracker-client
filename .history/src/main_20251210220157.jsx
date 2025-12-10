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
// import RoleRoute from './Rout/RoleRoute.jsx';
import ManagerRoute from './Rout/ManagerRoute.jsx';
import BuyerRoute from './Rout/BuyerRoute.jsx';
import UpdateProduct from './Dashboardpages/UpdateProduct.jsx';
import ApprovedOrders from './Dashboardpages/ApprovedOrders.jsx';
import Profile from './Dashboardpages/Profile.jsx';
import { HelmetProvider } from 'react-helmet-async';
import AdminRoute from './Rout/AdminRoute.jsx';
import TrackOrderDetails from './Dashboardpages/TrackOrderDetails.jsx';

// main.jsx / main entry file
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);


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
        <DashboardLayout />
      </PrivateRout>
    ),
    children: [
      {
        index: true,
        element: <DashBoard />
      },

      // 👇 Buyer routes
      {
        path: "my-orders",
        element: (
          <BuyerRoute>
            <MyOrders />
          </BuyerRoute>
        ),
      },
      {
        path: "track-order",
        element: (
          <BuyerRoute>
            <TrackOrder />
          </BuyerRoute>
        ),
      },

      // 👇 Manager routes
      {
        path: "add-product",
        element: (
          <ManagerRoute>
            <AddProduct />
          </ManagerRoute>
        ),
      },
      {
        path: "manage-products",
        element: (
          <ManagerRoute>
            <ManageProducts />
          </ManagerRoute>
        ),
      },
      {
        path: "pending-orders",
        element: (
          <ManagerRoute>
            <PendingOrders />
          </ManagerRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
          
         
        ),
      },
      {
        path: "all-products",
        element: (
          <AdminRoute>
            <AllProductsAdmin />
          </AdminRoute>
        ),
      },
      {
        path: "all-orders",
        element: (
         <AdminRoute>
            <AllOrders />
         </AdminRoute>
        ),
      },
      {
        path: "orders/:id",
        element: (

          <OrderDetails />

        ),
      },
      {
        path: "update-product/:id",
        element: <ManagerRoute><UpdateProduct /></ManagerRoute>,
      },
      { path: "approved-orders", element: <ManagerRoute><ApprovedOrders /></ManagerRoute> },
      { path: "profile", element: <Profile /> },
      { path: "track-order/:orderId", element: <TrackOrderDetails /> },


    ],
  }

]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <HelmetProvider>
          <RouterProvider router={router} />
          <Toaster position="top-right" />
        </HelmetProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)
