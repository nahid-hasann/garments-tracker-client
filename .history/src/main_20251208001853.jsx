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
        path: '/dashboard',
        element: <DashBoard></DashBoard>
      }
    ]
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashBoard />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <DashBoard />   
      },
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster position="top-right" />
    </AuthProvider>
  </StrictMode>,
)
