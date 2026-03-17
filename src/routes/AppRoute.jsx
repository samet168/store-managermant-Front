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
import User from '../page/Dashboards/user';
import LoginDS from '../components/dashboard/login';
import ProductDetail from '../page/Front/ProductDetail ';
import AddProduct from '../page/Dashboards/admin/AddProduct';
import EditProduct from '../page/Dashboards/admin/EditProduct';
import Products from '../page/Dashboards/admin/Products';
import UserAdmin from '../page/Dashboards/admin/UserAdmin';
import AddUser from '../page/Dashboards/admin/AddUser';
import EditUser from '../page/Dashboards/admin/EditUser';
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
        element: <Admin />,
      },
       {
        path: 'admin/add-product',
        element: <AddProduct />
      },
      {
        path: 'admin/edit-product/:id',
        element: <EditProduct />
      },
      {
        path: 'admin/products',
        element: <Products />
      },
      {
        path: 'admin/create-user',
        element: <Admin />
      },
      //
      {
        path: 'user',
        element: <User />
      },
      {
        path: 'admin/users',
        element: <UserAdmin />
      },
      {
        path: 'admin/users/add-user',
        element: <AddUser />
      },
      {
        path: 'admin/edit-user/:id',
        element: <EditUser />
      },
      {
        path: 'admin/delete-user/:id',
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
      },
      {
        path: 'login',
        element: <LoginDS />
      }
    ],
  },
  {
  path: '/',
  element: <RootFrontLayout />,
  children: [
    { index: true, element: <HomePage /> },
    { path: 'product/:id', element: <ProductDetail /> }
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