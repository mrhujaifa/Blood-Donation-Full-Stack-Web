import React from "react";
import { Link } from "react-router";
import { Droplet } from "lucide-react";
import { motion } from "framer-motion";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-white dark:from-gray-900 dark:to-gray-950 text-center px-6">
      {/* Animated Icon */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="flex items-center justify-center w-24 h-24 bg-red-100 dark:bg-red-900 rounded-full shadow-lg mb-6"
      >
        <Droplet className="w-14 h-14 text-red-600 dark:text-red-400 animate-pulse" />
      </motion.div>

      {/* Heading */}
      <motion.h1
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-7xl font-extrabold text-red-600 dark:text-red-500"
      >
        404
      </motion.h1>

      {/* Subheading */}
      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="mt-4 text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200"
      >
        Oops! Page Not Found
      </motion.h2>

      {/* Description */}
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="mt-2 max-w-lg text-gray-600 dark:text-gray-400"
      >
        Looks like the page you are trying to access doesn’t exist.  
        Don’t worry — let’s get you back on track to save lives ❤️.
      </motion.p>

      {/* Button */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="mt-8"
      >
        <Link
          to="/"
          className="px-6 py-3 rounded-2xl text-white font-medium bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          ⬅ Back to Home
        </Link>
      </motion.div>
    </div>
  );
}
