import React from "react";
import { BiShield, BiPackage, BiSupport, BiRefresh } from "react-icons/bi";

const TrustBadges = () => {
  const badges = [
    {
      icon: <BiPackage size={28} />,
      title: "Free Delivery",
      description: "On orders over ₹499",
    },
    {
      icon: <BiRefresh size={28} />,
      title: "Easy Returns",
      description: "7 days return policy",
    },
    {
      icon: <BiShield size={28} />,
      title: "Secure Payment",
      description: "100% protected",
    },
    {
      icon: <BiSupport size={28} />,
      title: "24/7 Support",
      description: "Dedicated help",
    },
  ];

  return (
    <section className="bg-white py-4 border-b">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {badges.map((badge, index) => (
            <div key={index} className="flex items-center gap-3 py-2">
              <div className="text-gray-600">{badge.icon}</div>
              <div>
                <h3 className="font-medium text-gray-900 text-sm">
                  {badge.title}
                </h3>
                <p className="text-xs text-gray-500">{badge.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
