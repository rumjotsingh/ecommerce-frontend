import React from "react";

/**
 * SkeletonLoader - Modern skeleton loading component
 * Replaces spinners with content-aware loading placeholders
 */
const SkeletonLoader = ({
  variant = "default",
  count = 1,
  className = "",
  width,
  height,
  rounded = "default",
  animate = true,
}) => {
  const baseStyles = `bg-neutral-200 ${animate ? "animate-pulse" : ""}`;

  const roundedStyles = {
    none: "",
    sm: "rounded",
    default: "rounded-lg",
    lg: "rounded-xl",
    full: "rounded-full",
  };

  const variants = {
    default: (
      <div
        className={`${baseStyles} ${roundedStyles[rounded]} ${className}`}
        style={{ width, height }}
        aria-label="Loading..."
        role="status"
      />
    ),
    text: (
      <div
        className={`${baseStyles} ${roundedStyles[rounded]} h-4 ${className}`}
        style={{ width: width || "100%" }}
        aria-label="Loading text..."
        role="status"
      />
    ),
    title: (
      <div
        className={`${baseStyles} ${roundedStyles[rounded]} h-6 ${className}`}
        style={{ width: width || "60%" }}
        aria-label="Loading title..."
        role="status"
      />
    ),
    avatar: (
      <div
        className={`${baseStyles} ${roundedStyles.full} ${className}`}
        style={{ width: width || 40, height: height || 40 }}
        aria-label="Loading avatar..."
        role="status"
      />
    ),
    image: (
      <div
        className={`${baseStyles} ${roundedStyles[rounded]} aspect-square ${className}`}
        style={{ width, height }}
        aria-label="Loading image..."
        role="status"
      />
    ),
    card: (
      <div
        className={`${baseStyles} ${roundedStyles[rounded]} ${className}`}
        style={{ width, height }}
        aria-label="Loading card..."
        role="status"
      />
    ),
    button: (
      <div
        className={`${baseStyles} ${roundedStyles[rounded]} h-10 ${className}`}
        style={{ width: width || 120 }}
        aria-label="Loading button..."
        role="status"
      />
    ),
  };

  if (count > 1) {
    return (
      <div className="space-y-2">
        {Array.from({ length: count }).map((_, index) => (
          <React.Fragment key={index}>{variants[variant]}</React.Fragment>
        ))}
      </div>
    );
  }

  return variants[variant];
};

/**
 * ProductCardSkeleton - Skeleton for product cards
 */
export const ProductCardSkeleton = ({ className = "" }) => {
  return (
    <div
      className={`bg-white rounded-2xl shadow-soft border border-neutral-100 overflow-hidden ${className}`}
      aria-label="Loading product..."
      role="status"
    >
      {/* Image Skeleton */}
      <div className="aspect-square bg-neutral-200 animate-pulse" />

      {/* Content Skeleton */}
      <div className="p-4 space-y-3">
        <div className="h-3 bg-neutral-200 rounded animate-pulse w-1/4" />
        <div className="h-5 bg-neutral-200 rounded animate-pulse w-3/4" />
        <div className="h-4 bg-neutral-200 rounded animate-pulse w-full" />
        <div className="h-4 bg-neutral-200 rounded animate-pulse w-2/3" />
        <div className="flex items-center gap-2">
          <div className="h-4 bg-neutral-200 rounded animate-pulse w-16" />
          <div className="h-4 bg-neutral-200 rounded animate-pulse w-12" />
        </div>
        <div className="flex items-center justify-between pt-2">
          <div className="h-6 bg-neutral-200 rounded animate-pulse w-20" />
          <div className="h-9 bg-neutral-200 rounded-lg animate-pulse w-24" />
        </div>
      </div>
    </div>
  );
};

/**
 * ProductGridSkeleton - Grid of product card skeletons
 */
export const ProductGridSkeleton = ({ count = 8, columns = 4 }) => {
  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${columns} gap-4 lg:gap-6`}
    >
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
};

/**
 * CategoryCardSkeleton - Skeleton for category cards
 */
export const CategoryCardSkeleton = ({ className = "" }) => {
  return (
    <div
      className={`bg-white rounded-2xl shadow-soft border border-neutral-100 overflow-hidden ${className}`}
      aria-label="Loading category..."
      role="status"
    >
      <div className="aspect-square bg-gradient-to-br from-neutral-200 to-neutral-300 animate-pulse" />
      <div className="p-4">
        <div className="h-5 bg-neutral-200 rounded animate-pulse w-3/4 mx-auto" />
      </div>
    </div>
  );
};

/**
 * TableRowSkeleton - Skeleton for table rows
 */
export const TableRowSkeleton = ({ columns = 4, className = "" }) => {
  return (
    <tr className={className} aria-label="Loading table row..." role="status">
      {Array.from({ length: columns }).map((_, index) => (
        <td key={index} className="px-4 py-3">
          <div className="h-4 bg-neutral-200 rounded animate-pulse" />
        </td>
      ))}
    </tr>
  );
};

/**
 * OrderCardSkeleton - Skeleton for order cards
 */
export const OrderCardSkeleton = ({ className = "" }) => {
  return (
    <div
      className={`bg-white rounded-2xl shadow-soft border border-neutral-100 p-6 ${className}`}
      aria-label="Loading order..."
      role="status"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="space-y-2">
          <div className="h-5 bg-neutral-200 rounded animate-pulse w-48" />
          <div className="h-4 bg-neutral-200 rounded animate-pulse w-32" />
        </div>
        <div className="h-6 bg-neutral-200 rounded-full animate-pulse w-20" />
      </div>
      <div className="space-y-3">
        {Array.from({ length: 2 }).map((_, index) => (
          <div key={index} className="flex gap-4">
            <div className="w-16 h-16 bg-neutral-200 rounded-lg animate-pulse" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-neutral-200 rounded animate-pulse w-3/4" />
              <div className="h-4 bg-neutral-200 rounded animate-pulse w-1/2" />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-neutral-200 flex justify-between">
        <div className="h-5 bg-neutral-200 rounded animate-pulse w-24" />
        <div className="h-5 bg-neutral-200 rounded animate-pulse w-32" />
      </div>
    </div>
  );
};

/**
 * DashboardCardSkeleton - Skeleton for dashboard stat cards
 */
export const DashboardCardSkeleton = ({ className = "" }) => {
  return (
    <div
      className={`bg-white rounded-2xl shadow-soft border border-neutral-100 p-6 ${className}`}
      aria-label="Loading dashboard card..."
      role="status"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="h-4 bg-neutral-200 rounded animate-pulse w-24" />
        <div className="w-10 h-10 bg-neutral-200 rounded-lg animate-pulse" />
      </div>
      <div className="h-8 bg-neutral-200 rounded animate-pulse w-32 mb-2" />
      <div className="h-3 bg-neutral-200 rounded animate-pulse w-20" />
    </div>
  );
};

export default SkeletonLoader;
