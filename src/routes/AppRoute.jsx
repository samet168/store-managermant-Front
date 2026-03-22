import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "../Layout/RootLayout";
import RootFrontLayout from "../Layout/RootFrontLayout";

// DASHBOARD
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
import LoginDbard from "../components/dashboard/Login";


//Manager
import ProductsManger from "../page/Dashboards/Manager/ProductManager";
import AddProductManager from "../page/Dashboards/Manager/CRUD/AddProductManager";
import EditProductManager from "../page/Dashboards/Manager/CRUD/EditProduct";

import StockLogManager from "../page/Dashboards/Manager/CRUD/stockLogs";
import AddStockLogManager from "../page/Dashboards/Manager/CRUD/AddStock";
import EditStockLogManager from "../page/Dashboards/Manager/CRUD/EditStock";

import OrderManager from "../page/Dashboards/Manager/CRUD/Orders";
import AddOrderManager from "../page/Dashboards/Manager/CRUD/AddOrders";
import ShowOrderManager from "../page/Dashboards/Manager/CRUD/ShowOrder";


//
import ProductsCashier from "../page/Dashboards/Cashier/Products";
import OrdersCashier from "../page/Dashboards/Cashier/Orders";
import CustomersCashier from "../page/Dashboards/Cashier/user";
import AddOrdersCashier from "../page/Dashboards/Cashier/CRUD/AddOrders";
import ShowOrderCashier from "../page/Dashboards/Cashier/CRUD/ShowOrder";
import AddCustomerCashier from "../page/Dashboards/Cashier/CRUD/AddUser";


//
import PurchaseList from "../page/Dashboards/supplier/PurchaseList";
import AddPurchase from "../page/Dashboards/supplier/CRUD/AddPurchase";
import EditPurchases from "../page/Dashboards/supplier/CRUD/EditPurchases";


import CustomerProductList from "../page/Dashboards/Customer/CustomerProductList";
import CustomerOrderList from "../page/Dashboards/Customer/Orders";
import EditProductCustomer from "../page/Dashboards/Customer/CRUD/EditOrders";
import AddOrderCustomer from "../page/Dashboards/Customer/CRUD/AddOrders";
import ShowOrderCustomer from "../page/Dashboards/Customer/CRUD/ShowOrder";
import EditOrderCustomer from "../page/Dashboards/Customer/CRUD/EditOrders";

// FRONT
import HomePage from "../page/Front/HomePage";
// import ProductDetail from "../page/Front/ProductDetail";

// AUTH
import Login from "../components/front/login";
import Register from "../components/front/Register";
import ProductDetail from "../page/Front/ProductDetail ";
import Checkout from "../page/Front/Checkout";
import Cart from "../page/Front/Cart";
import ProductsF from "../page/Front/Products";
import About from "../page/Front/About";
import OrderList from '../page/Front/Customerorderlist';
import CheckoutPage from "../page/Front/Checkoutpage";
import ProfilePage from "../page/Front/Profilepage";



