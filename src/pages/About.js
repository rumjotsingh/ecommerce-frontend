import React from "react";
import Layout from "./../components/layout/layout";
import Card from "../components/UI/Card";
import {
  AiOutlineInfoCircle,
  AiOutlineTeam,
  AiOutlineTrophy,
} from "react-icons/ai";

const About = () => {
  return (
    <Layout title={"About Us"}>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Image Section */}
            <div className="relative rounded-2xl overflow-hidden shadow-soft-lg h-[500px]">
              <img
                src="/images/about.jpeg"
                alt="About Us"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                <div className="text-white">
                  <h2 className="text-3xl font-bold mb-2">ShopHub</h2>
                  <p className="text-lg">Your Trusted Shopping Partner</p>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="space-y-6">
              <Card>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                    <AiOutlineInfoCircle size={24} className="text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                      About Us
                    </h1>
                    <p className="text-gray-600">Learn more about our story</p>
                  </div>
                </div>

                <div className="space-y-4 text-gray-700 leading-relaxed">
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
                    interaction with our platform is seamless and enjoyable.
                    From browsing to checkout, we've designed every aspect with
                    you in mind.
                  </p>
                </div>
              </Card>

              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <div className="text-center space-y-2">
                    <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto">
                      <AiOutlineTeam size={24} className="text-primary-500" />
                    </div>
                    <h3 className="font-semibold text-gray-900">Expert Team</h3>
                    <p className="text-sm text-gray-600">
                      Dedicated professionals
                    </p>
                  </div>
                </Card>
                <Card>
                  <div className="text-center space-y-2">
                    <div className="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center mx-auto">
                      <AiOutlineTrophy
                        size={24}
                        className="text-secondary-500"
                      />
                    </div>
                    <h3 className="font-semibold text-gray-900">
                      Quality First
                    </h3>
                    <p className="text-sm text-gray-600">Premium products</p>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
