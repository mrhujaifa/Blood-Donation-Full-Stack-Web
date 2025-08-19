import React from "react";
import { MdDarkMode, MdOutlineDarkMode } from "react-icons/md";

export default function DarkModeToggle({ theme, toggleTheme }) {
  return (
    <div className="flex items-center gap-3">
      {/* Label */}
      <span className="flex items-center gap-1 text-sm font-medium">
        <MdOutlineDarkMode size={25} />
        Dark Mode
      </span>

      {/* Toggle */}
      <label className="relative inline-flex items-center cursor-pointer">
        {/* Hidden input */}
        <input
          type="checkbox"
          checked={theme === "dark"}
          onChange={toggleTheme}
          className="sr-only peer"
        />

        {/* Track */}
        <div
          className="
            w-14 h-8 bg-gray-300 rounded-full
            peer-checked:bg-red-600 transition-colors duration-500
          "
        ></div>

        {/* Knob */}
        <span
          className="
            absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md 
            flex items-center justify-center
            transition-all duration-500
            peer-checked:translate-x-6
          "
        >
          {theme === "dark" ? (
            // Moon icon
            <svg
              className="w-4 h-4 text-red-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M21 12.79A9 9 0 0 1 12.79 21a7 7 0 1 0 8.21-8.21z" />
            </svg>
          ) : (
            // Sun icon
            <svg
              className="w-4 h-4 text-yellow-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.8L6.76 4.84zM1 13h3v-2H1v2zm10-9h2V1h-2v3zm9.66.45l-1.41-1.41-1.8 1.79 1.42 1.42 1.79-1.8zM17 13h3v-2h-3v2zm-5 8h2v-3h-2v3zm7.24-3.16l1.79 1.8 1.41-1.41-1.8-1.79-1.4 1.4zM12 6a6 6 0 100 12A6 6 0 0012 6z" />
            </svg>
          )}
        </span>
      </label>
    </div>
  );
}
