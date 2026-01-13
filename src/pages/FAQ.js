import React, { useState } from "react";
import Layout from "./../components/layout/layout";
import { Link } from "react-router-dom";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

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
        "Standard shipping typically takes 5-7 business days. Express shipping options are available at checkout for faster delivery (2-3 business days).",
    },
    {
      question: "Can I track my order?",
      answer:
        "Yes! Once your order ships, you'll receive a tracking number via email. You can also view your order status in your account.",
    },
    {
      question: "What is your return policy?",
      answer:
        "We offer a 30-day return window for most products. Items must be unused and in original packaging.",
    },
    {
      question: "How do I cancel or modify my order?",
      answer:
        "You can cancel or modify your order within 1 hour of placing it. Contact our support team for assistance.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Layout title={"FAQ"}>
      <div className="bg-gray-100 py-6">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="bg-white rounded shadow-sm mb-4">
              <div className="px-6 py-4 border-b">
                <h1 className="text-xl font-medium text-gray-900">
                  Frequently Asked Questions
                </h1>
                <p className="text-sm text-gray-500">
                  Find answers to common questions
                </p>
              </div>
            </div>

            {/* FAQ List */}
            <div className="bg-white rounded shadow-sm">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b last:border-b-0">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex items-center justify-between text-left px-6 py-4 hover:bg-gray-50"
                  >
                    <span className="text-sm font-medium text-gray-900 pr-4">
                      {faq.question}
                    </span>
                    {openIndex === index ? (
                      <AiOutlineMinus
                        size={16}
                        className="text-gray-400 flex-shrink-0"
                      />
                    ) : (
                      <AiOutlinePlus
                        size={16}
                        className="text-gray-400 flex-shrink-0"
                      />
                    )}
                  </button>
                  {openIndex === index && (
                    <div className="px-6 pb-4 text-sm text-gray-600">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Contact Section */}
            <div className="bg-white rounded shadow-sm mt-4 p-6 text-center">
              <p className="text-sm text-gray-600 mb-3">
                Still have questions?
              </p>
              <Link
                to="/contact"
                className="inline-block px-6 py-2 bg-primary-500 text-white text-sm font-medium rounded hover:bg-primary-600 transition-colors"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FAQ;
