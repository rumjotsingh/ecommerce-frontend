import React, { useState } from "react";
import Layout from "./../components/layout/layout";
import Card from "../components/UI/Card";
import {
  AiOutlineQuestionCircle,
  AiOutlinePlus,
  AiOutlineMinus,
} from "react-icons/ai";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How do I place an order?",
      answer:
        "Browse our products, add items to your cart, and proceed to checkout. You'll need to create an account or log in, then provide shipping information and payment details to complete your order.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, MasterCard, American Express), debit cards, PayPal, and other secure payment methods. All transactions are encrypted for your security.",
    },
    {
      question: "How long does shipping take?",
      answer:
        "Standard shipping typically takes 5-7 business days. Express shipping options are available at checkout for faster delivery (2-3 business days). International shipping times vary by location.",
    },
    {
      question: "Can I track my order?",
      answer:
        "Yes! Once your order ships, you'll receive a tracking number via email. You can also view your order status by logging into your account and visiting the Orders page.",
    },
    {
      question: "What is your return policy?",
      answer:
        "We offer a 30-day return window for most products. Items must be unused and in original packaging. Visit our Return Policy page for complete details and instructions.",
    },
    {
      question: "How do I cancel or modify my order?",
      answer:
        "You can cancel or modify your order within 1 hour of placing it. After that, the order enters processing and cannot be changed. Contact our support team immediately if you need assistance.",
    },
    {
      question: "Do you offer international shipping?",
      answer:
        "Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by destination. International orders may be subject to customs fees determined by your country.",
    },
    {
      question: "How do I contact customer support?",
      answer:
        "You can reach us via email at support@shophub.com, call us at +1 (555) 123-4567, or use the contact form on our Contact page. We're available 24/7 to assist you.",
    },
    {
      question: "Are my payment details secure?",
      answer:
        "Absolutely! We use industry-standard SSL encryption to protect your payment information. We never store your complete credit card details on our servers.",
    },
    {
      question: "Can I change my shipping address?",
      answer:
        "If your order hasn't shipped yet, you can update the shipping address by contacting our support team. Once shipped, the address cannot be changed, but you may be able to redirect with the carrier.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Layout title={"Frequently Asked Questions"}>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <Card className="mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                  <AiOutlineQuestionCircle size={24} className="text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    Frequently Asked Questions
                  </h1>
                  <p className="text-gray-600">
                    Find answers to common questions
                  </p>
                </div>
              </div>
            </Card>

            {/* FAQ List */}
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <Card key={index} className="overflow-hidden">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex items-center justify-between text-left p-6 hover:bg-gray-50 transition-colors"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 pr-4">
                      {faq.question}
                    </h3>
                    <div className="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                      {openIndex === index ? (
                        <AiOutlineMinus
                          size={20}
                          className="text-primary-500"
                        />
                      ) : (
                        <AiOutlinePlus size={20} className="text-primary-500" />
                      )}
                    </div>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      openIndex === index ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    <div className="px-6 pb-6 text-gray-700 leading-relaxed">
                      {faq.answer}
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Contact Section */}
            <Card className="mt-8 bg-gradient-to-br from-primary-50 to-secondary-50 border-primary-200">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Still have questions?
                </h3>
                <p className="text-gray-600 mb-4">
                  Can't find the answer you're looking for? Our support team is
                  here to help.
                </p>
                <a
                  href="/contact"
                  className="inline-block px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl font-medium hover:shadow-lg transition-all"
                >
                  Contact Support
                </a>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FAQ;
