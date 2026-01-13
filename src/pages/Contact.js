import React from "react";
import Layout from "./../components/layout/layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";

const Contact = () => {
  return (
    <Layout title={"Contact us"}>
      <div className="bg-gray-100 py-6">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded shadow-sm">
            {/* Header */}
            <div className="border-b px-6 py-4">
              <h1 className="text-xl font-medium text-gray-900">Contact Us</h1>
              <p className="text-sm text-gray-500">We're here to help 24/7</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 p-6">
              {/* Contact Info */}
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  Have any questions or need information about our products?
                  Feel free to reach out anytime.
                </p>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded">
                    <BiMailSend size={20} className="text-primary-500" />
                    <div>
                      <p className="text-xs text-gray-500">Email</p>
                      <a
                        href="mailto:help@shophub.com"
                        className="text-sm text-primary-500"
                      >
                        help@shophub.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded">
                    <BiPhoneCall size={20} className="text-primary-500" />
                    <div>
                      <p className="text-xs text-gray-500">Phone</p>
                      <a
                        href="tel:0123456789"
                        className="text-sm text-primary-500"
                      >
                        012-3456789
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded">
                    <BiSupport size={20} className="text-primary-500" />
                    <div>
                      <p className="text-xs text-gray-500">Toll Free</p>
                      <a
                        href="tel:18000000000"
                        className="text-sm text-primary-500"
                      >
                        1800-0000-0000
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Image */}
              <div className="hidden md:block">
                <img
                  src="/images/contactus.jpeg"
                  alt="Contact Us"
                  className="w-full h-64 object-cover rounded"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
