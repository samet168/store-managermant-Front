// import { Navigate, Outlet } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";

// const ProtectedRoute = ({ allowedRoles }) => {
//   const token = localStorage.getItem("token");

//   if (!token) {
//     return <Navigate to="/dashboard/login" />;
//   }

//   try {
//     const decoded = jwtDecode(token);

//     const role = decoded?.role || decoded?.user?.role;

//     if (!role) {
//       return <Navigate to="/dashboard/login" />;
//     }

//     if (!allowedRoles.includes(role)) {
        
//       return <Navigate to="/dashboard/admin" />;
//     }

//     return <Outlet />;
//   } catch (error) {
//     console.error("Invalid token:", error);
//     return <Navigate to="/login" />;
//   }
// };

// export default ProtectedRoute;