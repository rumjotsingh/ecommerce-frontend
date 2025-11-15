import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Spinner = ({ path = "login" }) => {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue);
    }, 1000);
    count === 0 &&
      navigate(`${path}`, {
        state: location.pathname,
      });
    return () => clearInterval(interval);
  }, [count, navigate, location, path]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-8">
        {/* Animated Spinner */}
        <div className="relative">
          <div className="w-24 h-24 mx-auto">
            <AiOutlineLoading3Quarters
              size={96}
              className="text-primary-500 animate-spin"
            />
          </div>
          {/* Pulsing Circle */}
          <div className="absolute inset-0 w-24 h-24 mx-auto rounded-full border-4 border-primary-200 animate-ping opacity-75"></div>
        </div>

        {/* Redirect Message */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-gray-900">Redirecting...</h2>
          <p className="text-lg text-gray-600">
            You will be redirected in{" "}
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary-500 text-white font-bold text-xl mx-1">
              {count}
            </span>{" "}
            {count === 1 ? "second" : "seconds"}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-64 mx-auto">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full transition-all duration-1000 ease-linear"
              style={{ width: `${((3 - count) / 3) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Spinner;
