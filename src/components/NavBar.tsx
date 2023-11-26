import React, { useEffect, useState } from "react";
import { handleNavLinkClick, redirectHome } from "../pages/utils";

import { FaHome, FaSearch } from "react-icons/fa";
import { HiMiniUserGroup } from "react-icons/hi2";
import { IconType } from "react-icons";

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
      <nav className="flex items-center justify-center py-3 gap-5 ">
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
        "gap-1.5 mr-0 md:mr-8 flex flex-col cursor-pointer p-2 text-2xs md:text-sm justify-center items-center " +
        barStyle
      }
      onClick={() => redirectPage(url)}
    >
      {React.createElement(mobileIcon, {
        className: "block md:hidden w-6 h-8",
      })}
      <p className="whitespace-nowrap sfmono-reg font-semibold hover-underline-animation">
        {title}
      </p>
    </div>
  );
}
