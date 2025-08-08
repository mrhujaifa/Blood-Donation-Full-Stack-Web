import React from "react";
import { Outlet, useLocation } from "react-router";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import SocialNavbar from "../../Components/SocialNavbar/SocialNavbar";
import NavbarSwitcher from "../../Components/NavbarSwitcher/NavbarSwicher";
import Navbar from "../../Components/Header/Header";

const MainLayout = () => {
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  return (
    <div>
      <header className="absolute top-0 left-0 right-0">
        {isHomePage && (
          <div className="relative top-0 left-0 right-0 z-99">
            <SocialNavbar />
          </div>
        )}
        {isHomePage ? (
          <div>
            <Navbar />
          </div>
        ) : (
          <div className="bg-gradient-to-r from-[hsl(0,89%,11%)] to-[hsl(0,100%,50%)] lg:py-3">
            <Navbar />
          </div>
        )}
        <div className="relative z-9 top-0 left-0 right-0">
          <NavbarSwitcher />
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default MainLayout;
