import React from "react";

export function Footer() {
  return (
    <div className="text-white">
      {/* Get in Touch Section */}
      <div className="bg_website_ddblue py-16 justify-center">
        <div className="container mx-auto items-center space-y-4 text-center">
          <h2 className="text-3xl font-bold mb-2">Get in Touch</h2>
          <p className="leading-7 mx-6">
            Questions or suggestions? Connect with us! Your feedback is
            valuable, and we're here to assist you.
          </p>
          <div className="flex space-x-4 my-4 justify-center">
            <a
              href="mailto:digitalkala.nepal@gmail.com"
              className="bg-white text-blue-500 px-4 py-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring focus:border-blue-300 inline-block"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>

      {/* Additional Section: See You Soon */}
      <div className="bg_website_dblue py-10 text-center">
        &copy; {new Date().getFullYear()} Nepalese Scholarship Hub. All Rights
        Reserved.
      </div>
    </div>
  );
}
