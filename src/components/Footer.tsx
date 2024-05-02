import { LuMail } from "react-icons/lu";
import { sendEmail } from "../pages/utils";

export function Footer() {
  return (
    <div className="text-white">
      <div className="bg_website_gradient_blue pt-20 justify-center">
        <div className="container mx-auto items-center space-y-4 text-center">
          <h2 className="text-3xl font-bold mb-2">Get in Touch</h2>
          <p className="leading-7 mx-6 text-sm md:text-base">
            Questions or suggestions? Connect with us! Your feedback is
            valuable, and we're here to assist you.
          </p>
          <button className="flex space-x-4 py-4 justify-center m-auto" onClick={()=> sendEmail()}>
            <div
              className="bg-white text-sky-700 px-5 py-3 rounded-lg space-x-3 flex flex-row font-semibold"
            >
              <LuMail className="w-6 h-6 inline-block" />
              <div>Contact Us</div>
            </div>
          </button>
        </div>

        <div className="pt-20 pb-5 text-center bottom-0 text-white/60 text-xs md:text-base">
          &copy; {new Date().getFullYear()} Nepalese Scholarship Hub. All Rights
          Reserved.
        </div>
      </div>
    </div>
  );
}
