import React from "react";
import Layout from "./../components/layout/layout";

const About = () => {
  return (
    <Layout title={"About Us"}>
      <div className="bg-gray-100 py-6">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded shadow-sm">
              {/* Header */}
              <div className="border-b px-6 py-4">
                <h1 className="text-xl font-medium text-gray-900">
                  About ShopHub
                </h1>
                <p className="text-sm text-gray-500">
                  Your trusted shopping partner
                </p>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4 text-sm text-gray-600">
                <p>
                  Welcome to ShopHub, your premier destination for quality
                  products and exceptional shopping experiences. We are
                  dedicated to providing our customers with the best selection
                  of products at competitive prices.
                </p>
                <p>
                  Founded with a vision to revolutionize online shopping, we
                  strive to make every purchase convenient, secure, and
                  satisfying. Our commitment to excellence drives us to
                  continuously improve and expand our offerings.
                </p>
                <p>
                  With a focus on customer satisfaction, we ensure that every
                  interaction with our platform is seamless and enjoyable. From
                  browsing to checkout, we've designed every aspect with you in
                  mind.
                </p>
              </div>

              {/* Stats */}
              <div className="border-t px-6 py-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-primary-500">10K+</p>
                    <p className="text-xs text-gray-500">Products</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-primary-500">50K+</p>
                    <p className="text-xs text-gray-500">Customers</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-primary-500">100+</p>
                    <p className="text-xs text-gray-500">Categories</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
