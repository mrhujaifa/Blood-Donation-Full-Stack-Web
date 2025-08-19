import { LocateFixed } from "lucide-react";
import { HeartPulse } from "lucide-react";
import {
  MdBloodtype,
  MdContentCopy,
  MdOutlineBloodtype,
  MdOutlineContentPaste,
} from "react-icons/md";
import { FaRegNewspaper, FaUsers } from "react-icons/fa";

import {
  ChevronLeft,
  ChevronRight,
  Home,
  Users,
  Droplet,
  User,
} from "lucide-react";
import { Link } from "react-router";
import useAdmin from "../../../Hook/useAdmin";
import { TableOfContents } from "lucide-react";
import useVolunteer from "../../../Hook/useVolunteer";
import { IoStatsChartSharp } from "react-icons/io5";

const Sidebar = ({ collapsed, setSidebarCollapsed }) => {
  const [isAdmin] = useAdmin();
  const [isVolunteer] = useVolunteer();

  console.log(isVolunteer);
  const navItem = (
    <>
      <li>
        <Link
          to="/dashboard"
          className="flex items-center gap-3 px-3 py-2 rounded hover:bg-red-600 cursor-pointer text-white font-medium"
        >
          <Home size={25} />
          {!collapsed && "Home"}
        </Link>
      </li>
      <li>
        <Link
          to="/"
          className="flex items-center gap-3 px-3 py-2 rounded hover:bg-red-600 cursor-pointer text-white font-medium"
        >
          <Users size={25} />
          {!collapsed && "Donors"}
        </Link>
      </li>
      <li>
        <Link
          to="/dashboard/donation-request"
          className="flex items-center gap-3 px-3 py-2 rounded hover:bg-red-600 cursor-pointer text-white font-medium"
        >
          <MdOutlineBloodtype size={25} />
          {!collapsed && "Donation Requests"}
        </Link>
      </li>
      <li>
        <Link
          to="/dashboard/my-donation-requests"
          className="flex items-center gap-3 px-3 py-2 rounded hover:bg-red-600 cursor-pointer text-white font-medium"
        >
          <Droplet size={25}></Droplet>
          {!collapsed && "My Donation Requests"}
        </Link>
      </li>
      <li>
        <Link
          to="/dashboard/profile"
          className="flex items-center gap-3 px-3 py-2 rounded hover:bg-red-600 cursor-pointer text-white font-medium"
        >
          <User size={25} />
          {!collapsed && "Profile"}
        </Link>
      </li>
      <li>
        <Link
          to="/dashboard/overviewStats"
          className="flex items-center gap-3 px-3 py-2 rounded hover:bg-red-600 cursor-pointer text-white font-medium"
        >
          <IoStatsChartSharp size={25} />
          {!collapsed && "Overview Stats"}
        </Link>
      </li>

      {/* volunteer nav */}

      {isVolunteer || isAdmin ? (
        <>
          <li>
            <Link
              to="/dashboard/volunteer/home"
              className="flex items-center gap-3 px-3 py-2 rounded hover:bg-red-600 cursor-pointer text-white font-medium"
            >
              <Home size={25} />
              {!collapsed && "Volunter Dashboard Home"}
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/volunteer/all-blood-donation-request"
              className="flex items-center gap-3 px-3 py-2 rounded hover:bg-red-600 cursor-pointer text-white font-medium"
            >
              <MdBloodtype size={25} className="text-white " />
              {!collapsed && "Volunte All Blood Donation"}
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/volunteer/content-management"
              className="flex items-center gap-3 px-3 py-2 rounded hover:bg-red-600 cursor-pointer text-white font-medium"
            >
              <FaRegNewspaper size={25} className="text-white " />
              {!collapsed && "Volunte Content Management"}
            </Link>
          </li>
        </>
      ) : (
        ""
      )}
      {isAdmin ? (
        <div>
          <li>
            <Link
              to="/dashboard/admin/home"
              className="flex items-center gap-3 px-3 py-2 rounded hover:bg-red-600 cursor-pointer text-white font-medium"
            >
              <Home size={25} />
              {!collapsed && "Admin Dashboard Home"}
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/admin/all-users"
              className="flex items-center gap-3 px-3 py-2 rounded hover:bg-red-600 cursor-pointer text-white font-medium"
            >
              <FaUsers size={25} />
              {!collapsed && "Admin Dashboard All-Users"}
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/admin/all-blood-donation-request"
              className="flex items-center gap-3 px-3 py-2 rounded hover:bg-red-600 cursor-pointer text-white font-medium"
            >
              <MdBloodtype size={25} className="text-white " />
              {!collapsed && "All Blood Donation Request"}
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/admin/content-management"
              className="flex items-center gap-3 px-3 py-2 rounded hover:bg-red-600 cursor-pointer text-white font-medium"
            >
              <FaRegNewspaper size={25} className="text-white " />
              {!collapsed && "Content Management"}
            </Link>
          </li>
        </div>
      ) : (
        ""
      )}
    </>
  );

  return (
    <div
      className={`h-full transform-stroke  p-4 flex flex-col relative ${
        collapsed ? "w-25" : "w-80"
      } bg-red-700`}
    >
      <ul className="flex flex-col gap-2">{navItem}</ul>

      <button
        onClick={() => setSidebarCollapsed(!collapsed)}
        className="bg-white  absolute right-0 top-1/2 -translate-y-1/2 shadow rounded-lg p-1 text-red-600 hover:bg-red-250 transition-all duration-300"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? <ChevronRight size={22} /> : <ChevronLeft size={22} />}
      </button>
    </div>
  );
};

export default Sidebar;
