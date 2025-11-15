import React from "react";
import { NavLink } from "react-router-dom";
import {
  AiOutlineDashboard,
  AiOutlineUser,
  AiOutlineShoppingCart,
  AiOutlineHeart,
} from "react-icons/ai";
import Card from "../UI/Card";

const UserMenu = () => {
  const menuItems = [
    {
      path: "/dashborad/user",
      icon: <AiOutlineDashboard size={20} />,
      label: "Dashboard",
    },
    {
      path: "/dashborad/user/profile",
      icon: <AiOutlineUser size={20} />,
      label: "Profile",
    },
    {
      path: "/dashborad/user/orders",
      icon: <AiOutlineShoppingCart size={20} />,
      label: "Orders",
    },
    {
      path: "/dashborad/user/wishlist",
      icon: <AiOutlineHeart size={20} />,
      label: "Wishlist",
    },
  ];

  return (
    <Card className="sticky top-24">
      <div className="space-y-2">
        <h3 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b">
          User Dashboard
        </h3>
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            end={item.path === "/dashborad/user"}
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

export default UserMenu;
