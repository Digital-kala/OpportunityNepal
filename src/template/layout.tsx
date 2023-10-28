import { ReactElement } from "react";
import { NavBar, Footer } from "../components";

export function Layout({ children }: { children: ReactElement[] | ReactElement }) {
    return (
        <>
        <NavBar />
        <div className="min-h-screen" id="layout">
            <div className="justify-center flex items-center pt-[7vh]">
                <div className='space-y-8 w-full'>
                    {children}
                </div>
            </div>
        </div>
        <Footer />
        </>
    )
}