import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";
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
  const { items: cart } = useSelector((state) => state.cart);
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
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <nav className="container mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-1.5 sm:gap-2 group flex-shrink-0"
          >
            <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-1.5 sm:p-2 rounded-lg sm:rounded-xl group-hover:scale-110 transition-transform">
              <AiOutlineShoppingCart
                size={20}
                className="text-white sm:w-6 sm:h-6"
              />
            </div>
            <span className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent hidden xs:block">
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
                <div className="absolute top-full h-96 overflow-y-auto left-0 pt-2 z-50">
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
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Search Icon - Mobile/Tablet */}
            <button
              onClick={() => setSearchOpen(true)}
              className="lg:hidden p-1.5 sm:p-2 text-gray-700 hover:text-primary-500 transition-colors"
              aria-label="Search"
            >
              <AiOutlineSearch size={20} className="sm:w-6 sm:h-6" />
            </button>

            {/* Wishlist - Only show if user is logged in */}
            {auth?.user && (
              <Link
                to="/dashborad/user/wishlist"
                className="relative flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 text-gray-700 hover:text-primary-500 transition-colors"
                aria-label="Wishlist"
              >
                <AiOutlineHeart size={20} className="sm:w-6 sm:h-6" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 bg-red-500 text-white text-[10px] sm:text-xs font-bold rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center">
                    {wishlistCount > 9 ? "9+" : wishlistCount}
                  </span>
                )}
                <span className="hidden md:block font-medium text-sm">
                  Wishlist
                </span>
              </Link>
            )}

            {/* Cart */}
            <Link
              to="/cart"
              className="relative flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 text-gray-700 hover:text-primary-500 transition-colors"
              aria-label="Shopping Cart"
            >
              <AiOutlineShoppingCart size={20} className="sm:w-6 sm:h-6" />
              {cart?.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 bg-secondary-500 text-white text-[10px] sm:text-xs font-bold rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center">
                  {cart?.length > 9 ? "9+" : cart?.length}
                </span>
              )}
              <span className="hidden md:block font-medium text-sm">Cart</span>
            </Link>

            {/* User Menu */}
            {!auth?.user ? (
              <div className="hidden lg:flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 xl:px-6 py-2 text-sm xl:text-base font-medium text-primary-500 hover:text-primary-600 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 xl:px-6 py-2 text-sm xl:text-base font-medium bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg xl:rounded-xl hover:shadow-lg transition-all"
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
                <button className="flex items-center gap-1.5 px-3 py-2 text-gray-700 hover:text-primary-500 transition-colors">
                  <AiOutlineUser size={18} />
                  <span className="font-medium text-sm max-w-[100px] truncate">
                    {auth?.user?.name}
                  </span>
                  <AiOutlineDown
                    size={12}
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
              className="lg:hidden p-1.5 sm:p-2 text-gray-700 hover:text-primary-500 transition-colors"
              aria-label="Menu"
            >
              {mobileMenuOpen ? (
                <AiOutlineClose size={20} className="sm:w-6 sm:h-6" />
              ) : (
                <AiOutlineMenu size={20} className="sm:w-6 sm:h-6" />
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
            className={`absolute top-0 right-0 h-full w-[280px] sm:w-80 max-w-[85vw] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out overflow-hidden ${
              mobileMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-1.5 sm:p-2 rounded-lg sm:rounded-xl">
                  <AiOutlineShoppingCart
                    size={18}
                    className="text-white sm:w-5 sm:h-5"
                  />
                </div>
                <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
                  Menu
                </span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-700 hover:text-primary-500 transition-colors p-1"
                aria-label="Close menu"
              >
                <AiOutlineClose size={22} className="sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto h-[calc(100%-61px)] sm:h-[calc(100%-73px)] p-3 sm:p-4">
              <div className="space-y-1.5 sm:space-y-2">
                {/* Mobile Categories */}
                <div>
                  <button
                    onClick={() => setCategoriesOpen(!categoriesOpen)}
                    className="w-full flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 text-gray-700 hover:bg-gray-50 rounded-lg sm:rounded-xl font-medium transition-colors text-sm sm:text-base"
                  >
                    <span className="flex items-center gap-2">
                      <BiCategory size={18} className="sm:w-5 sm:h-5" />
                      Categories
                    </span>
                    <AiOutlineDown
                      size={12}
                      className={`transition-transform sm:w-3.5 sm:h-3.5 ${
                        categoriesOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {categoriesOpen && (
                    <div className="ml-3 sm:ml-4 mt-1.5 sm:mt-2 space-y-1 max-h-[200px] overflow-y-auto">
                      <Link
                        to="/categories"
                        className="block px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-600 hover:text-primary-500 transition-colors"
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
                          className="block px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-600 hover:text-primary-500 transition-colors"
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
                      className="block px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors text-sm sm:text-base"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="block px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-medium bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-center text-sm sm:text-base"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Register
                    </Link>
                  </>
                ) : (
                  <>
                    <div className="px-3 sm:px-4 py-2 bg-primary-50 rounded-lg sm:rounded-xl mb-2">
                      <p className="text-xs text-gray-500">Logged in as</p>
                      <p className="text-sm font-semibold text-primary-600 truncate">
                        {auth?.user?.name}
                      </p>
                    </div>
                    <Link
                      to={`/dashborad/${
                        auth?.user?.role === 1 ? "admin" : "user"
                      }`}
                      className="block px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors text-sm sm:text-base"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full text-left block px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-medium text-red-500 hover:bg-red-50 transition-colors text-sm sm:text-base"
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
            <div className="absolute top-0 left-0 right-0 bg-white p-3 sm:p-4 shadow-lg">
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <SearchInput />
                </div>
                <button
                  onClick={() => setSearchOpen(false)}
                  className="text-gray-700 hover:text-primary-500 transition-colors p-1"
                  aria-label="Close search"
                >
                  <AiOutlineClose size={22} className="sm:w-6 sm:h-6" />
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
