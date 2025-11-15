import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const Rating = ({
  rating = 0,
  maxRating = 5,
  size = "md",
  showCount = false,
  count = 0,
}) => {
  const sizes = {
    sm: 16,
    md: 20,
    lg: 24,
  };

  const iconSize = sizes[size];

  return (
    <div className="flex items-center gap-1">
      {[...Array(maxRating)].map((_, index) => (
        <span key={index}>
          {index < Math.floor(rating) ? (
            <AiFillStar size={iconSize} className="text-yellow-400" />
          ) : (
            <AiOutlineStar size={iconSize} className="text-gray-300" />
          )}
        </span>
      ))}
      {showCount && (
        <span className="ml-2 text-sm text-gray-600">({count})</span>
      )}
    </div>
  );
};

export default Rating;
