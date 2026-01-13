import React from "react";
import Button from "./Button";

const EmptyState = ({
  icon,
  title,
  description,
  action,
  actionText,
  onAction,
  className = "",
  size = "md",
  illustration,
}) => {
  const sizes = {
    sm: {
      container: "py-8",
      icon: "w-12 h-12",
      title: "text-lg",
      description: "text-sm",
    },
    md: {
      container: "py-16",
      icon: "w-20 h-20",
      title: "text-xl",
      description: "text-base",
    },
    lg: {
      container: "py-24",
      icon: "w-24 h-24",
      title: "text-2xl",
      description: "text-lg",
    },
  };

  const currentSize = sizes[size];

  return (
    <div 
      className={`text-center ${currentSize.container} ${className} animate-fade-in`}
      role="status"
      aria-live="polite"
    >
      {illustration && (
        <div className="mx-auto mb-6 max-w-xs">
          {illustration}
        </div>
      )}
      
      {icon && !illustration && (
        <div className={`${currentSize.icon} mx-auto mb-6 text-neutral-300 flex items-center justify-center`}>
          <div className="transition-transform duration-300 hover:scale-110">
            {icon}
          </div>
        </div>
      )}
      
      {title && (
        <h3 className={`${currentSize.title} font-bold text-neutral-900 mb-3 transition-colors`}>
          {title}
        </h3>
      )}
      
      {description && (
        <p className={`${currentSize.description} text-neutral-600 mb-8 max-w-md mx-auto leading-relaxed`}>
          {description}
        </p>
      )}
      
      {(action || (actionText && onAction)) && (
        <div className="animate-slide-up">
          {action || (
            <Button 
              onClick={onAction} 
              variant="primary"
              className="focus:ring-2 focus:ring-offset-2"
            >
              {actionText}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default EmptyState;