import React, { useState } from "react";
import Layout from "../../components/layout/layout";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { Mail, Lock, HelpCircle, KeyRound } from "lucide-react";

const ModernForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("https://ecommerce-backend-s84l.onrender.com/api/v1/auth/forgot-password", {
        email,
        newPassword,
        answer,
      });
      setLoading(false);
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title="Reset Password - ShopHub">
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 bg-gradient-to-br from-primary-50 to-secondary-50">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mb-4">
              <KeyRound className="text-white" size={32} />
            </div>
            <CardTitle>Reset Password</CardTitle>
            <CardDescription>Enter your details to reset your password</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Security Answer</label>
                <div className="relative">
                  <HelpCircle className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <Input
                    type="text"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="What is your favorite sport?"
                    className="pl-10"
                    required
                  />
                </div>
                <p className="text-xs text-gray-500">Enter the answer to your security question</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">New Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <Input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={loading}>
                {loading ? "Resetting..." : "Reset Password"}
              </Button>

              <div className="text-center text-sm text-gray-600">
                Remember your password?{" "}
                <Link to="/login" className="text-primary hover:text-primary-600 font-semibold">
                  Sign In
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ModernForgetPassword;
