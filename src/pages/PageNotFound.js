import React from "react";
import Layout from "../components/layout/layout";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <Layout title={"Page Not Found"}>
      <div className="bg-gray-100 min-h-[70vh] flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-8xl font-bold text-primary-500 mb-4">404</h1>
          <h2 className="text-2xl font-medium text-gray-900 mb-2">
            Page Not Found
          </h2>
          <p className="text-gray-500 mb-6">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link
            to="/"
            className="inline-block px-6 py-2 bg-primary-500 text-white text-sm font-medium rounded hover:bg-primary-600 transition-colors"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export default PageNotFound;
