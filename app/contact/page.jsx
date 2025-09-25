"use client";

import Navigation from "../components/navigation";

export default function ContactPage() {
  return (
    <>
      <Navigation />

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center min-h-screen px-6 bg-gray-900 text-white text-center">
        {/* Headline */}
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Contact <span className="text-orange-500">CREEPERS</span>
        </h1>

        {/* Intro Text */}
        <p className="text-lg md:text-xl max-w-2xl mb-8">
          If you have any questions, feedback, or suggestions, feel free to reach out
          to us on any of our social platforms below. We’d love to hear from you!
        </p>

        {/* Divider */}
        <div className="w-200 h-1 bg-orange-500 mb-8 rounded-full"></div>

        {/* Social Links */}
        <div className="flex space-x-6 justify-center">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transform transition-transform hover:scale-125"
          >
            <img src="./instagram.png" alt="Instagram" className="w-12 h-12" />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transform transition-transform hover:scale-125"
          >
            <img src="./facebook.png" alt="Facebook" className="w-12 h-12" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transform transition-transform hover:scale-125"
          >
            <img src="./twitter.png" alt="Twitter" className="w-12 h-12" />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transform transition-transform hover:scale-125"
          >
            <img src="./github.png" alt="GitHub" className="w-12 h-12" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transform transition-transform hover:scale-125"
          >
            <img src="./linkedin.png" alt="LinkedIn" className="w-12 h-12" />
          </a>
        </div>
      </div>
    </>
  );
}
