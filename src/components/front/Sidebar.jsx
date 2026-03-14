import React from 'react';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-100 h-screen shadow-md p-4">
      <h2 className="text-xl font-semibold mb-6">Menu</h2>
      <ul className="space-y-3">
        <li className="hover:bg-gray-200 p-2 rounded cursor-pointer">Dashboard</li>
        <li className="hover:bg-gray-200 p-2 rounded cursor-pointer">Products</li>
        <li className="hover:bg-gray-200 p-2 rounded cursor-pointer">Orders</li>
        <li className="hover:bg-gray-200 p-2 rounded cursor-pointer">Users</li>
        <li className="hover:bg-gray-200 p-2 rounded cursor-pointer">Reports</li>
        <li className="hover:bg-gray-200 p-2 rounded cursor-pointer">Profile</li>
      </ul>
    </aside>
  );
};

export default Sidebar;