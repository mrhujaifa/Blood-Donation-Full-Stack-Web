import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import SwithcherNav from "./SwithcherNav";

const NavbarSwitcher = ({theme, toggleTheme}) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="fixed left-0 right-0 top-0 bg-gradient-to-r from-[hsl(0,89%,11%)] to-[hsl(0,100%,50%)] ">
        {scrolled && <SwithcherNav theme={theme} toggleTheme={toggleTheme} ></SwithcherNav>}
      </div>
    </>
  );
};

export default NavbarSwitcher;
