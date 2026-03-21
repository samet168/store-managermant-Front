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

      // OTHER ROLE
      { path: "user", element: <User /> },
      { path: "customer", element: <Customer /> },
      { path: "cashier", element: <Cashier /> },
      { path: "supplier", element: <Supplier /> },
      { path: "manager", element: <Manager /> },
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
      { path: "checkout" ,element: <Checkout />},
      { path: "checkout/:id/:qty", element: <Checkout /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <HomePage /> },
    ],
  },
]);

export const AppRoute = () => <RouterProvider router={router} />;




// import React from "react";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";

// // Imports (same as original, preserved)
// import RootLayout from "../Layout/RootLayout";
// import RootFrontLayout from "../Layout/RootFrontLayout";

// // DASHBOARD
// import Dashboard from "../page/Dashboards/Dashboard";
// import Admin from "../page/Dashboards/admin";
// import User from "../page/Dashboards/user";
// import Customer from "../page/Dashboards/customer";
// import Cashier from "../page/Dashboards/cashier";
// import Supplier from "../page/Dashboards/supplier";
// import Manager from "../page/Dashboards/manager";

// import Products from "../page/Dashboards/Products";
// import AddProduct from "../page/Dashboards/admin/AddProduct";
// import EditProduct from "../page/Dashboards/admin/EditProduct";

// import AddUser from "../page/Dashboards/admin/AddUser";
// import EditUser from "../page/Dashboards/admin/EditUser";

// import CategoryAdmin from "../page/Dashboards/admin/CategoryAdmin";
// import AddCategory from "../page/Dashboards/admin/AddCategory";
// import EditCategory from "../page/Dashboards/admin/EditCategory";

// import AddSupplier from "../page/Dashboards/admin/AddSupplier";
// import EditSupplier from "../page/Dashboards/admin/EditSupplier";

// import Orders from "../page/Dashboards/Orders";
// import AddOrders from "../page/Dashboards/admin/AddOrders";
// import EditOrders from "../page/Dashboards/admin/EditOrders";
// import ShowOrder from "../page/Dashboards/admin/ShowOrder";

// import StockLogs from "../page/Dashboards/stockLogs";
// import AddStock from "../page/Dashboards/admin/AddStock";
// import EditStock from "../page/Dashboards/admin/EditStock";

// // FRONT
// import HomePage from "../page/Front/HomePage";
// import ProductDetail from "../page/Front/ProductDetail ";
// import Checkout from "../page/Front/Checkout";
// import Cart from "../page/Front/Cart";
// import ProductsF from "../page/Front/Products";
// import About from "../page/Front/About";

// // AUTH
// import Login from "../components/front/login";
// import Register from "../components/front/Register";

// // ProtectedRoute
// import ProtectedRoute from "../components/ProtectedRoute";
// import Contact from "../page/Front/Contact";

// const router = createBrowserRouter([
//   // AUTH
//   { path: "/login", element: <Login /> },
//   { path: "/register", element: <Register /> },

//   // DASHBOARD
//   {
//     path: "/dashboard",
//     element: <RootLayout />,
//     children: [
//       { index: true, element: <Dashboard /> },

//       { path: "admin", element: <ProtectedRoute allowedRoles={["admin"]}><Admin /></ProtectedRoute> },
//       { path: "admin/products", element: <ProtectedRoute allowedRoles={["admin"]}><Products /></ProtectedRoute> },
//       { path: "admin/products/add-product", element: <ProtectedRoute allowedRoles={["admin"]}><AddProduct /></ProtectedRoute> },
//       { path: "admin/products/edit/:id", element: <ProtectedRoute allowedRoles={["admin"]}><EditProduct /></ProtectedRoute> },

//       { path: "admin/users", element: <ProtectedRoute allowedRoles={["admin"]}><User /></ProtectedRoute> },
//       { path: "admin/users/add-user", element: <ProtectedRoute allowedRoles={["admin"]}><AddUser /></ProtectedRoute> },
//       { path: "admin/users/edit/:id", element: <ProtectedRoute allowedRoles={["admin"]}><EditUser /></ProtectedRoute> },

//       { path: "admin/categories", element: <ProtectedRoute allowedRoles={["admin"]}><CategoryAdmin /></ProtectedRoute> },
//       { path: "admin/categories/add", element: <ProtectedRoute allowedRoles={["admin"]}><AddCategory /></ProtectedRoute> },
//       { path: "admin/categories/edit/:id", element: <ProtectedRoute allowedRoles={["admin"]}><EditCategory /></ProtectedRoute> },

//       { path: "admin/suppliers", element: <ProtectedRoute allowedRoles={["admin"]}><Supplier /></ProtectedRoute> },
//       { path: "admin/suppliers/add", element: <ProtectedRoute allowedRoles={["admin"]}><AddSupplier /></ProtectedRoute> },
//       { path: "admin/suppliers/edit/:id", element: <ProtectedRoute allowedRoles={["admin"]}><EditSupplier /></ProtectedRoute> },

//       { path: "admin/orders", element: <ProtectedRoute allowedRoles={["admin"]}><Orders /></ProtectedRoute> },
//       { path: "admin/orders/add-order", element: <ProtectedRoute allowedRoles={["admin"]}><AddOrders /></ProtectedRoute> },
//       { path: "admin/orders/edit/:id", element: <ProtectedRoute allowedRoles={["admin"]}><EditOrders /></ProtectedRoute> },
//       { path: "admin/orders/show/:id", element: <ProtectedRoute allowedRoles={["admin"]}><ShowOrder /></ProtectedRoute> },

//       { path: "admin/stock-logs", element: <ProtectedRoute allowedRoles={["admin"]}><StockLogs /></ProtectedRoute> },
//       { path: "admin/stock-logs/add", element: <ProtectedRoute allowedRoles={["admin"]}><AddStock /></ProtectedRoute> },
//       { path: "admin/stock-logs/edit/:id", element: <ProtectedRoute allowedRoles={["admin"]}><EditStock /></ProtectedRoute> },

//       { path: "user", element: <ProtectedRoute allowedRoles={["admin","manager"]}><User /></ProtectedRoute> },
//       { path: "customer", element: <ProtectedRoute allowedRoles={["customer"]}><Customer /></ProtectedRoute> },
//       { path: "cashier", element: <ProtectedRoute allowedRoles={["cashier"]}><Cashier /></ProtectedRoute> },
//       { path: "supplier", element: <ProtectedRoute allowedRoles={["supplier"]}><Supplier /></ProtectedRoute> },
//       { path: "manager", element: <ProtectedRoute allowedRoles={["manager"]}><Manager /></ProtectedRoute> },
//       { path: "login", element: <Login /> },
//     ],
//   },

//   // FRONT
//   {
//     path: "/",
//     element: <RootFrontLayout />,
//     children: [
//       { index: true, element: <HomePage /> },
//       { path: "products", element: <ProductsF /> },
//       { path: "product/:id", element: <ProductDetail /> },
//       { path: "cart", element: <Cart /> },
//       { path: "checkout", element: <Checkout /> },
//       { path: "checkout/:id/:qty", element: <Checkout /> },
//       { path: "about", element: <About /> },
//       { path: "contact", element: <Contact /> },
//     ],
//   },
// ]);

// export const AppRoute = () => <RouterProvider router={router} />;