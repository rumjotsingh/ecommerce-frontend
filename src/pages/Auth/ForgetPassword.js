import React, { useState } from "react";
import Layout from "./../../components/layout/layout";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { API_ENDPOINTS } from "../../config/api";
import toast from "react-hot-toast";
import {
  AiOutlineMail,
  AiOutlineLock,
  AiOutlineQuestionCircle,
  AiOutlineArrowRight,
  AiOutlineArrowLeft,
} from "react-icons/ai";
import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";

const ForgotPasssword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, {
        email,
        newPassword,
        answer,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message, {
          duration: 2000,
          style: {
            background: "#0EA5A4",
            color: "#fff",
          },
        });
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
    <Layout title={"Forgot Password - ShopHub"}>
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full">
          {/* Card */}
          <div className="bg-white rounded-3xl shadow-soft-lg p-8 space-y-6">
            {/* Header */}
            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl mb-4">
                <AiOutlineLock size={32} className="text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">
                Reset Password
              </h1>
              <p className="text-gray-600">
                Enter your details to reset your password
              </p>
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
                label="Security Answer: What is your favorite sports?"
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Your answer"
                icon={<AiOutlineQuestionCircle size={20} />}
                required
              />

              <Input
                label="New Password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter your new password"
                icon={<AiOutlineLock size={20} />}
                required
              />

              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                disabled={loading}
                icon={<AiOutlineArrowRight size={20} />}
                iconPosition="right"
              >
                {loading ? "Resetting..." : "Reset Password"}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">
                  Remember your password?
                </span>
              </div>
            </div>

            {/* Back to Login */}
            <Link to="/login">
              <Button
                variant="outline"
                size="lg"
                fullWidth
                icon={<AiOutlineArrowLeft size={20} />}
              >
                Back to Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPasssword;
