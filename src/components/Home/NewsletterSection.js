import React, { useState } from "react";
import toast from "react-hot-toast";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Please enter your email");
      return;
    }
    toast.success("Thanks for subscribing!");
    setEmail("");
  };

  return (
    <section className="bg-primary-500 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-white text-center md:text-left">
            <h3 className="text-lg font-bold mb-1">
              Subscribe to our Newsletter
            </h3>
            <p className="text-sm opacity-90">
              Get updates on new arrivals and special offers
            </p>
          </div>
          <form onSubmit={handleSubmit} className="flex gap-2 w-full md:w-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 md:w-64 px-4 py-2 rounded text-sm outline-none"
            />
            <button
              type="submit"
              className="bg-gray-900 text-white px-6 py-2 rounded text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
