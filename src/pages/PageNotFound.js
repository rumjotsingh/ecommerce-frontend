import React from "react";
import Layout from "../components/layout/layout";
import { Link } from "react-router-dom";
import Button from "../components/UI/Button";
import { AiOutlineHome } from "react-icons/ai";

function PageNotFound() {
  return (
    <Layout title={"Page Not Found"}>
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center px-4">
        <div className="text-center space-y-8">
          {/* 404 Number */}
          <div className="relative">
            <h1 className="text-9xl md:text-[200px] font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
              404
            </h1>
            <div className="absolute inset-0 blur-3xl opacity-30 bg-gradient-to-r from-primary-500 to-secondary-500"></div>
          </div>

          {/* Message */}
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Oops! Page Not Found
            </h2>
            <p className="text-lg text-gray-600 max-w-md mx-auto">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>

          {/* Action Button */}
          <Link to="/">
            <Button
              variant="primary"
              size="lg"
              icon={<AiOutlineHome size={20} />}
            >
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export default PageNotFound;
