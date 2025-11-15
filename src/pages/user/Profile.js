import React, { useState, useEffect } from "react";
import UserMenu from "../../components/layout/UserMenu";
import Layout from "./../../components/layout/layout";
import { useAuth } from "../../context/auth";
import { API_ENDPOINTS } from "../../config/api";
import toast from "react-hot-toast";
import axios from "axios";
import Card from "../../components/UI/Card";
import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";
import {
  AiOutlineUser,
  AiOutlineMail,
  AiOutlineLock,
  AiOutlinePhone,
  AiOutlineHome,
  AiOutlineSave,
} from "react-icons/ai";

const Profile = () => {
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const { email, name, phone, address } = auth?.user;
    setName(name);
    setPhone(phone);
    setEmail(email);
    setAddress(address);
  }, [auth?.user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.put(API_ENDPOINTS.AUTH.UPDATE_PROFILE, {
        name,
        email,
        password,
        phone,
        address,
      });
      if (data?.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated Successfully", {
          duration: 2000,
          style: {
            background: "#0EA5A4",
            color: "#fff",
          },
        });
        setPassword("");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title={"Your Profile"}>
      <div className="min-h-screen bg-gray-50 py-4 sm:py-6 lg:py-8">
        <div className="container mx-auto px-3 sm:px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <UserMenu />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-4 sm:space-y-6">
              {/* Header */}
              <Card className="p-4 sm:p-6">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                    <AiOutlineUser
                      size={20}
                      className="text-white sm:w-6 sm:h-6"
                    />
                  </div>
                  <div className="min-w-0">
                    <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 truncate">
                      Edit Profile
                    </h1>
                    <p className="text-sm sm:text-base text-gray-600">
                      Update your personal information
                    </p>
                  </div>
                </div>
              </Card>

              {/* Profile Form */}
              <Card className="p-4 sm:p-6">
                <form
                  onSubmit={handleSubmit}
                  className="space-y-4 sm:space-y-6"
                >
                  {/* Personal Information Section */}
                  <div>
                    <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 pb-2 border-b">
                      Personal Information
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <Input
                        label="Full Name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your full name"
                        icon={<AiOutlineUser size={20} />}
                        required
                      />

                      <Input
                        label="Email Address"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        icon={<AiOutlineMail size={20} />}
                        disabled
                      />
                    </div>
                  </div>

                  {/* Contact Information Section */}
                  <div>
                    <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 pb-2 border-b">
                      Contact Information
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <Input
                        label="Phone Number"
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Enter your phone number"
                        icon={<AiOutlinePhone size={20} />}
                        required
                      />

                      <Input
                        label="Address"
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Enter your address"
                        icon={<AiOutlineHome size={20} />}
                        required
                      />
                    </div>
                  </div>

                  {/* Security Section */}
                  <div>
                    <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 pb-2 border-b">
                      Security
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <Input
                        label="New Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Leave blank to keep current password"
                        icon={<AiOutlineLock size={20} />}
                      />
                      <div className="flex items-end">
                        <div className="bg-blue-50 border border-blue-200 rounded-lg sm:rounded-xl p-3 sm:p-4 text-xs sm:text-sm text-blue-700">
                          <p className="font-medium mb-0.5 sm:mb-1">
                            Password Tips:
                          </p>
                          <ul className="text-[10px] sm:text-xs space-y-0.5 sm:space-y-1">
                            <li>• Use 8+ characters</li>
                            <li>• Mix letters and numbers</li>
                            <li>• Include special characters</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end pt-2 sm:pt-4">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      disabled={loading}
                      icon={
                        <AiOutlineSave size={18} className="sm:w-5 sm:h-5" />
                      }
                      className="w-full sm:w-auto text-sm sm:text-base"
                    >
                      {loading ? "Updating..." : "Update Profile"}
                    </Button>
                  </div>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
