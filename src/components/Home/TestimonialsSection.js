import React from "react";
import { AiFillStar } from "react-icons/ai";

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Rahul Sharma",
      rating: 5,
      comment:
        "Great products and fast delivery. Very satisfied with my purchase!",
    },
    {
      id: 2,
      name: "Priya Patel",
      rating: 5,
      comment: "Amazing quality at such affordable prices. Highly recommended!",
    },
    {
      id: 3,
      name: "Amit Kumar",
      rating: 4,
      comment: "Good customer service and easy returns. Will shop again.",
    },
  ];

  return (
    <section className="bg-white py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
          What Our Customers Say
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-gray-50 rounded p-4 border">
              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <AiFillStar
                    key={i}
                    size={14}
                    className={
                      i < testimonial.rating
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>
              <p className="text-sm text-gray-600 mb-3">
                "{testimonial.comment}"
              </p>
              <p className="text-sm font-medium text-gray-900">
                - {testimonial.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
