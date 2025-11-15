import React from "react";
import { NavLink } from "react-router-dom";
import {
  AiOutlineDashboard,
  AiOutlineAppstoreAdd,
  AiOutlineShop,
  AiOutlineUser,
  AiOutlineShoppingCart,
  AiOutlineTag,
} from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import Card from "../UI/Card";

const AdminMenu = () => {
  const menuItems = [
    {
      path: "/dashborad/admin",
      icon: <AiOutlineDashboard size={20} />,
      label: "Dashboard",
    },
    {
      path: "/dashborad/admin/create-category",
      icon: <BiCategory size={20} />,
      label: "Create Category",
    },
    {
      path: "/dashborad/admin/create-product",
      icon: <AiOutlineAppstoreAdd size={20} />,
      label: "Create Product",
    },
    {
      path: "/dashborad/admin/products",
      icon: <AiOutlineShop size={20} />,
      label: "Products",
    },
    {
      path: "/dashborad/admin/coupons",
      icon: <AiOutlineTag size={20} />,
      label: "Coupons",
    },
    {
      path: "/dashborad/admin/orders",
      icon: <AiOutlineShoppingCart size={20} />,
      label: "Orders",
    },
    {
      path: "/dashborad/admin/users",
      icon: <AiOutlineUser size={20} />,
      label: "Users",
    },
  ];

  return (
    <Card className="sticky top-24">
      <div className="space-y-2">
        <h3 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b">
          Admin Panel
        </h3>
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            end={item.path === "/dashborad/admin"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                isActive
                  ? "bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg"
                  : "text-gray-700 hover:bg-gray-50"
              }`
            }
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>
    </Card>
  );
};

export default AdminMenu;
