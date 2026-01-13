import React from "react";
import Layout from "./../components/layout/layout";

const Terms = () => {
  return (
    <Layout title={"Terms & Conditions"}>
      <div className="bg-gray-100 py-6">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded shadow-sm">
              {/* Header */}
              <div className="border-b px-6 py-4">
                <h1 className="text-xl font-medium text-gray-900">
                  Terms & Conditions
                </h1>
                <p className="text-sm text-gray-500">
                  Last updated: November 2025
                </p>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6 text-sm text-gray-600">
                <div>
                  <h2 className="text-base font-medium text-gray-900 mb-2">
                    Acceptance of Terms
                  </h2>
                  <p>
                    By accessing and using ShopHub, you accept and agree to be
                    bound by the terms and provisions of this agreement. If you
                    do not agree to these terms, please do not use our service.
                  </p>
                </div>

                <div>
                  <h2 className="text-base font-medium text-gray-900 mb-2">
                    Use of Service
                  </h2>
                  <p>
                    You agree to use our platform only for lawful purposes and
                    in accordance with these Terms. You are responsible for
                    maintaining the confidentiality of your account information.
                  </p>
                </div>

                <div>
                  <h2 className="text-base font-medium text-gray-900 mb-2">
                    Product Information
                  </h2>
                  <p>
                    We strive to provide accurate product descriptions and
                    pricing. However, we do not warrant that product
                    descriptions or other content is accurate, complete,
                    reliable, or error-free.
                  </p>
                </div>

                <div>
                  <h2 className="text-base font-medium text-gray-900 mb-2">
                    Limitation of Liability
                  </h2>
                  <p>
                    ShopHub shall not be liable for any indirect, incidental,
                    special, consequential, or punitive damages resulting from
                    your use of or inability to use the service.
                  </p>
                </div>

                <div>
                  <h2 className="text-base font-medium text-gray-900 mb-2">
                    Changes to Terms
                  </h2>
                  <p>
                    We reserve the right to modify these terms at any time.
                    Continued use of the service after changes constitutes
                    acceptance of the modified terms.
                  </p>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-xs text-gray-500">
                    For questions about these terms, contact us at{" "}
                    <a
                      href="mailto:legal@shophub.com"
                      className="text-primary-500"
                    >
                      legal@shophub.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Terms;
