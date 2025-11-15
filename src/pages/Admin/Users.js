import React from "react";
import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "./../../components/layout/layout";
import Card from "../../components/UI/Card";
import { AiOutlineUser } from "react-icons/ai";

const Users = () => {
  return (
    <Layout title={"Dashboard - All Users"}>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <AdminMenu />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Header */}
              <Card>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                    <AiOutlineUser size={24} className="text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                      All Users
                    </h1>
                    <p className="text-gray-600">Manage registered users</p>
                  </div>
                </div>
              </Card>

              {/* Users List Placeholder */}
              <Card>
                <div className="text-center py-16">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
                    <AiOutlineUser size={40} className="text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Users Management
                  </h3>
                  <p className="text-gray-600 max-w-md mx-auto">
                    This feature is coming soon. You'll be able to view and
                    manage all registered users from here.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
