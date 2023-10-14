export function Footer() {
    return (
        <div className="items-center space-y-4 mt-[15vh] md:mt-[25vh] mb-[15vh] md:mb-[5vh]" id="footer">
            <div className="flex justify-center ">
                <div className="sfmono-reg text-2xs md:text-xs max-w-4xl text-center ">
                    {new Date().getFullYear()} Opportunity Nepal © All Rights Reserved
                </div>
            </div>
        </div>
    )
}