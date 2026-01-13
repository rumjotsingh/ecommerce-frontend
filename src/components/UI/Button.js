import React from "react";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  icon,
  iconPosition = "left",
  fullWidth = false,
  loading = false,
  disabled = false,
  ...props
}) => {
  const baseStyles =
    "font-medium rounded transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-1";

  const variants = {
    primary:
      "bg-primary-500 hover:bg-primary-600 text-white focus:ring-primary-500",
    secondary:
      "bg-secondary-500 hover:bg-secondary-600 text-white focus:ring-secondary-500",
    success: "bg-green-600 hover:bg-green-700 text-white focus:ring-green-500",
    outline:
      "border border-primary-500 text-primary-500 hover:bg-primary-50 focus:ring-primary-500",
    ghost: "text-primary-500 hover:bg-primary-50 focus:ring-primary-500",
    danger: "bg-red-500 hover:bg-red-600 text-white focus:ring-red-500",
    white:
      "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-gray-300",
    dark: "bg-gray-800 text-white hover:bg-gray-900 focus:ring-gray-500",
  };

  const sizes = {
    xs: "px-2.5 py-1 text-xs",
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-2.5 text-base",
    xl: "px-6 py-3 text-base",
  };

  const isDisabled = disabled || loading;

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${
        fullWidth ? "w-full" : ""
      } ${className}`}
      disabled={isDisabled}
      {...props}
    >
      {loading && (
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
      )}

      {!loading && icon && iconPosition === "left" && (
        <span className="flex-shrink-0">{icon}</span>
      )}
      {!loading && children}
      {!loading && icon && iconPosition === "right" && (
        <span className="flex-shrink-0">{icon}</span>
      )}
    </button>
  );
};

export default Button;
