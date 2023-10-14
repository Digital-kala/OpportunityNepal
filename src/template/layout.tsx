import { ReactElement } from "react";
import { NavBar, Footer } from "../components";

export function Layout({ children }: { children: ReactElement[] | ReactElement }) {
    return (
        <>
        <NavBar />
        <div className="min-h-screen mx-8" id="layout">
            <div className="justify-center flex items-center pt-[15vh]">
                <div className='space-y-8 w-full'>
                    {children}
                </div>
            </div>
        </div>
        <Footer />
        </>
    )
}