import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import './khan.css'

const ContactUs = () => {
  return (
    <div className="bg-1 w-full py-16 px-4">
      <div className="container mx-auto mb-12">
        <h2 className="text-4xl font-bold text-[#ff1a56] mb-4">Contact Us</h2>
        <p className="text-gray-600 text-lg">
          Got a question, need help or want to donate? Feel free to reach out —
          we're here for you!
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 container mx-auto">
        {/* Contact Form */}
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">
            Send a Message
          </h3>
          <form className="space-y-5">
            <input
              type="text"
              placeholder="Your Name"
              className="input input-bordered w-full"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="input input-bordered w-full"
            />
            <input
              type="text"
              placeholder="Subject"
              className="input input-bordered w-full"
            />
            <textarea
              className="textarea textarea-bordered w-full h-32"
              placeholder="Your Message"
            ></textarea>
            <button className="px-6 py-3 text-white font-semibold rounded-lg transition duration-300 shadow-md hover:shadow-[0_0_15px_#ff1a56] bg-[#ff1a56] hover:bg-[#e0134c]">
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="bg-white p-8 rounded-xl shadow-lg space-y-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Get in Touch
          </h3>
          <div className="flex items-center gap-4">
            <FaPhoneAlt className="text-[#ff1a56] text-2xl" />
            <p className="text-gray-700 text-lg">+880 123 456 7890</p>
          </div>
          <div className="flex items-center gap-4">
            <FaEnvelope className="text-[#ff1a56] text-2xl" />
            <p className="text-gray-700 text-lg">support@bloodcare.com</p>
          </div>
          <div className="flex items-center gap-4">
            <FaMapMarkerAlt className="text-[#ff1a56] text-2xl" />
            <p className="text-gray-700 text-lg">
              Dhanmondi, Dhaka, Bangladesh
            </p>
          </div>

          {/* Optional Map Embed */}
          <div className="mt-6 rounded overflow-hidden">
            <iframe
              title="map"
              src="https://maps.google.com/maps?q=dhaka%20bangladesh&t=&z=13&ie=UTF8&iwloc=&output=embed"
              className="w-full h-48 border-0"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
