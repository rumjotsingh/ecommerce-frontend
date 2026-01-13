import React from "react";
import { Link } from "react-router-dom";

const OffersSection = () => {
  const offers = [
    {
      id: 1,
      title: "Electronics",
      subtitle: "Up to 50% Off",
      bgColor: "bg-blue-500",
      link: "/products",
    },
    {
      id: 2,
      title: "Fashion",
      subtitle: "Min 40% Off",
      bgColor: "bg-pink-500",
      link: "/products",
    },
    {
      id: 3,
      title: "Home & Kitchen",
      subtitle: "From ₹199",
      bgColor: "bg-green-500",
      link: "/products",
    },
    {
      id: 4,
      title: "Beauty",
      subtitle: "Extra 10% Off",
      bgColor: "bg-purple-500",
      link: "/products",
    },
  ];

  return (
    <section className="bg-gray-100 py-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {offers.map((offer) => (
            <Link key={offer.id} to={offer.link}>
              <div
                className={`${offer.bgColor} rounded p-6 text-white text-center hover:opacity-90 transition-opacity h-32 flex flex-col items-center justify-center`}
              >
                <h3 className="text-lg font-bold mb-1">{offer.title}</h3>
                <p className="text-sm opacity-90">{offer.subtitle}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OffersSection;
