import React, { useState } from "react";

import { Link, NavLink } from "react-router";
import useAuth from "../../Hook/useAuth";
import { FaUser, FaTachometerAlt, FaSignOutAlt } from "react-icons/fa";
import { Settings } from "lucide-react";
import BloodDonation from "../../assets/blood-donation.png";
import { FaHandHoldingDollar } from "react-icons/fa6";

import "./Header.css";
import ToggleSwitch from "../DarkMode/DarkMode";

const Header = ({ theme, toggleTheme }) => {
  const { user, logOut } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogOut = () => {
    logOut();
    setDropdownOpen(false);
  };

  const navItems = (
    <>
      <li>
        <NavLink to="/" className="text-white font-medium">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/pending-requests" className="text-white font-medium">
          All Donor Requests
        </NavLink>
      </li>

      <li>
        <NavLink to="/contact" className="text-white font-medium">
          Contact
        </NavLink>
      </li>
      <li>
        <NavLink to="/blogs" className="text-white font-medium">
          Blog
        </NavLink>
      </li>

      {user && (
        <>
          <li>
            <NavLink
              to="/dashboard/donation-request"
              className="text-white font-medium"
            >
              Donation Requests
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard" className="text-white font-medium">
              Dashboard
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="w-full text-white  sticky top-0 z-50 ">
      <div className="navbar container mx-auto flex justify-between items-center py-2">
        {/* Left: Mobile Hamburger Menu */}
        <div className="lg:hidden">
          <div className="dropdown dropdown-start">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-3 bg-[#da0303] rounded-box shadow w-52 space-y-2"
            >
              {navItems}
              {!user && (
                <>
                  <li>
                    <Link
                      to="/signIn"
                      className="btn btn-sm btn-outline w-full"
                    >
                      Sign In
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/register"
                      className="btn btn-sm btn-outline w-full"
                    >
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>

        {/* Center: Logo */}
        <div className="flex justify-center items-center gap-1">
          <img
            src={BloodDonation}
            className="max-w-6 lg:max-w-8"
            alt="Blood Donation Logo"
          />
          <div>
            <span className="text-[#ff1a56] font-extrabold text-md lg:text-2xl logo-font">
              Blood
            </span>
            <span className="text-[#ff1a56] font-extrabold text-md lg:text-2xl logo-font">
              Donation
            </span>
          </div>
        </div>

        {/* Center Nav Items for Desktop */}
        {/* Center Nav Items for Desktop */}
        <div className="hidden lg:flex ">
          <ul className="flex justify-center gap-6 items-center">{navItems}</ul>
        </div>

        {/* Right Side: Auth buttons or Avatar */}
        <div className="flex items-center gap-2">
          {/* Mobile: Show Sign In/Register on right side if no user */}
          {!user && (
            <div className="lg:hidden flex gap-2">
              <Link
                to="/signIn"
                className="
    btn btn-sm btn-outline
    border-2 border-[#da0303]
    text-[#da0303]
    rounded-lg
    px-5 py-2
    transition
    duration-300
    ease-in-out
    hover:bg-red-600 hover:text-white
    focus:outline-none focus:ring-2 focus:ring-[#da0303] focus:ring-offset-2
    active:scale-95
    shadow-md
  "
              >
                Sign In
              </Link>
            </div>
          )}

          {/* Desktop: Show Sign In/Register on right if no user */}
          {!user && (
            <div className="hidden lg:flex gap-2">
              <Link
                to="/signIn"
                className="
    btn btn-sm btn-outline
    border-2 border-[#da0303]
    text-white
    rounded-lg
    px-5 py-2
    transition
    duration-300
    ease-in-out
    hover:bg-red-600 hover:text-white
    focus:outline-none focus:ring-2 focus:ring-[#da0303] focus:ring-offset-2
    active:scale-95
    shadow-md"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="
    btn btn-sm btn-outline
    border-2 border-[#da0303]
    text-white
    rounded-lg
    px-5 py-2
    transition
    duration-300
    ease-in-out
    hover:bg-red-600 hover:text-white
    focus:outline-none focus:ring-2 focus:ring-[#da0303] focus:ring-offset-2
    active:scale-95
    shadow-md"
              >
                Register
              </Link>
            </div>
          )}

          {user && (
            <div className="mr-5">
              {/* Large device button */}
              <Link to={"/donate-funding"}>
                <button className="hidden lg:inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white px-4 py-2 rounded-md shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
                  <FaHandHoldingDollar
                    size={20}
                    className="text-white drop-shadow-sm animate-pulse"
                  />
                  <span className="text-sm font-semibold tracking-wide">
                    Donate
                  </span>
                </button>
              </Link>

              {/* Small device button */}
              <Link to={"/donate-funding"}>
                <button className="inline-flex lg:hidden items-center gap-1 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white px-3 py-1.5 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
                  <FaHandHoldingDollar
                    size={16}
                    className="text-white animate-pulse"
                  />
                  <span className="text-xs font-medium">Donate</span>
                </button>
              </Link>
            </div>
          )}

          {/* User avatar dropdown */}
          {user && (
            <div className="relative">
              <div
                className="avatar cursor-pointer"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <div className="lg:w-11 w-7 rounded-full ring ring-white ring-offset-base-100 ring-offset-2">
                  <img
                    src={
                      user.photoURL || "https://i.ibb.co/S4Hc49F9/user-1.png"
                    }
                    alt="User Avatar"
                    className=" lg:max-w-10 max-w-7"
                  />
                </div>
              </div>

              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-72 bg-white text-black shadow-xl rounded-xl z-50 transition-all duration-300 animate-fade-in">
                  <ul className="p-4 space-y-3 text-base">
                    <li>
                      <Link
                        to="/profile"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded-md"
                      >
                        <FaUser className="text-blue-600" /> My Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/dashboard"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded-md"
                      >
                        <FaTachometerAlt className="text-green-600" /> Dashboard
                      </Link>
                    </li>
                    <li>
                      <button className="flex items-center gap-3 text-gray-700 hover:bg-gray-100 w-full p-2 rounded-md">
                        <Settings /> Setting
                      </button>
                    </li>

                    <li className="mx-1">
                      {/* Theme Toggle */}
                      <ToggleSwitch theme={theme} toggleTheme={toggleTheme} />
                    </li>
                    <li>
                      <button
                        onClick={handleLogOut}
                        className="flex items-center gap-3  text-red-600 hover:bg-red-50 w-full p-2 rounded-md"
                      >
                        <FaSignOutAlt size={23}/> Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
