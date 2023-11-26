import React, { useEffect, useState } from "react";
import { handleNavLinkClick,  handleURLClick,
  redirectHome } from "../pages/utils";

import { FaHome, FaSearch } from "react-icons/fa";
import { HiMiniUserGroup } from "react-icons/hi2";
import { IconType } from "react-icons";
import Logo from "../assets/icon.png"; // Import your logo image path

export const opportunityFormURL =
  "https://formfacade.com/public/113161832885328299725/all/form/1FAIpQLSe101GEUyjj6IVtN_Yx-xammIvkgEME92OCcRBb-YS8P-c1UA";

type SectionTitleProps = {
  title: string;
  url: string;
  active?: boolean;
  mobileIcon: IconType;
};

const movingNavStyles = {
  boxShadow: "0px 0px 8px  black",
  offset: "x 0",
};

type NavSectionProps = {
  title: string;
  url: string;
  isSelected: boolean;
  onItemClick: (url: string) => void;
};

export function NavBar({ pageTitle }: { pageTitle?: string }) {
  const [isAtPageTop, setIsAtPageTop] = useState(true);
  let lastScrollTop = 0;

  const handleScroll = () => {
    const rootDiv = document.getElementById("root");

    if (rootDiv) {
      const scrollTop = rootDiv.scrollTop;
      if (scrollTop === 0) {
        setIsAtPageTop(true);
      } else if (lastScrollTop < scrollTop) {
        setIsAtPageTop(false);
        const navBar = document.getElementById("navbar");
        if (navBar) {
          if (navBar.classList.contains("show-on-scroll")) {
            document
              .getElementById("navbar")
              ?.classList.replace("show-on-scroll", "hide-on-scroll");
          } else {
            navBar.classList.add("hide-on-scroll");
          }
        }
      } else {
        setIsAtPageTop(false);
        document
          .getElementById("navbar")
          ?.classList.replace("hide-on-scroll", "show-on-scroll");
      }
      lastScrollTop = scrollTop;
    }
  };

  useEffect(() => {
    const rootDiv = document.getElementById("root");
    if (rootDiv) {
      rootDiv.addEventListener("scroll", handleScroll);
      return () => {
        rootDiv.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  return (
    <div
      className="fixed top-0 w-full h-[12vh] md:h-[8vh] transition-all duration-200 ease-in-out"
      id="navbar"
      style={isAtPageTop ? {} : movingNavStyles}
    >
      

<nav className="bg-white fixed w-full z-20 top-0 start-0 border-b border-gray-200 ">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
  <a href="" className="flex items-center space-x- rtl:space-x-reverse">
      <img src={Logo} className="h-10" alt="Nepalese Scholarship Hub Logo"></img>
      <span className="self-center hidden md:flex font-semibold whitespace-nowrap px-2 md-text-xl">Nepalese Scholarship Hub</span>
  </a>
  <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
      <button type="button" className="text-white bg_website_blue hover:bg_website_dblue focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center :bg_website_dblue " onClick={() => handleURLClick(opportunityFormURL)}>Post an Opportunity</button>


      <button
  data-collapse-toggle="navbar-sticky"
  type="button"
  className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
  aria-controls="navbar-sticky"
  aria-expanded="false"
  onClick={() => {
    const navbarSticky = document.getElementById("navbar-sticky");
    if (navbarSticky) {
      navbarSticky.classList.toggle("hidden");
    }
  }}
>
  <span className="sr-only">Open main menu</span>
  <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
  </svg>
</button>
  </div>
  <div className="items-center md:justify-between hidden w-full md:flex md:w-auto md:order-1 " id="navbar-sticky">
  <NavSection
            title={"Home"}
            url={""}
            active={pageTitle === "Home"}
            mobileIcon={FaHome}
          />
          <NavSection
            title={"Search Opportunities"}
            url={"opportunity"}
            active={pageTitle === "Opportunity"}
            mobileIcon={FaSearch}
          />
          <NavSection
            title={"About Us"}
            url={"about"}
            active={pageTitle === "About"}
            mobileIcon={HiMiniUserGroup}
          />
  </div>
  </div>
</nav>



    </div>
  );
}

function NavSection({ title, url, active, mobileIcon }: SectionTitleProps) {
  function redirectPage(url: string) {
    if (url === "") {
      redirectHome();
    } else {
      handleNavLinkClick(url);
    }
  }

  const barStyle = active ? "text-sky-500" : "hover:text-sky-500";

  return (
    <div
      className={
        "gap-1.5 mr-0 md:mr-8 flex flex-col cursor-pointer p-2 text-base md:text-base md:justify-center justify-end text-end justify-items-end items-center " +
        barStyle
      }
      onClick={() => redirectPage(url)}
    >
      {React.createElement(mobileIcon, {
        className: "block hidden  md:hidden w-6 h-8",
      })}
      <p className=" justify-items-end whitespace-nowrap sfmono-reg font-semibold hover-underline-animation">
        {title}
      </p>
    </div>
  );
}
