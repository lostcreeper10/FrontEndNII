"use client";

import Navigation from "../components/navigation";

export default function AboutPage() {
  return (
    <>
      <Navigation />

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center min-h-screen px-6 bg-gray-900 text-white text-center">
        {/* Headline */}
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          About <span className="text-orange-500">CREEPERS</span>
        </h1>

        {/* Subtext */}
        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl">
          We are a dedicated team focused on building <span className="font-semibold text-white">web applications</span> 
          that help small and medium <span className="font-semibold text-white">SaaS businesses</span> grow. <br />
          Our <span className="text-orange-500 font-semibold">UX design expertise</span> ensures your users have the best experience.
        </p>

      
      </div>
    </>
  );
}
