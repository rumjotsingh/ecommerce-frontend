import React from "react";
import Layout from "./../components/layout/layout";
import Card from "../components/UI/Card";
import { AiOutlineFileText } from "react-icons/ai";

const Terms = () => {
  return (
    <Layout title={"Terms & Conditions"}>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Image Section */}
            <div className="relative rounded-2xl overflow-hidden shadow-soft-lg">
              <img
                src="/images/contactus.jpeg"
                alt="Terms & Conditions"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>

            {/* Content Section */}
            <div className="space-y-6">
              <Card>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                    <AiOutlineFileText size={24} className="text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                      Terms & Conditions
                    </h1>
                    <p className="text-gray-600">Last updated: November 2025</p>
                  </div>
                </div>

                <div className="space-y-6 text-gray-700">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-3">
                      Acceptance of Terms
                    </h2>
                    <p className="leading-relaxed">
                      By accessing and using ShopHub, you accept and agree to be
                      bound by the terms and provisions of this agreement. If
                      you do not agree to these terms, please do not use our
                      service.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-3">
                      Use of Service
                    </h2>
                    <p className="leading-relaxed">
                      You agree to use our platform only for lawful purposes and
                      in accordance with these Terms. You are responsible for
                      maintaining the confidentiality of your account
                      information.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-3">
                      Product Information
                    </h2>
                    <p className="leading-relaxed">
                      We strive to provide accurate product descriptions and
                      pricing. However, we do not warrant that product
                      descriptions or other content is accurate, complete,
                      reliable, or error-free.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-3">
                      Limitation of Liability
                    </h2>
                    <p className="leading-relaxed">
                      ShopHub shall not be liable for any indirect, incidental,
                      special, consequential, or punitive damages resulting from
                      your use of or inability to use the service.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-3">
                      Changes to Terms
                    </h2>
                    <p className="leading-relaxed">
                      We reserve the right to modify these terms at any time.
                      Continued use of the service after changes constitutes
                      acceptance of the modified terms.
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600">
                      For questions about these terms, please contact us at{" "}
                      <a
                        href="mailto:legal@shophub.com"
                        className="text-primary-500 hover:text-primary-600"
                      >
                        legal@shophub.com
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

export default Terms;
