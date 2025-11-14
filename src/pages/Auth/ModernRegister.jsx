import React, { useState } from "react";
import Layout from "../../components/layout/layout";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { User, Mail, Lock, Phone, MapPin, UserPlus } from "lucide-react";

const ModernRegister = () => {
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
      const res = await axios.post("https://ecommerce-backend-s84l.onrender.com/api/v1/auth/register", {
        name,
        email,
        password,
        phone,
        address,
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
    <Layout title="Register - ShopHub">
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 bg-gradient-to-br from-secondary-50 to-primary-50">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-secondary to-primary rounded-full flex items-center justify-center mb-4">
              <UserPlus className="text-white" size={32} />
            </div>
            <CardTitle>Create Your Account</CardTitle>
            <CardDescription>Join ShopHub and start shopping amazing products</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <Input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

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
                  <label className="text-sm font-medium text-gray-700">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <Input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Minimum 6 characters"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <Input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 123-4567"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Address</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="123 Main St, City, State, ZIP"
                    className="w-full pl-10 pr-4 py-2 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none min-h-[80px]"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Security Question</label>
                <Input
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="What is your favorite sport?"
                  required
                />
                <p className="text-xs text-gray-500">This will help you recover your password if you forget it</p>
              </div>

              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="terms"
                  className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary mt-1"
                  required
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  I agree to the{" "}
                  <Link to="/policy" className="text-primary hover:text-primary-600 font-medium">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/policy" className="text-primary hover:text-primary-600 font-medium">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={loading}>
                {loading ? "Creating Account..." : "Create Account"}
              </Button>

              <div className="text-center text-sm text-gray-600">
                Already have an account?{" "}
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

export default ModernRegister;
