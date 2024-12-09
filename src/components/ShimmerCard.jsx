import React from "react";

const ShimmerCard = () => {
  return (
    <>
      {[...Array(8)].map((_, index) => (
        <article
          className="flex flex-col bg-white border rounded-lg overflow-hidden shadow-sm border-lprimary animate-pulse"
          key={index}
        >
          {/* Shimmer Image */}
          <div className="object-cover w-full h-48 bg-gray-300"></div>

          <div className="flex flex-col flex-1 p-4 space-y-3">
            {/* Shimmer Source */}
            <div className="w-1/3 h-4 bg-gray-300 rounded"></div>
            {/* Shimmer Title */}
            <div className="h-5 bg-gray-300 rounded w-full"></div>
            <div className="h-5 bg-gray-300 rounded w-3/4"></div>
            {/* Shimmer Footer */}
            <div className="flex justify-between text-xs text-gray-400">
              <div className="h-4 bg-gray-300 rounded w-1/4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/3"></div>
            </div>
          </div>
        </article>
      ))}
    </>
  );
};

export default ShimmerCard;
