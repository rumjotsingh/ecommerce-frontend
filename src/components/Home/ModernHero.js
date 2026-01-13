import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

const ModernHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const banners = [
    {
      id: 1,
      title: "Big Savings Days",
      subtitle: "Up to 70% Off on Electronics",
      bgColor: "from-blue-500 to-blue-600",
      link: "/products",
    },
    {
      id: 2,
      title: "Fashion Sale",
      subtitle: "Flat 50% Off on Trending Styles",
      bgColor: "from-pink-500 to-purple-500",
      link: "/category/fashion",
    },
    {
      id: 3,
      title: "Home Essentials",
      subtitle: "Best Deals on Home & Kitchen",
      bgColor: "from-green-500 to-teal-500",
      link: "/category/home",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [banners.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  return (
    <section className="bg-white">
      {/* Main Banner Slider */}
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {banners.map((banner) => (
            <div key={banner.id} className="min-w-full">
              <Link to={banner.link}>
                <div
                  className={`bg-gradient-to-r ${banner.bgColor} h-48 sm:h-64 md:h-80 flex items-center justify-center`}
                >
                  <div className="text-center text-white px-4">
                    <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-2">
                      {banner.title}
                    </h2>
                    <p className="text-sm sm:text-lg md:text-xl opacity-90">
                      {banner.subtitle}
                    </p>
                    <button className="mt-4 bg-white text-gray-900 px-6 py-2 rounded font-medium text-sm hover:bg-gray-100 transition-colors">
                      Shop Now
                    </button>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-md"
        >
          <AiOutlineLeft size={20} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-md"
        >
          <AiOutlineRight size={20} />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentSlide ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Quick Category Links */}
      <div className="bg-white py-4 border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4">
            {[
              { name: "Mobiles", icon: "📱", link: "/products" },
              { name: "Fashion", icon: "👔", link: "/products" },
              { name: "Electronics", icon: "💻", link: "/products" },
              { name: "Home", icon: "🏠", link: "/products" },
              { name: "Appliances", icon: "🔌", link: "/products" },
              { name: "Toys", icon: "🧸", link: "/products" },
              { name: "Grocery", icon: "🛒", link: "/products" },
              { name: "More", icon: "➡️", link: "/categories" },
            ].map((item, index) => (
              <Link
                key={index}
                to={item.link}
                className="flex flex-col items-center gap-1 hover:text-primary-500 transition-colors"
              >
                <span className="text-2xl sm:text-3xl">{item.icon}</span>
                <span className="text-xs sm:text-sm text-center font-medium text-gray-700">
                  {item.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernHero;
