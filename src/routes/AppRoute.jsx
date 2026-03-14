import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from '../Layout/RootLayout';
import Customer from '../page/Dashboards/customer';
import Dashboard from '../page/Dashboards/Dashboard';
import Cashier from '../page/Dashboards/cashier';
import Supplier from '../page/Dashboards/supplier';
import Manager from '../page/Dashboards/manager';
import Admin from '../page/Dashboards/admin';
import RootFrontLayout from '../Layout/RootFrontLayout';
import HomePage from '../page/Front/HomePage'
import Login from '../components/front/login';
import Register from '../components/front/Register';
const router = createBrowserRouter([
  {
    path: '/dashboard', 
    element: <RootLayout />,
    children: [
      {
        index: true, // /dashboard will render Dashboard
        element: <Dashboard />
      },
      {
        path: 'admin', // no leading '/'
        element: <Admin />
      },
      {
        path: 'customer',
        element: <Customer />
      },
      {
        path: 'cashier',
        element: <Cashier />
      },
      {
        path: 'supplier',
        element: <Supplier />
      },
      {
        path: 'manager',
        element: <Manager />
      }
    ],
  },
  {
    path: '/',
    element: <RootFrontLayout />,
    children: [
      { index: true, element: <HomePage /> },

    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  }

]);

export const AppRoute = () => <RouterProvider router={router} />;