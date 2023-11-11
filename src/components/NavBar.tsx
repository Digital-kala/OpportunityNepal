import { useEffect, useState } from "react";
import { handleNavLinkClick, redirectHome } from "../pages/utils";

type SectionTitleProps = {
    title: string,
    url: string,
    active?: boolean,
}

const movingNavStyles = {
    boxShadow: '0px 0px 8px  black',
    offset: 'x 0',
}

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
        const rootDiv = document.getElementById('root');

        if (rootDiv) {
            const scrollTop = rootDiv.scrollTop;
            if (scrollTop === 0) {
                setIsAtPageTop(true);
            } else if (lastScrollTop < scrollTop) {
                setIsAtPageTop(false);
                const navBar = document.getElementById("navbar")
                if (navBar) {
                    if (navBar.classList.contains('show-on-scroll')) {
                        document.getElementById("navbar")?.classList.replace('show-on-scroll', 'hide-on-scroll')
                    } else {
                        navBar.classList.add('hide-on-scroll')
                    }
                }

            } else {
                setIsAtPageTop(false);
                document.getElementById("navbar")?.classList.replace('hide-on-scroll', 'show-on-scroll')
            }
            lastScrollTop = scrollTop;
        }
    };

    useEffect(() => {
        const rootDiv = document.getElementById('root');
        if (rootDiv) {
            rootDiv.addEventListener('scroll', handleScroll);
            return () => {
                rootDiv.removeEventListener('scroll', handleScroll);
            };
        }
    }, []);

    return (
        <div className="fixed top-0 w-full hidden md:block transition-all duration-200 ease-in-out" id="navbar" style={isAtPageTop ? {} : movingNavStyles}>
            <nav className="flex items-center justify-center py-3 gap-5">
                <NavSection title={'Home'} url={''} active={pageTitle === "Home"} />
                <NavSection title={'Search Opportunities'} url={'opportunity'} active={pageTitle === "Opportunity"} />
                <NavSection title={'About Us'} url={'about'} active={pageTitle === "About"} />
            </nav>
        </div>
    )
}

function NavSection({ title, url, active }: SectionTitleProps) {

    function redirectPage(url: string) {
        if (url === "") {
            redirectHome();
        } else {
            handleNavLinkClick(url);
        };
    }

    return (
        <div
            className="gap-1.5 mr-8 flex cursor-pointer p-2 text-sm "
            onClick={() => redirectPage(url)} >
            {active
                ? <p className="whitespace-nowrap sfmono-reg font-semibold hover-underline-animation text-sky-500">{title}</p>
                : <p className="whitespace-nowrap sfmono-reg font-semibold hover-underline-animation hover:text-sky-500">{title}</p>
            }
        </div>
    )
}