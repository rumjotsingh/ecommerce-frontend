import React, { useState } from "react";
import Layout from "./../../components/layout/layout";
import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { API_ENDPOINTS } from "../../config/api";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(API_ENDPOINTS.AUTH.LOGIN, {
        email,
        password,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Login - ShopHub">
      <div className="min-h-[80vh] bg-primary-500 flex items-center justify-center py-8 px-4">
        <div className="w-full max-w-4xl flex bg-white rounded shadow-lg overflow-hidden">
          {/* Left Side - Branding */}
          <div className="hidden md:flex md:w-2/5 bg-primary-500 p-8 flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-3">Login</h2>
              <p className="text-primary-100 text-sm">
                Get access to your Orders, Wishlist and Recommendations
              </p>
            </div>
            <img
              src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/login_img_c4a81e.png"
              alt="Login"
              className="w-full"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          </div>

          {/* Right Side - Form */}
          <div className="w-full md:w-3/5 p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs text-gray-500 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border-b-2 border-gray-300 py-2 text-sm focus:border-primary-500 outline-none transition-colors"
                  placeholder="Enter Email"
                  required
                />
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border-b-2 border-gray-300 py-2 text-sm focus:border-primary-500 outline-none transition-colors"
                  placeholder="Enter Password"
                  required
                />
              </div>

              <p className="text-xs text-gray-500">
                By continuing, you agree to ShopHub's{" "}
                <Link to="/terms" className="text-primary-500">
                  Terms of Use
                </Link>{" "}
                and{" "}
                <Link to="/policy" className="text-primary-500">
                  Privacy Policy
                </Link>
                .
              </p>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-secondary-500 text-white py-3 rounded text-sm font-medium hover:bg-secondary-600 disabled:opacity-50 transition-colors"
              >
                {loading ? "Please wait..." : "Login"}
              </button>

              <div className="text-center">
                <span className="text-xs text-gray-500">OR</span>
              </div>

              <Link
                to="/forget-password"
                className="block text-center text-primary-500 text-sm font-medium hover:underline"
              >
                Forgot Password?
              </Link>

              <Link
                to="/register"
                className="block w-full text-center border border-gray-300 text-primary-500 py-3 rounded text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                New to ShopHub? Create an account
              </Link>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
