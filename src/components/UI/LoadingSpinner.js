import React from "react";

const LoadingSpinner = ({ 
  size = "md", 
  color = "primary", 
  className = "",
  text = "",
  fullScreen = false 
}) => {
  const sizes = {
    xs: "w-4 h-4",
    sm: "w-6 h-6", 
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  };

  const colors = {
    primary: "border-primary-500",
    secondary: "border-secondary-500",
    white: "border-white",
    neutral: "border-neutral-500",
  };

  const spinner = (
    <div className={`${sizes[size]} border-2 ${colors[color]} border-t-transparent rounded-full animate-spin ${className}`}></div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="text-center">
          {spinner}
          {text && <p className="mt-4 text-neutral-600 font-medium">{text}</p>}
        </div>
      </div>
    );
  }

  if (text) {
    return (
      <div className="flex items-center gap-3">
        {spinner}
        <span className="text-neutral-600 font-medium">{text}</span>
      </div>
    );
  }

  return spinner;
};

export default LoadingSpinner;