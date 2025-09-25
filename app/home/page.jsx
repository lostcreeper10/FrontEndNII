"use client";

import Navigation from "../components/navigation";

export default function HomePage() {
  return (
    <>
      <Navigation />
      
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center min-h-screen px-6 bg-gray-900 text-white text-center">
        
        {/* Headline */}
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          The web application <br className="hidden md:block" /> 
          agency that <span className="text-orange-500">helps you grow</span>
        </h1>

        {/* Subtext */}
        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl">
          We create <span className="font-semibold text-white">web applications</span> 
          for small and medium <span className="font-semibold text-white">SaaS businesses</span>. <br />
          Our <span className="text-orange-500 font-semibold">UX design expertise</span> means 
          we prioritize the people who matter most – your users.
        </p>

        {/* Call to Action */}
        <a
          href="/contact"
          className="bg-purple-700 hover:bg-purple-800 transition text-white font-semibold px-6 py-3 rounded-md"
        >
          Free quote
        </a>

      </div>
    </>
  );
}