const router = createBrowserRouter([
  // ================= AUTH =================
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },

  // ================= DASHBOARD =================
  {
    path: "/dashboard",
    element: <RootLayout />,
    children: [
      { index: true, element: <Dashboard /> },
        {
          path: "dashboard/login",
          element: <LoginDbard />,
        },
        // {
        //   path: "dashboard/register",
        //   element: <Register />,
        // },

      // ADMIN
      { path: "admin", element: <Admin /> },

      // PRODUCT
      { path: "admin/products", element: <Products /> },
      { path: "admin/products/add-product", element: <AddProduct /> },
      { path: "admin/products/edit/:id", element: <EditProduct /> },

      // USER
      { path: "admin/users", element: <User /> },
      { path: "admin/users/add-user", element: <AddUser /> },
      { path: "admin/users/edit/:id", element: <EditUser /> },

      // CATEGORY
      { path: "admin/categories", element: <CategoryAdmin /> },
      { path: "admin/categories/add", element: <AddCategory /> },
      { path: "admin/categories/edit/:id", element: <EditCategory /> },

      // SUPPLIER
      { path: "admin/suppliers", element: <Supplier /> },
      { path: "admin/suppliers/add", element: <AddSupplier /> },
      { path: "admin/suppliers/edit/:id", element: <EditSupplier /> },

      // ORDERS
      { path: "admin/orders", element: <Orders /> },
      { path: "admin/orders/add-order", element: <AddOrders /> },
      { path: "admin/orders/edit/:id", element: <EditOrders /> },
      { path: "admin/orders/show/:id", element: <ShowOrder /> },

      // STOCK
      { path: "admin/stock-logs", element: <StockLogs /> },
      { path: "admin/stock-logs/add", element: <AddStock /> },
      { path: "admin/stock-logs/edit/:id", element: <EditStock /> },

      // Manager

      {
        path: "/dashboard/manager",
        element: <Manager />,
      },
      {
        path: "/dashboard/manager/products",
        element: <ProductsManger />,
      },
      {
        path: "/dashboard/manager/products/edit/:id",
        element: <EditProductManager />,
      },
      {
        path: "/dashboard/manager/stock",
        element: <StockLogManager />,
      },
      {
        path:"/dashboard/manager/stock/add",
        element: <AddStockLogManager />
      },
      {
        path:"/dashboard/manager/stock/edit/:id",
        element: <EditStockLogManager />
      },
      {
        path:"/dashboard/manager/orders",
        element: <OrderManager />
      },
      {
        path:"/dashboard/manager/orders/add",
        element: <AddOrderManager />
      },
      {
        path:"/dashboard/manager/orders/show/:id",
        element: <ShowOrderManager />
      },

      // Cashier
      {
        path: "/dashboard/cashier",
        element: <Cashier />,
      },
      {
        path: "/dashboard/cashier/products",
        element: <ProductsCashier />,
      },
      {
        path: "/dashboard/cashier/orders",
        element: <OrdersCashier />,
      },
      {
        path: "/dashboard/cashier/orders/add",
        element: <AddOrdersCashier />,
      },
      {
        path: "/dashboard/cashier/orders/show/:id",
        element: <ShowOrderCashier />,
      },
      {
        path: "/dashboard/cashier/customers",
        element: <CustomersCashier />,
      },
      {
        path: "/dashboard/cashier/customers/add",
        element: <AddCustomerCashier />,
      },
 //=========================
      {
        path: "/dashboard/supplier/purchases",
        element: <PurchaseList />,
      },
      {
        path: "/dashboard/supplier/purchases/add",
        element: <AddPurchase />,
      },{
        path: "/dashboard/supplier/purchases/edit/:id",
        element: <EditPurchases />,
      },

      //
      { path: '/dashboard/customer/products',       element: <CustomerProductList /> },
      { path: '/dashboard/customer/products/edit/:id',   element: <EditProductCustomer /> },
      { path: '/dashboard/customer/orders',element: <CustomerOrderList /> },
      { path: '/dashboard/customer/orders/add',element: <AddOrderCustomer /> },
      { path: '/dashboard/customer/orders/show/:id',element: <ShowOrderCustomer /> },
      { path: '/dashboard/customer/orders/edit/:id',element: <EditOrderCustomer /> },


      





      { path: "user", element: <User /> },
      { path: "customer", element: <Customer /> },
      { path: "cashier", element: <Cashier /> },
      { path: "supplier", element: <Supplier /> },
      { path: "login", element: <LoginDbard /> },

    ],
  },

  // ================= FRONT =================
  {
    path: "/",
    element: <RootFrontLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "products", element: <ProductsF /> },
      { path: "product/:id", element: <ProductDetail /> },
      { path: "cart", element: <Cart /> },
      // { path: "checkout" ,element: <Checkout />},
      { path: "checkout/:id/:qty", element: <Checkout /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <HomePage /> },
      { path: '/checkout', element: <CheckoutPage /> },
      { path: '/profile', element: <ProfilePage /> }


    ],
  },
]);

export const AppRoute = () => <RouterProvider router={router} />;


