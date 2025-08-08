import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-white px-4 sm:px-6 lg:px-16 py-10 container mx-auto mt-30">
      <h2 className="text-3xl font-bold text-red-600 mb-4 text-center">Contact Us</h2>
      <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
        If you have any questions or would like to become a part of our blood donation network, please get in touch with us.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Contact Form */}
        <form className="bg-gray-50 p-6 rounded-xl shadow-lg space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Subject</label>
            <input
              type="text"
              placeholder="Subject"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              rows="5"
              placeholder="Write your message here..."
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 shadow-md"
          >
            Send Message
          </button>
        </form>

        {/* Contact Info & Map */}
        <div className="space-y-6">
          {/* Contact Info */}
          <div className="bg-gradient-to-r from-red-500 to-red-400 text-white p-6 rounded-xl shadow-lg space-y-4">
            <div className="flex items-center gap-4">
              <FaMapMarkerAlt className="text-xl" />
              <p>123 Blood Bank Road, Dhaka, Bangladesh</p>
            </div>
            <div className="flex items-center gap-4">
              <FaPhoneAlt className="text-xl" />
              <p>+880 1234 567890</p>
            </div>
            <div className="flex items-center gap-4">
              <FaEnvelope className="text-xl" />
              <p>info@blooddonation.org</p>
            </div>
          </div>

          {/* Map */}
          <div className="rounded-xl overflow-hidden shadow-lg h-89">
            <iframe
              title="map"
              width="100%"
              height="100%"
              loading="lazy"
              style={{ border: 0 }}
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3649.5401609892447!2d90.3671070148204!3d23.830561291736305!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7aaf674f01b%3A0x648f9c1b3bce0dc9!2sBlood%20Bank!5e0!3m2!1sen!2sbd!4v1629792840109!5m2!1sen!2sbd"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
