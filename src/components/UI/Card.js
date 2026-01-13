import React from "react";

const Card = ({
  children,
  className = "",
  hover = false,
  padding = "default",
  ...props
}) => {
  const baseStyles = "bg-white border border-gray-100 rounded shadow-sm";

  const hoverStyles = hover ? "hover:shadow-md transition-shadow" : "";

  const paddingStyles = {
    none: "",
    sm: "p-3",
    default: "p-4",
    lg: "p-6",
  };

  return (
    <div
      className={`${baseStyles} ${hoverStyles} ${paddingStyles[padding]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
