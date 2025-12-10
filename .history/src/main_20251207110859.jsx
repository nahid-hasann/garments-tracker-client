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

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <NotFound></NotFound>
    element: <MainLayout></MainLayout>,
    children: [
      {
        index: true,
        element: <Home></Home>
      },
      {

      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
