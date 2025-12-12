import React from "react";

const LoadingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      {/* Spinner Circle */}
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-6"></div>

      {/* Bouncing Dots */}
      <div className="flex space-x-2">
        <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-150"></div>
        <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-300"></div>
        <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-450"></div>
      </div>

      {/* Loading Text */}
      <p className="mt-6 text-gray-600 text-lg font-medium">Loading, please wait...</p>
    </div>
  );
};

export default LoadingPage;
