import React from "react";

const Badge = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  icon,
  dot = false,
  ...props
}) => {
  const baseStyles = "inline-flex items-center font-medium rounded-full transition-all duration-200";

  const variants = {
    primary: "bg-primary-100 text-primary-800 border border-primary-200",
    secondary: "bg-secondary-100 text-secondary-800 border border-secondary-200",
    success: "bg-success-100 text-success-800 border border-success-200",
    warning: "bg-warning-100 text-warning-800 border border-warning-200",
    danger: "bg-danger-100 text-danger-800 border border-danger-200",
    neutral: "bg-neutral-100 text-neutral-800 border border-neutral-200",
    dark: "bg-neutral-800 text-white border border-neutral-700",
    outline: "bg-white text-neutral-700 border border-neutral-300",
  };

  const sizes = {
    xs: "px-2 py-0.5 text-xs",
    sm: "px-2.5 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-1.5 text-base",
  };

  return (
    <span
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {dot && (
        <span className="w-1.5 h-1.5 bg-current rounded-full mr-1.5"></span>
      )}
      {icon && <span className="mr-1">{icon}</span>}
      {children}
    </span>
  );
};

export default Badge;