import React, { useState } from "react";
import Layout from "./../../components/layout/layout";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { API_ENDPOINTS } from "../../config/api";
import toast from "react-hot-toast";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(API_ENDPOINTS.AUTH.REGISTER, {
        name,
        email,
        password,
        phone,
        address,
        answer,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate("/login");
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
    <Layout title="Register - ShopHub">
      <div className="min-h-[80vh] bg-primary-500 flex items-center justify-center py-8 px-4">
        <div className="w-full max-w-4xl flex bg-white rounded shadow-lg overflow-hidden">
          {/* Left Side - Branding */}
          <div className="hidden md:flex md:w-2/5 bg-primary-500 p-8 flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-3">
                Looks like you're new here!
              </h2>
              <p className="text-primary-100 text-sm">
                Sign up with your details to get started
              </p>
            </div>
            <img
              src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/login_img_c4a81e.png"
              alt="Register"
              className="w-full"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          </div>

          {/* Right Side - Form */}
          <div className="w-full md:w-3/5 p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border-b-2 border-gray-300 py-2 text-sm focus:border-primary-500 outline-none transition-colors"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border-b-2 border-gray-300 py-2 text-sm focus:border-primary-500 outline-none transition-colors"
                    placeholder="Enter email"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full border-b-2 border-gray-300 py-2 text-sm focus:border-primary-500 outline-none transition-colors"
                    placeholder="Enter phone"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border-b-2 border-gray-300 py-2 text-sm focus:border-primary-500 outline-none transition-colors"
                  placeholder="Create password"
                  required
                />
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full border-b-2 border-gray-300 py-2 text-sm focus:border-primary-500 outline-none transition-colors"
                  placeholder="Enter your address"
                  required
                />
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Security Question: Favorite Sport?
                </label>
                <input
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="w-full border-b-2 border-gray-300 py-2 text-sm focus:border-primary-500 outline-none transition-colors"
                  placeholder="Your answer"
                  required
                />
              </div>

              <p className="text-xs text-gray-500 pt-2">
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
                {loading ? "Please wait..." : "Continue"}
              </button>

              <Link
                to="/login"
                className="block w-full text-center border border-gray-300 text-primary-500 py-3 rounded text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Existing User? Log in
              </Link>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
