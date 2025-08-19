import React from "react";
import { Outlet, useLocation } from "react-router";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import SocialNavbar from "../../Components/SocialNavbar/SocialNavbar";
import NavbarSwitcher from "../../Components/NavbarSwitcher/NavbarSwicher";
import { useEffect } from "react";
import { useState } from "react";

const MainLayout = () => {
  const location = useLocation();
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

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
            <Header theme={theme} toggleTheme={toggleTheme} />
          </div>
        ) : (
          <div className="bg-gradient-to-r from-[hsl(0,89%,11%)] to-[hsl(0,100%,50%)] lg:py-3">
            <Header theme={theme} toggleTheme={toggleTheme} />
          </div>
        )}
        <div className="relative z-9 top-0 left-0 right-0">
          <NavbarSwitcher theme={theme} toggleTheme={toggleTheme} />
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
