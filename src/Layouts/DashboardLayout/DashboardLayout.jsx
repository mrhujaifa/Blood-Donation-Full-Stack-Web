import React, { useState } from "react";
import { Outlet } from "react-router";
import { FaBars, FaTimes } from "react-icons/fa";
import Sidebar from "../../Pages/Users/slider/Sidebar";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{
          backgroundImage: `url('https://i.postimg.cc/T3X9zsm6/colorful-abstract-nebula-space-background.jpg')`,
        }}
      />
      <div className="absolute inset-0 bg-black opacity-30 z-0" />

      {/* Layout Container */}
      <div className="flex h-full relative z-10">
        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0  bg-opacity-60 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div
          className={`
            fixed z-50 inset-y-0 left-0 bg-white/10 backdrop-blur-md shadow-lg transition-all duration-300
            ${
              sidebarOpen
                ? "translate-x-0 opacity-100"
                : "-translate-x-full opacity-0"
            }
            md:translate-x-0 md:opacity-100 md:static md:inset-0
            ${sidebarCollapsed ? "md:w-20" : "md:w-64"}
          `}
        >
          <Sidebar
            collapsed={sidebarCollapsed}
            setSidebarCollapsed={setSidebarCollapsed}
          />
        </div>

        {/* Main Content */}
        <div
          className={`flex-1 flex flex-col transition-all duration-300 ease-in-out
          ${sidebarCollapsed ? "md:ml-20" : "md:ml-20"}`}
        >
          {/* Mobile Header */}
          <header className="w-full bg-gradient-to-r from-[hsl(0,89%,11%)] to-[hsl(0,100%,50%)] text-white p-4 flex items-center justify-between md:hidden shadow-md">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-2xl"
            >
              {sidebarOpen ? <FaTimes /> : <FaBars />}
            </button>
            <h1 className="text-lg font-semibold">Dashboard</h1>
          </header>

          {/* Outlet Content */}
          <main className="flex-1 overflow-y-auto py-6 md:px-8 md:py-8">
            <div className="rounded-lg min-h-[80vh] ">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
