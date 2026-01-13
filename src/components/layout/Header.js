import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import useCategory from "../../hooks/useCategory";
import { fetchWishlistCount } from "../../redux/slices/wishlistSlice";
import { useSearch } from "../../context/search";
import axios from "axios";
import { API_ENDPOINTS } from "../../config/api";
import {
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineShoppingCart,
  AiOutlineDown,
  AiOutlineSearch,
  AiOutlineHeart,
  AiOutlineUser,
} from "react-icons/ai";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const { items: cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { count: wishlistCount } = useSelector((state) => state.wishlist);
  const categories = useCategory();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [values, setValues] = useSearch();
  const userMenuRef = useRef(null);
  const categoryMenuRef = useRef(null);

  useEffect(() => {
    if (auth?.token) {
      dispatch(fetchWishlistCount());
    }
  }, [auth?.token, dispatch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
      if (
        categoryMenuRef.current &&
        !categoryMenuRef.current.contains(event.target)
      ) {
        setCategoriesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
    navigate("/login");
    setUserMenuOpen(false);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!values.keyword.trim()) return;
    try {
      const { data } = await axios.get(
        API_ENDPOINTS.PRODUCT.SEARCH(values.keyword)
      );
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };

  const cartItemsCount =
    cart?.reduce((total, item) => total + (item.orderQuantity || 1), 0) || 0;

  return (
    <header className="sticky top-0 z-50 bg-primary-500 shadow-md">
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-1 flex-shrink-0">
            <span className="text-xl font-bold text-white italic">ShopHub</span>
            <span className="text-[10px] text-yellow-300 italic -mt-3 hidden sm:block">
              Explore <span className="text-white">Plus</span>
            </span>
          </Link>

          {/* Search Bar - Desktop */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-xl mx-6"
          >
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for products, brands and more"
                className="w-full py-2 px-4 pr-10 rounded text-sm bg-white border-0 outline-none"
                value={values.keyword}
                onChange={(e) =>
                  setValues({ ...values, keyword: e.target.value })
                }
              />
              <button
                type="submit"
                className="absolute right-0 top-0 h-full px-4 text-primary-500"
              >
                <AiOutlineSearch size={20} />
              </button>
            </div>
          </form>

          {/* Right Side Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Categories Dropdown - Desktop */}
            <div className="hidden lg:block relative" ref={categoryMenuRef}>
              <button
                onClick={() => setCategoriesOpen(!categoriesOpen)}
                className="flex items-center gap-1 text-white text-sm font-medium px-3 py-2 hover:bg-primary-600 rounded"
              >
                <span>Categories</span>
                <AiOutlineDown
                  size={12}
                  className={`transition-transform ${
                    categoriesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {categoriesOpen && (
                <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded shadow-lg border py-2 z-50">
                  {categories?.slice(0, 10).map((category) => (
                    <Link
                      key={category._id}
                      to={`/category/${category.slug}`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setCategoriesOpen(false)}
                    >
                      {category.name}
                    </Link>
                  ))}
                  <div className="border-t mt-2 pt-2">
                    <Link
                      to="/categories"
                      className="block px-4 py-2 text-sm text-primary-500 font-medium hover:bg-gray-100"
                      onClick={() => setCategoriesOpen(false)}
                    >
                      View All Categories
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* User Menu */}
            {auth?.user ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-1 text-white text-sm font-medium px-2 sm:px-3 py-2 hover:bg-primary-600 rounded"
                >
                  <AiOutlineUser size={18} />
                  <span className="hidden sm:inline max-w-[80px] truncate">
                    {auth.user.name}
                  </span>
                  <AiOutlineDown
                    size={12}
                    className={`transition-transform ${
                      userMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {userMenuOpen && (
                  <div className="absolute top-full right-0 mt-1 w-48 bg-white rounded shadow-lg border py-2 z-50">
                    <div className="px-4 py-2 border-b">
                      <p className="font-medium text-gray-900 truncate">
                        {auth.user.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {auth.user.email}
                      </p>
                    </div>
                    <Link
                      to={`/dashborad/${
                        auth?.user?.role === 1 ? "admin" : "user"
                      }`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    {auth?.user?.role !== 1 && (
                      <>
                        <Link
                          to="/dashborad/user/orders"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          My Orders
                        </Link>
                        <Link
                          to="/dashborad/user/profile"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          My Profile
                        </Link>
                      </>
                    )}
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden sm:flex items-center bg-white text-primary-500 text-sm font-medium px-6 py-1.5 rounded"
              >
                Login
              </Link>
            )}

            {/* Wishlist */}
            {auth?.user && (
              <Link
                to="/dashborad/user/wishlist"
                className="relative flex items-center gap-1 text-white text-sm font-medium px-2 sm:px-3 py-2 hover:bg-primary-600 rounded"
              >
                <AiOutlineHeart size={20} />
                <span className="hidden lg:inline">Wishlist</span>
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 left-4 bg-secondary-500 text-white text-[10px] min-w-[16px] h-4 px-1 rounded-full flex items-center justify-center">
                    {wishlistCount > 9 ? "9+" : wishlistCount}
                  </span>
                )}
              </Link>
            )}

            {/* Cart */}
            <Link
              to="/cart"
              className="relative flex items-center gap-1 text-white text-sm font-medium px-2 sm:px-3 py-2 hover:bg-primary-600 rounded"
            >
              <AiOutlineShoppingCart size={20} />
              <span className="hidden lg:inline">Cart</span>
              {cartItemsCount > 0 && (
                <span className="absolute -top-0.5 left-4 bg-secondary-500 text-white text-[10px] min-w-[16px] h-4 px-1 rounded-full flex items-center justify-center">
                  {cartItemsCount > 9 ? "9+" : cartItemsCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-white hover:bg-primary-600 rounded"
            >
              {mobileMenuOpen ? (
                <AiOutlineClose size={22} />
              ) : (
                <AiOutlineMenu size={22} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <form onSubmit={handleSearch} className="md:hidden pb-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for products, brands and more"
              className="w-full py-2 px-4 pr-10 rounded text-sm bg-white border-0 outline-none"
              value={values.keyword}
              onChange={(e) =>
                setValues({ ...values, keyword: e.target.value })
              }
            />
            <button
              type="submit"
              className="absolute right-0 top-0 h-full px-4 text-primary-500"
            >
              <AiOutlineSearch size={20} />
            </button>
          </div>
        </form>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-3 border-t border-primary-400">
            <div className="space-y-1">
              <Link
                to="/"
                className="block px-4 py-2 text-white hover:bg-primary-600 rounded"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/products"
                className="block px-4 py-2 text-white hover:bg-primary-600 rounded"
                onClick={() => setMobileMenuOpen(false)}
              >
                All Products
              </Link>
              <Link
                to="/categories"
                className="block px-4 py-2 text-white hover:bg-primary-600 rounded"
                onClick={() => setMobileMenuOpen(false)}
              >
                Categories
              </Link>
              <Link
                to="/about"
                className="block px-4 py-2 text-white hover:bg-primary-600 rounded"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="block px-4 py-2 text-white hover:bg-primary-600 rounded"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              {!auth?.user && (
                <Link
                  to="/login"
                  className="block px-4 py-2 text-white hover:bg-primary-600 rounded"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login / Register
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
