import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

const SocialHeader = () => {
  return (
    <div className="hidden lg:block md:block">
      <div className="w-full text-white py-2 px-4 flex justify-between items-center container mx-auto  text-sm ">
        {/* Left: Contact Info */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <FaPhoneAlt className="text-xs" />
            <span>+880 1608215377</span>
          </div>
          <div className="hidden md:flex items-center gap-1">
            <FaEnvelope className="text-xs" />
            <span>support@blooddonation.com</span>
          </div>
        </div>

        {/* Right: Social Media Icons */}
        <div className="flex gap-4 text-lg">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
            className="hover:scale-125 transition duration-300 hover:text-gray-200"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            className="hover:scale-125 transition duration-300 hover:text-gray-200"
          >
            <FaTwitter />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="hover:scale-125 transition duration-300 hover:text-gray-200"
          >
            <FaInstagram />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noreferrer"
            className="hover:scale-125 transition duration-300 hover:text-gray-200"
          >
            <FaYoutube />
          </a>
        </div>
      </div>
    </div>
  );
};

export default SocialHeader;
