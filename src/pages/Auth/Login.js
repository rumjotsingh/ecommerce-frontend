import React, { useState } from "react";
import Layout from "./../../components/layout/layout";
import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";
import {
  AiOutlineMail,
  AiOutlineLock,
  AiOutlineArrowRight,
} from "react-icons/ai";
import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        "https://ecommerce-backend-s84l.onrender.com/api/v1/auth/login",
        {
          email,
          password,
        }
      );
      if (res && res.data.success) {
        toast.success(res.data && res.data.message, {
          duration: 2000,
          style: {
            background: "#0EA5A4",
            color: "#fff",
          },
        });
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
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full">
          {/* Card */}
          <div className="bg-white rounded-3xl shadow-soft-lg p-8 space-y-6">
            {/* Header */}
            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl mb-4">
                <AiOutlineLock size={32} className="text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
              <p className="text-gray-600">Sign in to continue shopping</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                icon={<AiOutlineMail size={20} />}
                required
              />

              <Input
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                icon={<AiOutlineLock size={20} />}
                required
              />

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-primary-500 rounded focus:ring-2 focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-600">Remember me</span>
                </label>
                <Link
                  to="/forget-password"
                  className="text-sm font-medium text-primary-500 hover:text-primary-600 transition-colors"
                >
                  Forgot Password?
                </Link>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                disabled={loading}
                icon={<AiOutlineArrowRight size={20} />}
                iconPosition="right"
              >
                {loading ? "Signing In..." : "Sign In"}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">
                  Don't have an account?
                </span>
              </div>
            </div>

            {/* Register Link */}
            <Link to="/register">
              <Button variant="outline" size="lg" fullWidth>
                Create Account
              </Button>
            </Link>
          </div>

          {/* Footer Text */}
          <p className="text-center text-sm text-gray-600 mt-6">
            By continuing, you agree to our{" "}
            <Link
              to="/policy"
              className="text-primary-500 hover:text-primary-600"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              to="/policy"
              className="text-primary-500 hover:text-primary-600"
            >
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
