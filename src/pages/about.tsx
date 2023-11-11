import { Layout } from "../template";

export function About() {
    return (
        <Layout pageTitle="About">
            <div className="bg_website_blue w-full py-12 px-16">
                <div className="flex flex-col p-10  justify-center items-center h-full gap-y-2 ">
                    <h1 className="text-6xl text-slate-50 font-bold	tracking-wide">Know about <span className ="website_yellow">us!</span> </h1>
                    <p className="text-slate-50	 text-lg">Something we are doing ....</p>
                </div>
            </div>

            <div className="">
                <section className="container p-32 mx-auto max-w-[65%]">
                <div className=" text-center text-lg leading-8">
                        <h2 className="text-4xl font-bold tracking-wide	">About Us</h2>
                        <br></br>
                        <p className = "leading-7"> 
                            We are a passionate team of individuals dedicated to providing high-quality products and services to our customers. Our journey started with a simple idea: to make a difference in the world.
                            At our core, we value innovation, creativity, and customer satisfaction. We work tirelessly to ensure that our products and services meet the needs and expectations of our clients.                    
                            Join us on our mission to create a better future for all. We look forward to serving you!
                        </p>
                    </div>    
                </section>
            </div>


            <div className="bg_website_dblue">
                <section className="container p-32 mx-auto max-w-[65%]">
                    <div className=" text-center text-slate-50 text-lg leading-8">
                        <h2 className="text-4xl font-bold tracking-wide	">About Us</h2>
                        <br></br>
                        <p className = "leading-7"> 
                            We are a passionate team of individuals dedicated to providing high-quality products and services to our customers. Our journey started with a simple idea: to make a difference in the world.                   
                            At our core, we value innovation, creativity, and customer satisfaction. We work tirelessly to ensure that our products and services meet the needs and expectations of our clients.                       
                            Join us on our mission to create a better future for all. We look forward to serving you!
                        </p>
                    </div>    
                </section>
            </div>


        </Layout>
    );
}