import React from "react";
import Layout from "./../components/layout/layout";
import Card from "../components/UI/Card";
import { AiOutlineSwap } from "react-icons/ai";

const ReturnPolicy = () => {
  return (
    <Layout title={"Return Policy"}>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Image Section */}
            <div className="relative rounded-2xl overflow-hidden shadow-soft-lg">
              <img
                src="/images/contactus.jpeg"
                alt="Return Policy"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>

            {/* Content Section */}
            <div className="space-y-6">
              <Card>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                    <AiOutlineSwap size={24} className="text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                      Return Policy
                    </h1>
                    <p className="text-gray-600">Updated: November 2025</p>
                  </div>
                </div>

                <div className="space-y-6 text-gray-700">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-3">
                      Return Window
                    </h2>
                    <p className="leading-relaxed">
                      We offer a 30-day return window for most products. Items
                      must be returned in their original condition with all tags
                      and packaging intact to qualify for a full refund.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-3">
                      Eligibility
                    </h2>
                    <p className="leading-relaxed">
                      To be eligible for a return, your item must be unused and
                      in the same condition that you received it. It must also
                      be in the original packaging with receipt or proof of
                      purchase.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-3">
                      Return Process
                    </h2>
                    <p className="leading-relaxed">
                      To initiate a return, please contact our customer service
                      team. Once your return is approved, we'll send you a
                      return shipping label and instructions on how to send your
                      package.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-3">
                      Refunds
                    </h2>
                    <p className="leading-relaxed">
                      Once we receive your return, we will inspect it and notify
                      you of the approval or rejection of your refund. If
                      approved, refunds will be processed within 5-7 business
                      days.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-3">
                      Non-Returnable Items
                    </h2>
                    <p className="leading-relaxed">
                      Certain items cannot be returned, including perishable
                      goods, custom products, personal care items, and sale
                      items. Gift cards are also non-returnable.
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600">
                      Questions about returns? Contact us at{" "}
                      <a
                        href="mailto:returns@shophub.com"
                        className="text-primary-500 hover:text-primary-600"
                      >
                        returns@shophub.com
                      </a>
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ReturnPolicy;
