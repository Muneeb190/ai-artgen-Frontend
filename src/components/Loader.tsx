import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-background">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-ping opacity-75"></div>
        <div className="absolute inset-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 animate-pulse"></div>
      </div>
    </div>
  );
};

export default Loader;
