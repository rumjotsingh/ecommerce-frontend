import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { fetchWishlistCount } from "../../redux/slices/wishlistSlice";
import {
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiOutlineDown,
  AiOutlineSearch,
  AiOutlineHeart,
} from "react-icons/ai";
import { BiCategory } from "react-icons/bi";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const dispatch = useDispatch();
  const { count: wishlistCount } = useSelector((state) => state.wishlist);
  const categories = useCategory();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [desktopCategoriesOpen, setDesktopCategoriesOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    if (auth?.token) {
      dispatch(fetchWishlistCount());
    }
  }, [auth?.token, dispatch]);

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-soft">
      <nav className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-2 rounded-xl group-hover:scale-110 transition-transform">
              <AiOutlineShoppingCart size={24} className="text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent hidden sm:block">
              ShopHub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {/* <NavLink
              to="/"
              className={({ isActive }) =>
                `text-base font-medium transition-colors ${
                  isActive
                    ? "text-primary-500"
                    : "text-gray-700 hover:text-primary-500"
                }`
              }
            >
              Home
            </NavLink> */}

            {/* Categories Dropdown */}
            <div
              className="relative ml-10"
              onMouseEnter={() => setDesktopCategoriesOpen(true)}
              onMouseLeave={() => setDesktopCategoriesOpen(false)}
            >
              <button className="flex items-center gap-1 text-base font-medium text-gray-700 hover:text-primary-500 transition-colors">
                <BiCategory size={20} />
                <span>Categories</span>
                <AiOutlineDown
                  size={14}
                  className={`transition-transform ${
                    desktopCategoriesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {desktopCategoriesOpen && (
                <div className="absolute top-full left-0 pt-2 z-50">
                  <div className="bg-white rounded-xl shadow-soft-lg py-2 w-56">
                    <Link
                      to="/categories"
                      className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-500 transition-colors"
                      onClick={() => setDesktopCategoriesOpen(false)}
                    >
                      All Categories
                    </Link>

                    {categories?.map((c) => (
                      <Link
                        key={c._id}
                        to={`/category/${c.slug}`}
                        className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-500 transition-colors"
                        onClick={() => setDesktopCategoriesOpen(false)}
                      >
                        {c.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:block flex-1 max-w-md mx-8">
            <SearchInput />
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            {/* Search Icon - Mobile/Tablet */}
            <button
              onClick={() => setSearchOpen(true)}
              className="lg:hidden p-2 text-gray-700 hover:text-primary-500 transition-colors"
            >
              <AiOutlineSearch size={24} />
            </button>

            {/* Wishlist - Only show if user is logged in */}
            {auth?.user && (
              <Link
                to="/dashborad/user/wishlist"
                className="relative flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-primary-500 transition-colors"
              >
                <AiOutlineHeart size={24} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
                <span className="hidden md:block font-medium">Wishlist</span>
              </Link>
            )}

            {/* Cart */}
            <Link
              to="/cart"
              className="relative flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-primary-500 transition-colors"
            >
              <AiOutlineShoppingCart size={24} />
              {cart?.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-secondary-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cart?.length}
                </span>
              )}
              <span className="hidden md:block font-medium">Cart</span>
            </Link>

            {/* User Menu */}
            {!auth?.user ? (
              <div className="hidden lg:flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-6 py-2.5 text-base font-medium text-primary-500 hover:text-primary-600 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-6 py-2.5 text-base font-medium bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl hover:shadow-lg transition-all"
                >
                  Register
                </Link>
              </div>
            ) : (
              <div
                className="relative hidden lg:block z-50"
                onMouseEnter={() => setUserMenuOpen(true)}
                onMouseLeave={() => setUserMenuOpen(false)}
              >
                <button className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-primary-500 transition-colors">
                  <AiOutlineUser size={20} />
                  <span className="font-medium">{auth?.user?.name}</span>
                  <AiOutlineDown
                    size={14}
                    className={`transition-transform ${
                      userMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {userMenuOpen && (
                  <div className="absolute top-full right-0 pt-2 z-50">
                    <div className="bg-white rounded-xl shadow-soft-lg py-2 w-48">
                      <Link
                        to={`/dashborad/${
                          auth?.user?.role === 1 ? "admin" : "user"
                        }`}
                        className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-500 transition-colors"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        Dashboard
                      </Link>

                      <button
                        onClick={() => {
                          handleLogout();
                          setUserMenuOpen(false);
                        }}
                        className="w-full text-left block px-4 py-2.5 text-sm text-gray-700 hover:bg-red-50 hover:text-red-500 transition-colors"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-gray-700 hover:text-primary-500 transition-colors"
            >
              {mobileMenuOpen ? (
                <AiOutlineClose size={24} />
              ) : (
                <AiOutlineMenu size={24} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`fixed inset-0 z-50 lg:hidden ${
            mobileMenuOpen ? "visible" : "invisible"
          }`}
        >
          {/* Backdrop */}
          <div
            className={`absolute inset-0 bg-black transition-opacity duration-300 ${
              mobileMenuOpen ? "opacity-50" : "opacity-0"
            }`}
            onClick={() => setMobileMenuOpen(false)}
          ></div>

          {/* Slide Panel */}
          <div
            className={`absolute top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
              mobileMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-2 rounded-xl">
                  <AiOutlineShoppingCart size={20} className="text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
                  Menu
                </span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-700 hover:text-primary-500 transition-colors"
              >
                <AiOutlineClose size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto h-[calc(100%-73px)] p-4">
              <div className="space-y-2">
                {/* <NavLink
                to="/"
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-xl font-medium transition-colors ${
                    isActive
                      ? "bg-primary-50 text-primary-500"
                      : "text-gray-700 hover:bg-gray-50"
                  }`
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </NavLink> */}

                {/* Mobile Categories */}
                <div>
                  <button
                    onClick={() => setCategoriesOpen(!categoriesOpen)}
                    className="w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl font-medium transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <BiCategory size={20} />
                      Categories
                    </span>
                    <AiOutlineDown
                      size={14}
                      className={`transition-transform ${
                        categoriesOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {categoriesOpen && (
                    <div className="ml-4 mt-2 space-y-1">
                      <Link
                        to="/categories"
                        className="block px-4 py-2 text-sm text-gray-600 hover:text-primary-500 transition-colors"
                        onClick={() => {
                          setMobileMenuOpen(false);
                          setCategoriesOpen(false);
                        }}
                      >
                        All Categories
                      </Link>
                      {categories?.map((c) => (
                        <Link
                          key={c._id}
                          to={`/category/${c.slug}`}
                          className="block px-4 py-2 text-sm text-gray-600 hover:text-primary-500 transition-colors"
                          onClick={() => {
                            setMobileMenuOpen(false);
                            setCategoriesOpen(false);
                          }}
                        >
                          {c.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {!auth?.user ? (
                  <>
                    <Link
                      to="/login"
                      className="block px-4 py-3 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="block px-4 py-3 rounded-xl font-medium bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-center"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Register
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to={`/dashborad/${
                        auth?.user?.role === 1 ? "admin" : "user"
                      }`}
                      className="block px-4 py-3 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full text-left block px-4 py-3 rounded-xl font-medium text-red-500 hover:bg-red-50 transition-colors"
                    >
                      Logout
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Search Modal - Mobile/Tablet */}
        {searchOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="absolute inset-0 bg-black opacity-50"
              onClick={() => setSearchOpen(false)}
            ></div>
            <div className="absolute top-0 left-0 right-0 bg-white p-4 shadow-lg">
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <SearchInput />
                </div>
                <button
                  onClick={() => setSearchOpen(false)}
                  className="text-gray-700 hover:text-primary-500 transition-colors"
                >
                  <AiOutlineClose size={24} />
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
