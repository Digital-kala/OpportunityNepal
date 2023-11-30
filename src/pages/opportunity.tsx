import Papa from "papaparse";
import { Layout } from "../template";
import React, { useEffect, useState } from "react";
import { formatDate, handleURLClick, parseDateTimeString } from "./utils";
import { loadingSpinner } from "../components/LoadingSpinner";
import { OpportunityTypes, dataPath } from "./home";

import { IconType } from "react-icons";
import { TiGlobeOutline } from "react-icons/ti";
import { GrLocation } from "react-icons/gr";
import { MdDateRange, MdUpdate } from "react-icons/md";
import { CgWebsite } from "react-icons/cg";

import bannerImg from "../assets/banner.png";

type OpportunityProp = {
  id: number;
  title: string;
  organization: string;
  type: OpportunityTypes;
  location: string;
  createdDate: Date;
  deadlineDate: Date;
  description: string;
  eligibility: string;
  benefits: string;
  applicatoinProcess: string;
  requiredDocuments: string;
  websiteURL: string;
  additionalInformation: string;
  isRecurring: boolean;
  educationLevel: string;
  field: string;
  pictureURL: string;
};

type OpportunityInfoProp = {
  icon: IconType;
  title: string;
  detail: string;
  capitalize?: boolean;
};

export function Opportunity() {
  const [id, setId] = useState<number>(-1);
  const [opportunities, setOpportunities] = useState<Array<OpportunityProp>>(
    []
  );
  const [opportunity, setOpportunity] = useState<OpportunityProp>();

  useEffect(() => {
    Papa.parse(dataPath, {
      download: true,
      header: true,
      complete: (result) => {
        const data = result.data.map((opportunity: any) => {
          return {
            ...opportunity,
            id: parseInt(opportunity.id),
            type: opportunity.type.toLowerCase() as OpportunityTypes,
            createdDate: opportunity.createdDate
              ? parseDateTimeString(opportunity.createdDate)
              : undefined,
            deadlineDate: opportunity.deadlineDate
              ? new Date(opportunity.deadlineDate)
              : undefined,
          };
        }) as OpportunityProp[];

        setOpportunities(data);
      },
    });

    const id = window.location.hash.split("/")[2];
    setId(parseInt(id));
  }, []);

  useEffect(() => {
    if (opportunities.length === 0) return;
    if (id === -1) return;

    const opportunity = opportunities.find(
      (opportunity) => opportunity.id === id
    );
    setOpportunity(opportunity);
  }, [id, opportunities.length]);

  // When the sheet is not loaded, show a loading spinner
  if (opportunities.length === 0 || id === -1) return loadingSpinner();

  if (opportunity === undefined)
    return (
      <Layout className="px-8">
        <div className="w-full">
          <p>Opportunity not found</p>
        </div>
      </Layout>
    );

  let image = bannerImg;
  if (opportunity.pictureURL && opportunity.pictureURL.length > 0) {
    const url = opportunity.pictureURL;
    let id = "";
    if (url.includes("id=")) id = url.substring(url.indexOf("id=") + 3, url.length);
    else id = url.substring(url.indexOf("/d/") + 3, url.indexOf("/view"));

    image ="https://drive.google.com/uc?export=view&id=" + id;
  }

  let websiteURL = opportunity.websiteURL;
  if (websiteURL.includes("www.") && !websiteURL.includes("https://"))
    websiteURL = websiteURL.replace("www.", "https://");

  return (
    <Layout className="px-8">
      <div className="p-0 md:p-8 py-16 space-y-14 max-w-6xl m-auto">
        <div
          className="cursor-pointer justify-center flex px-5c"
          onClick={() => handleURLClick(websiteURL)}
        >
          <img
            src={image}
            className="max-h-[30vh] rounded-lg w-full"
            style={{ objectFit: "cover", objectPosition: "top" }}
          />
        </div>

        <div className="space-y-14">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-wide">
              {opportunity.title}
            </h1>
            <h2 className="text-xl font-semibold text-gray-500 pb-2">
              {opportunity.organization}
            </h2>

            <button
              className="flex flex-row align-middle space-x-4 text-white bg-sky-400 px-3 py-2 rounded-lg"
              onClick={() => handleURLClick(websiteURL)}
            >
              <CgWebsite className="w-6 h-6" />
              <a className="cursor-pointer font-semibold" onClick={() => {}}>
                Website
              </a>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="space-y-4">
              {opportunityInfo([
                {
                  icon: TiGlobeOutline,
                  title: "",
                  detail: opportunity.type,
                  capitalize: true,
                },
                {
                  icon: GrLocation,
                  title: "",
                  detail: opportunity.location,
                  capitalize: true,
                },
              ])}

              {opportunityInfo([
                {
                  icon: MdDateRange,
                  title: "Deadline : ",
                  detail: formatDate(opportunity.deadlineDate),
                },
              ])}

              {opportunityInfo([
                {
                  icon: MdUpdate,
                  title: "Last Updated : ",
                  detail: formatDate(opportunity.createdDate),
                },
              ])}
            </div>

            <div className="pt-12 md:pt-0">
              {opportunityDescription(
                "Education Level",
                opportunity.educationLevel
              )}
            </div>
          </div>
        </div>

        {opportunityDescription("Description", opportunity.description)}
        {opportunityDescription("Benefits", opportunity.benefits)}
        {opportunityDescription("Eligibility", opportunity.eligibility)}
        {opportunityDescription(
          "Application Process",
          opportunity.applicatoinProcess
        )}
        {opportunityDescription(
          "Required Documents",
          opportunity.requiredDocuments,
          true
        )}
        {opportunityDescription(
          "Additional Information",
          opportunity.additionalInformation,
          true
        )}
      </div>
    </Layout>
  );
}

function opportunityDescription(
  title: string,
  description: string,
  isList?: boolean
) {
  if (description.length === 0 || description === "N/A" || description === ".")
    return;

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold tracking-wide">{title}</h3>
      <hr />

      {isList ? (
        <ul className="space-y-2 list-disc">
          {description.split("\n").map((line, idx) => {
            if (line.length === 0 || line === "N/A" || line === ".")
              return <></>;
            return (
              <li className="" key={idx} style={{ listStyle: "inherit" }}>
                {line}
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="space-y-2">
          {description.split("\n").map((line, idx) => {
            return (
              <p className="" key={idx}>
                {line}
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
}

function opportunityInfo(data: OpportunityInfoProp[]) {
  return (
    <div className="flex flex-row space-x-5">
      {data.map((info, idx) => {
        if (
          info.detail.length === 0 ||
          info.detail === "N/A" ||
          info.detail === "."
        )
          return;
        return (
          <div
            className="text-gray-500 flex flex-row align-middle space-x-2"
            key={idx}
          >
            {info.icon &&
              React.createElement(info.icon, {
                className: "w-6 h-6 text-gray-800",
              })}
            <p>
              {info.title.length > 0 && info.title}
              <span className="font-semibold text-gray-800">
                {info.capitalize
                  ? info.detail[0].toUpperCase() +
                    info.detail.substring(1).toLowerCase()
                  : info.detail}
              </span>
            </p>
          </div>
        );
      })}
    </div>
  );
}
