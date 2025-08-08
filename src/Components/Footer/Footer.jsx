import { FaInstagram, FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import { BsChevronRight } from "react-icons/bs";
import BloodDonationLogo from "../BloodDonationLogo/BloodDonationLogo";

const Footer = () => {
  return (
    <footer className="bg-[#1a1a1a] text-white py-14 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand Section */}
        <div>
          <BloodDonationLogo></BloodDonationLogo>
          <p className="text-sm text-gray-300 leading-relaxed mt-8">
            Sit leo non vestibulum cras ut nunc. Commodo ornare ultrices ipsum dolor parturient sem fusce.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-6 text-xl text-red-500">
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaYoutube /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-3 text-sm text-gray-300">
            <li className="flex items-center gap-2"><BsChevronRight className="text-red-500" /> About Us</li>
            <li className="flex items-center gap-2"><BsChevronRight className="text-red-500" /> Events</li>
            <li className="flex items-center gap-2"><BsChevronRight className="text-red-500" /> Contact Us</li>
            <li className="flex items-center gap-2"><BsChevronRight className="text-red-500" /> Volunteers</li>
            <li className="flex items-center gap-2"><BsChevronRight className="text-red-500" /> FAQs</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
          <ul className="space-y-3 text-sm text-gray-300">
            <li className="flex items-center gap-2"><FiPhone className="text-red-500" /> +98 765 43210</li>
            <li className="flex items-center gap-2"><FiMail className="text-red-500" /> Donors@support.com</li>
            <li className="flex items-center gap-2"><FiMapPin className="text-red-500" /> 130 Anywhere St, Tomsk, Rusia 238795</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <div className="bg-[#2d2d2d] rounded-lg p-5">
            <h3 className="text-lg font-semibold mb-2">Newsletter</h3>
            <p className="text-sm text-gray-300 mb-4">
              Subscribe to Our Newsletter to receive the newest updates and info.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Email"
                className="w-full p-2 rounded-l-md outline-none text-black"
              />
              <button className="bg-red-600 text-white px-4 py-2 rounded-r-md">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="mt-10 border-t border-gray-700 pt-4 text-center text-sm text-gray-400">
        Copyright © 2025 Donors, All rights reserved.
        <br />
        Present by <span className="text-white">CreedCreatives</span>
      </div>
    </footer>
  );
};

export default Footer;
