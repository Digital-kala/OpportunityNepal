import { Layout } from "../template";
import { useEffect, useState } from "react";
import { loadingSpinner } from "../components/LoadingSpinner";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import {
  formatDate,
  handleNavLinkClick,
  handleURLClick,
  parseDateTimeString,
} from "./utils";
import PublicGoogleSheetsParser from "public-google-sheets-parser";

import bannerImg1 from "../assets/banner1.png";

import bannerImg from "../assets/banner.png";

export type OpportunitySummary = {
  id: number;
  name: string;
  opportunityId: number;
};

export type OpportunityTypes = "national" | "international";
export type OpportunityProp = {
  id: number;
  title: string;
  type: OpportunityTypes;
  organization: string;
  createdDate: Date;
  deadlineDate: Date;
  description: string;
  pictureURL: string;
  educationLevel: string;
};

export const spreadsheetId = "1sa2EtdgIujZIpl8FWFGWn1zMbFg-T51xfkBh_Zq67Xc";
export const options = { sheetName: "data", useFormat: true };
export const opportunityFormURL =
  "https://formfacade.com/public/113161832885328299725/all/form/1FAIpQLSe101GEUyjj6IVtN_Yx-xammIvkgEME92OCcRBb-YS8P-c1UA";

export function Home() {
  const [opportunities, setOpportunities] = useState<Array<OpportunityProp>>(
    []
  );
  const [searchOpportunities, setSearchOpportunities] = useState<
    Array<OpportunitySummary>
  >([]);
  const [upcomingOpportunities, setUpcomingOpportunities] = useState<
    Array<OpportunityProp>
  >([]);
  const [recentlyAddedOpportunities, setRecentlyAddedOpportunities] = useState<
    Array<OpportunityProp>
  >([]);

  useEffect(() => {
    const parser = new PublicGoogleSheetsParser(spreadsheetId, options);
    const data = [] as OpportunityProp[];

    parser
      .parse()
      .then((opportunities: any) => {
        opportunities.forEach((opportunity: any) => {
          data.push({
            ...opportunity,
            id: parseInt(opportunity.id),
            type: opportunity.type.toLowerCase() as OpportunityTypes,
            createdDate: opportunity.createdDate
              ? parseDateTimeString(opportunity.createdDate)
              : undefined,
            deadlineDate: opportunity.deadlineDate
              ? new Date(opportunity.deadlineDate)
              : undefined,
          });
        });
        setOpportunities(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (opportunities.length === 0) return;

    // find and add search opportunities
    const searchOpportunities = opportunities.map((opportunity, idx) => {
      return {
        id: idx,
        name: opportunity.title,
        opportunityId: opportunity.id,
      } as OpportunitySummary;
    });
    setSearchOpportunities(searchOpportunities);

    // find and add upcoming opportunities
    let upcomingOppor = opportunities.filter(
      (opportunity) =>
        opportunity.deadlineDate &&
        opportunity.deadlineDate >= new Date() &&
        opportunity.createdDate instanceof Date
    );
    if (upcomingOppor.length > 1) {
      upcomingOppor = upcomingOppor.sort((a, b) =>
        a.deadlineDate < b.deadlineDate ? -1 : 1
      );
    }
    setUpcomingOpportunities(upcomingOppor.slice(0, 10));

    // find and add recently added opportunities
    let recentlyAddedOppor = opportunities.filter(
      (opportunity) =>
        opportunity.createdDate &&
        opportunity.createdDate instanceof Date &&
        opportunity.deadlineDate > new Date()
    );
    if (recentlyAddedOppor.length > 1) {
      recentlyAddedOppor = recentlyAddedOppor.sort((a, b) =>
        a.createdDate < b.createdDate ? -1 : 1
      );
    }
    setRecentlyAddedOpportunities(recentlyAddedOppor.slice(0, 10));
  }, [opportunities.length]);

  const formatResult = (item: OpportunitySummary) => {
    return (
      <>
        <span style={{ display: "block", textAlign: "left" }}>{item.name}</span>
      </>
    );
  };

  // When the sheet is not loaded, show a loading spinner
  if (opportunities.length === 0 || searchOpportunities.length === 0)
    return loadingSpinner();

  return (
    <Layout pageTitle="Home">
      <div
        className="bg-gray-200 w-full pt-[20vh] pb-2 md:pb-[4vh] px-16 shadow-md"
        style={{
          backgroundImage: `url(${bannerImg1})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div
          className="flex flex-col p-4 justify-center items-center h-full gap-y-4 mb-4 font-bold"
          style={{ textShadow: "0px 0 8px black" }}
        >
          <h1 className=" text-3xl md:text-5xl tracking-wide text-center">
            <span className="text-yellow-500">Explore</span>
            <span className="text-white"> New Opportunities!</span>
          </h1>
          <p className="text-gray-200 text-lg drop-shadow-md cartoonify">Or</p>
          <button
            className="px-4 py-2 text-md bg-gray-200/95 rounded-lg website_blue"
            style={{ zIndex: 2, boxShadow: "0px 0 2px black" }}
            onClick={() => handleURLClick(opportunityFormURL)}
          >
            Post An Opportunity
          </button>
        </div>

        <div
          className="flex justify-center items-center w-full"
          style={{
            padding: '1rem 0',
          }}
        >
          <div
            className="pb-5"
            style={{
              width: '90%', 
              maxWidth: '900px', 
            }}
          >
          <ReactSearchAutocomplete
            items={searchOpportunities}
            onSearch={() => {}}
            onHover={() => {}}
            onSelect={(e) =>
              handleNavLinkClick(`#/opportunity/${e.opportunityId}`)
            }
            onFocus={() => {}}
            autoFocus
            formatResult={formatResult}
            styling={{ zIndex: 100 }}
          />

          </div>
        </div>

        
      </div>

      <div className="w-full pt-10 pb-4 px-4">
        <h1 className="pb-2 font-bold text-3xl text-slate-800 text-center drop-shadow-md z-0">
          Upcoming Opportunties
        </h1>
        <div className="flex p-y-4 overflow-x-auto">
          {upcomingOpportunities.map((opportunity, index) => {
            return OpportunityCard(index, opportunity, "upcoming");
          })}
        </div>
      </div>

      <div className="w-full pt-5 pb-8 px-4">
        <h1 className="pb-2 font-bold text-3xl text-slate-800 text-center drop-shadow-md">
          Recently Added
        </h1>
        <div className="flex p-y-4 overflow-x-auto">
          {recentlyAddedOpportunities.sort((a, b) =>
            a.createdDate > b.createdDate ? -1 : 1
          ).map((opportunity, index) => {
            return OpportunityCard(index, opportunity, "recent");
          })}
        </div>
      </div>
    </Layout>
  );
}

export function OpportunityCard(
  key: number,
  opportunity: OpportunityProp,
  cardtype: "upcoming" | "recent",
  source?: string
) {
  const maxDescriptionLength = 150;

  let image = opportunity.pictureURL;
  if (image && image.length > 0) {
    let id = "";
    if (image.includes("id="))
      id = image.substring(image.indexOf("id=") + 3, image.length);
    else id = image.substring(image.indexOf("/d/") + 3, image.indexOf("/view"));

    image = `https://drive.google.com/thumbnail?id=${id}&sz=w1000`;
  } else {
    image = bannerImg;
  }

  let defaultClass =
    "flex flex-col flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 py-8";
  if (source === "opportunity") defaultClass = "flex flex-col py-4 ";

  return (
    <div
      className={defaultClass}
      key={key}
      onClick={() => handleNavLinkClick(`#/opportunity/${opportunity.id}`)}
    >
      <button className="w-full h-full rounded-lg shadow-md border-0 flex flex-col">
        <div
          className="bg-gray-200 h-64 w-full rounded-lg shadow-sm overflow-hidden"
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundColor: "white",
          }}
        />
        <div className="flex flex-col p-4 w-full">
          <h1 className="text-xl font-semibold text-slate-800 py-3">
            {opportunity.title}
          </h1>
          <p className="bg-slate-200/50 py-2 rounded-lg mb-5 text-sm">
            {cardtype === "upcoming"
              ? "Deadline : " + formatDate(opportunity.deadlineDate)
              : "Added on " + formatDate(opportunity.createdDate)}
          </p>

          <p className="text-gray-800 text-justify px-4 pb-2 text-sm">
            {opportunity.description.length > maxDescriptionLength
              ? opportunity.description.substring(0, maxDescriptionLength) +
                " . . ."
              : opportunity.description}
          </p>
        </div>
      </button>
    </div>
  );
}
