import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Input = ({
  label,
  error,
  icon,
  className = "",
  containerClassName = "",
  type,
  helperText,
  required = false,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const isPasswordField = type === "password";
  const inputType = isPasswordField && showPassword ? "text" : type;

  return (
    <div className={`w-full ${containerClassName}`}>
      {label && (
        <label
          className="block text-sm font-semibold text-neutral-700 mb-2 transition-colors"
          htmlFor={props.id}
        >
          {label}
          {required && <span className="text-danger-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div
            className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-200 ${
              isFocused ? "text-primary-500" : "text-neutral-400"
            }`}
          >
            <span>{icon}</span>
          </div>
        )}
        <input
          type={inputType}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-offset-0 outline-none transition-all duration-200 bg-white ${
            icon ? "pl-12" : ""
          } ${isPasswordField ? "pr-12" : ""} ${
            error
              ? "border-danger-300 focus:ring-danger-500 focus:border-danger-500 hover:border-danger-400"
              : isFocused
              ? "border-primary-500 focus:ring-primary-500 shadow-sm"
              : "border-neutral-300 hover:border-neutral-400 focus:ring-primary-500 focus:border-primary-500"
          } ${className}`}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${props.id}-error` : undefined}
          {...props}
        />
        {isPasswordField && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-r-xl"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <AiOutlineEyeInvisible
                size={20}
                className="text-neutral-400 hover:text-primary-600 transition-colors"
              />
            ) : (
              <AiOutlineEye
                size={20}
                className="text-neutral-400 hover:text-primary-600 transition-colors"
              />
            )}
          </button>
        )}
      </div>
      {error && (
        <p
          id={props.id ? `${props.id}-error` : undefined}
          className="mt-2 text-sm text-danger-600 flex items-center gap-1.5 animate-slide-down"
          role="alert"
        >
          <svg
            className="w-4 h-4 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <span>{error}</span>
        </p>
      )}
      {helperText && !error && (
        <p className="mt-2 text-sm text-neutral-500 transition-colors">
          {helperText}
        </p>
      )}
    </div>
  );
};

export default Input;
