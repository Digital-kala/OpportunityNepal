import { Layout } from "../template";
import labbi from "../assets/team/Labbi.png";
import aastha from "../assets/team/Aastha.png";
import dipa from "../assets/team/Dipa.png";
import anon from "../assets/team/Anon.png";

// Sample team data (you can replace this with your actual team data)
const teamMembers = [
  { name: "Aastha Acharya", role: "Core Team", image: aastha },
  { name: "Dipa Rai", role: "Core Team", image: dipa },
  { name: "Labbi Karmacharya", role: "Core Team", image: labbi },
  { name: "Animesh Singh Basnet", role: "Web Developer", image: anon },
  { name: "Unika Karmacharya", role: "Volunteering Leader", image: anon },
  { name: "Arpana Dhakal", role: "Volunteer", image: anon },
  { name: "Chandraa Kumari Pandey", role: "Volunteer", image: anon },
  { name: "Kriti Subedi", role: "Volunteer", image: anon },
  { name: "Raisha Pradhananga", role: "Volunteer", image: anon },
  { name: "Sanskar Gyanwali", role: "Volunteer", image: anon },
];

export function About() {
  return (
    <Layout pageTitle="About">
      <div className="bg_website_ddblue py-12 md:px-16 pt-[20vh] pb-2 md:pb-[4vh] flex flex-col items-center">
        <h1 className="text-4xl md:text-6xl text-slate-50 font-bold tracking-wide max-sm">
          Know about <span className="website_yellow">us!</span>{" "}
        </h1>
        <p className="text-slate-50 text-sm md:text-lg">Something we are doing ....</p>
      </div>

      <section className="container mx-auto px-10 py-20 md:p-32">
        <div className="text-center text-lg leading-8">
          <h2 className="text-3xl md:text-4xl font-bold tracking-wide">Our Vision</h2>
          <br />
          <p className="leading-7">
            <h3 className="website_dblue">
              <b>One Stop Scholarship Hub for Nepalese Students</b>
            </h3>
            Digital Kala is leading the charge in revolutionizing educational opportunities for Nepalese students with the introduction of our one-stop scholarship platform. Our mission is clear: to establish a comprehensive resource that not only aggregates national and international scholarships but also acts as a catalyst for empowerment, opening doors to a brighter future.
          </p>
        </div>
      </section>

      <div className="bg_website_dblue text-white">
        <section className="container mx-auto px-10 py-20 md:p-32">
          <div className="text-center text-lg leading-8">
            <h2 className="text-3xl md:text-4xl font-bold tracking-wide">About Digital Kala</h2>
            <br />
            <p className="leading-7">
              In a world increasingly interconnected and driven by technology, the need for digital literacy and awareness has never been more crucial. We are excited to introduce the Digital Kala initiative, an endeavor that aims to empower young minds with vital digital literacy skills. In the age of rapid technological advancements, ensuring that students are well-equipped to navigate the digital world responsibly is paramount. Digital Kala strives to achieve this by imparting knowledge and fostering awareness regarding digital safety, responsible gadget usage, and the limitless potential that the digital realm offers.
            </p>
          </div>
        </section>
      </div>

      {/* Team Section */}
      <section className="bg-gray-100 py-12 ">
        <div className="container mx-auto px-4 md:px-10 lg:px-28 justify-center">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-14">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white p-6 rounded-md shadow-md">
                <img src={member.image} alt={member.name} className="w-full h-56 object-cover rounded-md mb-5" />
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-md text-gray-500">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
