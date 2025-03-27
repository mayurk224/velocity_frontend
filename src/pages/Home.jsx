import React, { useState } from "react";
import Navbar from "../components/Navbar";
import authBG from "../assets/authBG.jpeg";
import AuthForm from "../components/AuthForm";

const Home = () => {
  const [showMinus, setShowMinus] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div
      className="main h-screen w-full bg-cover bg-center relative"
      style={{ backgroundImage: `url(${authBG})` }}
    >
      <Navbar />
      <div className="mt-40 ml-10 absolute max-w-lg">
        <h1 className="font-semibold text-5xl">
          Fast & Reliable Transport Service
        </h1>
        <h3 className="text-2xl font-normal">
          Seamless, safe, and affordable rides anytime, anywhere with
          professional drivers.
        </h3>
      </div>

      <div
        className={`getStartedDiv absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[500px] 
    ${isExpanded ? "h-auto py-4 opacity-100" : "h-[80px] opacity-90"} 
    overflow-hidden bg-white flex flex-col items-center justify-center 
    rounded-t-3xl transition-all duration-500 ease-in-out 
    shadow-lg transform origin-bottom bg-white/20 backdrop-blur-sm`}
      >
        {!isExpanded && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="bg-black mt-2 text-white px-4 py-2 rounded-md toggleDiv 
        transition transform hover:scale-105 active:scale-95 
        focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50"
          >
            Get Started
          </button>
        )}

        <button
          className="toggleDiv mt-2 p-2 group"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {!isExpanded ? (
            <div
              className="minusDiv w-8 h-1 bg-white rounded-3xl 
          transition-all duration-300 group-hover:w-10 group-hover:bg-gray-300"
            ></div>
          ) : (
            <div
              className="w-8 h-2  flex arrowDiv 
          transition-all duration-300 transform"
            >
              <div
                className="rounded-3xl bg-white h-1 w-5 rotate-[20deg] -mr-[2px] 
            transition-all duration-300 group-hover:rotate-[25deg]"
              ></div>
              <div
                className="rounded-3xl bg-white h-1 w-5 rotate-[-20deg] -ml-[2px] 
            transition-all duration-300 group-hover:rotate-[-25deg]"
              ></div>
            </div>
          )}
        </button>

        {isExpanded && (
          <div
            className="transition-all duration-500"
          >
            <AuthForm />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
