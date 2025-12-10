import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MainLayout from './LayOut/MainLayout.jsx';
import Home from '../Page/Home.jsx';
import NotFound from '../Page/NotFound.jsx';
import AllProducts from '../Page/AllProducts.jsx';
import About from '../Page/About.jsx';
import Contact from '../Page/Contact.jsx';
import Login from '../Page/Login.jsx';

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
        path: '/register'
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
