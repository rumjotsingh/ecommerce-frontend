import React from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import { BiTimer } from "react-icons/bi";

const OffersSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-gradient-to-br from-primary-50 to-secondary-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Big Offer Card */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-500 to-primary-600 p-8 lg:p-12 text-white shadow-soft-lg">
            <div className="relative z-10 space-y-6">
              <div className="inline-flex items-center gap-2 bg-white bg-opacity-20 px-4 py-2 rounded-full backdrop-blur-sm">
                <BiTimer size={20} />
                <span className="text-sm font-medium">Limited Time Offer</span>
              </div>

              <h2 className="text-4xl lg:text-5xl font-bold">
                Summer Sale
                <span className="block text-3xl lg:text-4xl mt-2">
                  Up to 70% Off
                </span>
              </h2>

              <p className="text-lg opacity-90 max-w-md">
                Don't miss out on incredible deals across all categories. Shop
                now and save big!
              </p>

              <button
                onClick={() => navigate("/")}
                className="inline-flex items-center gap-2 bg-white text-primary-500 px-8 py-4 rounded-xl font-semibold hover:shadow-xl transition-all"
              >
                Shop Sale
                <AiOutlineArrowRight size={20} />
              </button>

              {/* Countdown Timer */}
              <div className="flex gap-4 pt-4">
                {[
                  { value: "12", label: "Days" },
                  { value: "18", label: "Hours" },
                  { value: "42", label: "Mins" },
                  { value: "30", label: "Secs" },
                ].map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl px-4 py-3 min-w-[70px]">
                      <div className="text-3xl font-bold">{item.value}</div>
                    </div>
                    <div className="text-xs mt-2 opacity-80">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-white opacity-10 rounded-full -mr-24 -mb-24"></div>
          </div>

          {/* Two Small Offer Cards */}
          <div className="grid grid-cols-1 gap-8">
            {/* Card 1 */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-secondary-500 to-secondary-600 p-8 text-white shadow-soft-lg">
              <div className="relative z-10 space-y-4">
                <div className="text-sm font-medium opacity-90">
                  New Arrivals
                </div>
                <h3 className="text-3xl font-bold">Exclusive Collection</h3>
                <p className="opacity-90">
                  Check out our latest products and trends
                </p>
                <button
                  onClick={() => navigate("/")}
                  className="inline-flex items-center gap-2 text-white font-semibold hover:gap-3 transition-all"
                >
                  Explore Now
                  <AiOutlineArrowRight size={20} />
                </button>
              </div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mb-16"></div>
            </div>

            {/* Card 2 */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-pink-500 to-pink-600 p-8 text-white shadow-soft-lg">
              <div className="relative z-10 space-y-4">
                <div className="text-sm font-medium opacity-90">
                  Special Deal
                </div>
                <h3 className="text-3xl font-bold">Free Shipping</h3>
                <p className="opacity-90">
                  On all orders above $50. Limited time!
                </p>
                <button
                  onClick={() => navigate("/")}
                  className="inline-flex items-center gap-2 text-white font-semibold hover:gap-3 transition-all"
                >
                  Shop Now
                  <AiOutlineArrowRight size={20} />
                </button>
              </div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mb-16"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OffersSection;
