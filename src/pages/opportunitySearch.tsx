import Papa from "papaparse";
import { Layout } from "../template";
import { FiSearch } from "react-icons/fi";
import { useEffect, useState } from "react";
import { parseDateTimeString } from "./utils";
import { loadingSpinner } from "../components/LoadingSpinner";
import {
  OpportunityCard,
  OpportunityProp,
  OpportunityTypes,
  spreadsheetId,
  options,
} from "./home";
import PublicGoogleSheetsParser from "public-google-sheets-parser";

type educationLevel = ["High School", "Bachelors", "Masters", "P.H.D"];
type filteringOptions = {
  searchTerm: string;
  opportunityType: Array<OpportunityTypes>;
  educationLevel: Array<string>;
};

function sortOpportunities(opportunities: Array<OpportunityProp>) {
  if (opportunities.length === 0) return [];

  // sort opportunities with the nearest deadline first that have a deadline
  let filtered = opportunities
    .filter((opportunity) => opportunity.deadlineDate !== undefined)
    .sort((a, b) => (a.deadlineDate < b.deadlineDate ? -1 : 1));

  // add opportunities without a deadline at the end
  filtered = [
    ...filtered,
    ...opportunities.filter(
      (opportunity) => opportunity.deadlineDate === undefined
    ),
  ];

  return filtered;
}

export function OpportunitySearch() {
  const [opportunities, setOpportunities] = useState<Array<OpportunityProp>>(
    []
  );
  const [filteredOpportunities, setFilteredOpportunities] = useState<
    Array<OpportunityProp>
  >([]);
  const [filteringOptions, setFilteringOptions] = useState<filteringOptions>({
    searchTerm: "",
    opportunityType: [],
    educationLevel: [],
  });

  useEffect(() => {
    const parser = new PublicGoogleSheetsParser(spreadsheetId, options);
    let data = [] as OpportunityProp[];

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

        data = data.filter(
          (opportunity) =>
            opportunity.deadlineDate === undefined ||
            (opportunity.deadlineDate instanceof Date &&
              opportunity.deadlineDate >= new Date())
        );
        setOpportunities(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (opportunities.length === 0) return;

    setFilteredOpportunities(sortOpportunities(opportunities));
  }, [opportunities.length]);

  useEffect(() => {
    if (opportunities.length === 0) return;

    const filtered = opportunities.filter((opportunity) => {
      // filter by search opportunity type if given by the user otherwise use the complete list
      if (
        filteringOptions.opportunityType.length > 0 &&
        !filteringOptions.opportunityType.includes(opportunity.type)
      )
        return false;

      // filter by search term if given by the user otherwise use the complete list
      if (
        filteringOptions.searchTerm.length > 0 &&
        !opportunity.title
          .toLowerCase()
          .includes(filteringOptions.searchTerm.toLowerCase())
      )
        return false;

      if (opportunity.deadlineDate && opportunity.deadlineDate <= new Date())
        return false;

      // filter by education level if given by the user otherwise use the complete list
      if (filteringOptions.educationLevel.length > 0) {
        for (const level of filteringOptions.educationLevel) {
          if (
            level
              .toLocaleLowerCase()
              .includes(opportunity.educationLevel.toLowerCase())
          )
            return true;
          //  if (opportunity.educationLevel.toLowerCase().includes(level.toLowerCase())) return true;
        }

        return false;
      }

      return true;
    });

    setFilteredOpportunities(sortOpportunities(filtered));
  }, [filteringOptions]);

  function onTodoChangeOpportunityType(value: string) {
    const previousOpportunityType = filteringOptions.opportunityType;

    if (previousOpportunityType.includes(value as OpportunityTypes)) {
      const newOpportunityType = previousOpportunityType.filter(
        (type) => type !== value
      );
      setFilteringOptions({
        ...filteringOptions,
        opportunityType: newOpportunityType,
      });
    } else {
      const newOpportunityType = [
        ...previousOpportunityType,
        value as OpportunityTypes,
      ];
      setFilteringOptions({
        ...filteringOptions,
        opportunityType: newOpportunityType,
      });
    }
  }

  function onTodoChangeOpportunitySearchTerm() {
    const value = (document.getElementById("searchTerm") as HTMLInputElement)
      .value;
    setFilteringOptions({
      ...filteringOptions,
      searchTerm: value,
    });
  }

  function onTodoChangeOpportunityEducationLevel(value: string) {
    const previousEducationLevel = filteringOptions.educationLevel;

    if (previousEducationLevel.includes(value)) {
      const newEducationLevel = previousEducationLevel.filter(
        (level) => level !== value
      );
      setFilteringOptions({
        ...filteringOptions,
        educationLevel: newEducationLevel,
      });
    } else {
      const newEducationLevel = [...previousEducationLevel, value];
      setFilteringOptions({
        ...filteringOptions,
        educationLevel: newEducationLevel,
      });
    }
  }

  // When the sheet is not loaded, show a loading spinner
  if (opportunities.length === 0) return loadingSpinner();

  return (
    <Layout className="px-8" pageTitle="Opportunity">
      <div className="w-full md:flex pt-12 md:pt-0 mt-8 md:mt-0">
        <div className="w-full md:w-1/3  space-y-6 pt-8">
          <div className="flex flex-row gap-3 w-full md:pr-8 lg:pr-0">
            <input
              id="searchTerm"
              type="text"
              className="bg-transparent rounded-lg py-2 px-4 min-w-[80%]"
              style={{ border: "1px solid lightgray" }}
              placeholder="Search for opportunities"
              onKeyDown={(e) =>
                e.key === "Enter" && onTodoChangeOpportunitySearchTerm()
              }
            />
            <button
              className="bg-gray-300 rounded-lg px-3 py-2"
              onClick={() => onTodoChangeOpportunitySearchTerm()}
            >
              <FiSearch />
            </button>
          </div>

          <h3 className="font-semibold text-slate-400">Filter</h3>
          <div className="w-full gap-3 grid grid-cols-2 md:grid-cols-1  pr-0 md:pr-8">
            <fieldset className="w-full py-2 px-4 border-2 rounded-lg space-y-1">
              {createCheckBox("National", true, onTodoChangeOpportunityType)}
              {createCheckBox(
                "International",
                true,
                onTodoChangeOpportunityType
              )}
            </fieldset>

            <fieldset className="w-full py-2 px-4 border-2 rounded-lg space-y-1">
              {createCheckBox(
                "High School",
                false,
                onTodoChangeOpportunityEducationLevel
              )}
              {createCheckBox(
                "Bachelors",
                false,
                onTodoChangeOpportunityEducationLevel
              )}
              {createCheckBox(
                "Masters",
                false,
                onTodoChangeOpportunityEducationLevel
              )}
              {createCheckBox(
                "P.H.D",
                false,
                onTodoChangeOpportunityEducationLevel
              )}
            </fieldset>
          </div>
        </div>

        <div className="w-full pt-8 pb-[10vh]">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredOpportunities.map((opportunity, index) => {
              return OpportunityCard(
                index,
                opportunity,
                "upcoming",
                "opportunity"
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}

function createCheckBox(
  title: string,
  valueLowerCase: boolean,
  func: Function
) {
  const key = title.toLowerCase().replace(" ", "-") + "-checkbox";
  const value = valueLowerCase ? title.toLowerCase() : title;

  return (
    <div className="flex flex-row gap-3 align-middle items-center">
      <input
        type="checkbox"
        id={key}
        value={value}
        onChange={(e) => func(e.target.value)}
        className="cursor-pointer"
      />
      <label htmlFor={key} className="text-gray-700">
        {title}
      </label>
    </div>
  );
}
