import React from "react";
import Layout from "./../components/layout/layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
import Card from "../components/UI/Card";
import { AiOutlinePhone } from "react-icons/ai";

const Contact = () => {
  return (
    <Layout title={"Contact us"}>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Image Section */}
            <div className="relative rounded-2xl overflow-hidden shadow-soft-lg h-[500px]">
              <img
                src="/images/contactus.jpeg"
                alt="Contact Us"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                <div className="text-white">
                  <h2 className="text-3xl font-bold mb-2">Get in Touch</h2>
                  <p className="text-lg">We're here to help you 24/7</p>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="space-y-6">
              <Card>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                    <AiOutlinePhone size={24} className="text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                      Contact Us
                    </h1>
                    <p className="text-gray-600">We're always here to help</p>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <p className="text-gray-700 leading-relaxed">
                    Have any questions or need information about our products?
                    Feel free to reach out anytime. We're available 24/7 to
                    assist you.
                  </p>
                </div>

                {/* Contact Info Cards */}
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-primary-50 transition-colors">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <BiMailSend size={20} className="text-primary-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        Email
                      </h3>
                      <a
                        href="mailto:help@ecommerceapp.com"
                        className="text-primary-500 hover:text-primary-600"
                      >
                        help@ecommerceapp.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-primary-50 transition-colors">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <BiPhoneCall size={20} className="text-primary-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        Phone
                      </h3>
                      <a
                        href="tel:0123456789"
                        className="text-primary-500 hover:text-primary-600"
                      >
                        012-3456789
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-primary-50 transition-colors">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <BiSupport size={20} className="text-primary-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        Support (Toll Free)
                      </h3>
                      <a
                        href="tel:18000000000"
                        className="text-primary-500 hover:text-primary-600"
                      >
                        1800-0000-0000
                      </a>
                    </div>
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

export default Contact;
