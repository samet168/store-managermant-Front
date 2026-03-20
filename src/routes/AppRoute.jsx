import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "../Layout/RootLayout";
import RootFrontLayout from "../Layout/RootFrontLayout";

import Dashboard from "../page/Dashboards/Dashboard";
import Admin from "../page/Dashboards/admin";
import User from "../page/Dashboards/user";
import Customer from "../page/Dashboards/customer";
import Cashier from "../page/Dashboards/cashier";
import Supplier from "../page/Dashboards/supplier";
import Manager from "../page/Dashboards/manager";

import Products from "../page/Dashboards/Products";
import AddProduct from "../page/Dashboards/admin/AddProduct";
import EditProduct from "../page/Dashboards/admin/EditProduct";

import AddUser from "../page/Dashboards/admin/AddUser";
import EditUser from "../page/Dashboards/admin/EditUser";

import CategoryAdmin from "../page/Dashboards/admin/CategoryAdmin";

import HomePage from "../page/Front/HomePage";
import ProductDetail from "../page/Front/ProductDetail ";

import Login from "../components/front/login";
import Register from "../components/front/Register";
import LoginDS from "../components/dashboard/login";
import AddCategory from "../page/Dashboards/admin/AddCategory";
import EditCategory from "../page/Dashboards/admin/EditCategory";
import AddSupplier from "../page/Dashboards/admin/AddSupplier";
import EditSupplier from "../page/Dashboards/admin/EditSupplier";
import Orders from "../page/Dashboards/Orders";
import AddOrders from "../page/Dashboards/admin/AddOrders";
import EditOrders from "../page/Dashboards/admin/EditOrders";
import ShowOrder from "../page/Dashboards/admin/ShowOrder";
import StockLogs from "../page/Dashboards/stockLogs";
import AddStock from "../page/Dashboards/admin/AddStock";
import EditStock from "../page/Dashboards/admin/EditStock";

const router = createBrowserRouter([
  // ================= DASHBOARD =================
  {
    path: "/dashboard",
    element: <RootLayout />,
    children: [
      { index: true, element: <Dashboard /> },

      { path: "admin", element: <Admin /> },

      // 🔥 PRODUCT
      { path: "admin/products", element: <Products /> },
      { path: "admin/products/add-product", element: <AddProduct /> },
      { path: "admin/products/edit/:id", element: <EditProduct /> },

      // 🔥 USER
      { path: "admin/users", element: <User /> },
      { path: "admin/users/add-user", element: <AddUser /> },
      { path: "admin/users/edit/:id", element: <EditUser /> },

      // 🔥 CATEGORY (FIXED)
      {
        path: "admin/categories",
        element: <CategoryAdmin />,
      },
      {
        path: "admin/categories/add",
        element: <AddCategory />,
      },
      {
        path: "admin/categories/edit/:id",
        element: <EditCategory />,
      },
      // suppliers
      {
        path: "admin/suppliers",
        element: <Supplier />,
      },
      {
        path: "admin/suppliers/add",
        element: <AddSupplier />,
      },
      {
        path: "admin/suppliers/edit/:id",
        element: <EditSupplier />,
      },
      //order
      {
        path: "admin/orders",
        element: <Orders />,
      },
      {
        path: "admin/orders/add-order",
        element: <AddOrders />,
      }
      ,
      {
        path: "admin/orders/edit/:id",
        element: <EditOrders />,
      },
      {
        path: "admin/orders/show/:id",
        element: <ShowOrder />,
      },
      //stock
      {
        path: "admin/stock-logs",
        element: <StockLogs />,

      },
      {
        path: "admin/stock-logs/add",
        element: <AddStock />,
      }
      ,
      {
        path: "admin/stock-logs/edit/:id",
        element: <EditStock />,
      },


      // OTHER ROLE
      { path: "user", element: <User /> },
      { path: "customer", element: <Customer /> },
      { path: "cashier", element: <Cashier /> },
      { path: "supplier", element: <Supplier /> },
      { path: "manager", element: <Manager /> },

      { path: "login", element: <LoginDS /> },
    ],
  },

  // ================= FRONT =================
  {
    path: "/",
    element: <RootFrontLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "product/:id", element: <ProductDetail /> },
    ],
  },

  // ================= AUTH =================
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
]);

export const AppRoute = () => <RouterProvider router={router} />;
