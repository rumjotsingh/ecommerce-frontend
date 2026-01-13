import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const Rating = ({
  rating = 0,
  maxRating = 5,
  size = "md",
  showCount = false,
  count = 0,
  interactive = false,
  onRatingChange,
  className = "",
}) => {
  const sizes = {
    xs: "w-3 h-3",
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
    xl: "w-8 h-8",
  };

  const handleStarClick = (starRating) => {
    if (interactive && onRatingChange) {
      onRatingChange(starRating);
    }
  };

  const renderStars = () => {
    const stars = [];
    
    for (let i = 1; i <= maxRating; i++) {
      const isFilled = i <= rating;
      const isHalfFilled = i - 0.5 === rating;
      
      stars.push(
        <button
          key={i}
          type="button"
          onClick={() => handleStarClick(i)}
          disabled={!interactive}
          className={`${interactive ? "cursor-pointer hover:scale-110" : "cursor-default"} transition-transform duration-150 ${
            interactive ? "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 rounded" : ""
          }`}
        >
          {isFilled || isHalfFilled ? (
            <AiFillStar 
              className={`${sizes[size]} text-warning-400 ${interactive ? "hover:text-warning-500" : ""}`} 
            />
          ) : (
            <AiOutlineStar 
              className={`${sizes[size]} text-neutral-300 ${interactive ? "hover:text-warning-400" : ""}`} 
            />
          )}
        </button>
      );
    }
    
    return stars;
  };

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <div className="flex items-center">
        {renderStars()}
      </div>
      
      {showCount && count > 0 && (
        <span className="text-sm text-neutral-500 ml-2">
          ({count.toLocaleString()})
        </span>
      )}
      
      {!showCount && rating > 0 && (
        <span className="text-sm text-neutral-600 ml-2 font-medium">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
};

export default Rating;