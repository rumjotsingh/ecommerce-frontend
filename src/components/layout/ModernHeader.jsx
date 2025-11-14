import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { useCart } from "../../context/cart";
import toast from "react-hot-toast";
import { ShoppingCart, Menu, X, Search, User, LogOut, LayoutDashboard, ChevronDown } from "lucide-react";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import useCategory from "../../hooks/useCategory";

const ModernHeader = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
    setIsMobileMenuOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-lg border-b border-gray-200">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-primary to-primary-600 text-white py-2 px-4">
        <div className="container mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <span>🎉 Free Shipping on Orders Over $50</span>
          </div>
          <div className="hidden md:flex items-center gap-4">
            {auth?.user ? (
              <span>Welcome, {auth.user.name}!</span>
            ) : (
              <>
                <NavLink to="/login" className="hover:underline">Login</NavLink>
                <NavLink to="/register" className="hover:underline">Register</NavLink>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-primary hover:text-primary-600 transition-colors">
            🛒 <span className="hidden sm:inline">ShopHub</span>
          </Link>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full h-10 pl-4 pr-12 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none transition-colors"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-primary hover:text-primary-600"
              >
                <Search size={20} />
              </button>
            </div>
          </form>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-gray-700 hover:text-primary font-medium transition-colors ${
                  isActive ? "text-primary font-semibold" : ""
                }`
              }
            >
              Home
            </NavLink>

            {/* Categories Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className="flex items-center gap-1 text-gray-700 hover:text-primary font-medium transition-colors"
              >
                Categories
                <ChevronDown size={16} />
              </button>
              {isCategoryOpen && (
                <div className="absolute top-full mt-2 left-0 bg-white shadow-lg rounded-xl border border-gray-200 min-w-[200px] py-2 z-50">
                  <Link
                    to="/categories"
                    className="block px-4 py-2 hover:bg-gray-50 text-gray-700 hover:text-primary"
                    onClick={() => setIsCategoryOpen(false)}
                  >
                    All Categories
                  </Link>
                  {categories?.map((c) => (
                    <Link
                      key={c._id}
                      to={`/category/${c.slug}`}
                      className="block px-4 py-2 hover:bg-gray-50 text-gray-700 hover:text-primary"
                      onClick={() => setIsCategoryOpen(false)}
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {auth?.user && (
              <div className="relative group">
                <button className="flex items-center gap-1 text-gray-700 hover:text-primary font-medium transition-colors">
                  <User size={18} />
                  {auth.user.name}
                </button>
                <div className="absolute top-full mt-2 right-0 bg-white shadow-lg rounded-xl border border-gray-200 min-w-[180px] py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <Link
                    to={`/dashborad/${auth?.user?.role === 1 ? "admin" : "user"}`}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-gray-700 hover:text-primary"
                  >
                    <LayoutDashboard size={16} />
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-gray-700 hover:text-red-500"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </nav>

          {/* Cart & Mobile Menu */}
          <div className="flex items-center gap-4">
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart size={24} className="text-primary" />
                {cart?.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {cart.length}
                  </Badge>
                )}
              </Button>
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-gray-700 hover:text-primary"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <form onSubmit={handleSearch} className="md:hidden mt-4">
          <div className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full h-10 pl-4 pr-12 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-primary"
            >
              <Search size={20} />
            </button>
          </div>
        </form>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
            <NavLink
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-2 px-4 hover:bg-gray-50 rounded-lg text-gray-700 hover:text-primary font-medium"
            >
              Home
            </NavLink>
            <NavLink
              to="/categories"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-2 px-4 hover:bg-gray-50 rounded-lg text-gray-700 hover:text-primary font-medium"
            >
              All Categories
            </NavLink>
            {categories?.slice(0, 5).map((c) => (
              <NavLink
                key={c._id}
                to={`/category/${c.slug}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2 px-4 pl-8 hover:bg-gray-50 rounded-lg text-gray-600 hover:text-primary"
              >
                {c.name}
              </NavLink>
            ))}
            {auth?.user ? (
              <>
                <NavLink
                  to={`/dashborad/${auth?.user?.role === 1 ? "admin" : "user"}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-2 px-4 hover:bg-gray-50 rounded-lg text-gray-700 hover:text-primary font-medium"
                >
                  Dashboard
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="py-2 px-4 hover:bg-gray-50 rounded-lg text-left text-gray-700 hover:text-red-500 font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-2 px-4 hover:bg-gray-50 rounded-lg text-gray-700 hover:text-primary font-medium"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-2 px-4 hover:bg-gray-50 rounded-lg text-gray-700 hover:text-primary font-medium"
                >
                  Register
                </NavLink>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default ModernHeader;
