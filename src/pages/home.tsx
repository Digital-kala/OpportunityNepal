import Papa from 'papaparse';
import { Layout } from "../template";
import { useEffect, useState } from "react";
import { loadingSpinner } from "../components/LoadingSpinner";
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { formatDate, handleURLClick, parseDateTimeString } from "./utils";

import bannerImg from '../assets/banner.png';


export type OpportunitySummary = {
    id: number;
    name: string;
}

export type OpportunityProp = {
    title: string;
    type: string;
    organization: string;
    createdDate: Date;
    deadlineDate: Date;
    description: string;
    pictureURL: string;
}

export const opportunityFormURL = 'https://formfacade.com/public/113161832885328299725/all/form/1FAIpQLSe101GEUyjj6IVtN_Yx-xammIvkgEME92OCcRBb-YS8P-c1UA';
export const dataPath = process.env.NODE_ENV === 'development' ?
    '../../data/data.csv' :
    'https://digital-kala.github.io/OpportunityNepal.github.io/data/data.csv';


export function Home() {
    const [opportunities, setOpportunities] = useState<Array<OpportunityProp>>([]);
    const [searchOpportunities, setSearchOpportunities] = useState<Array<OpportunitySummary>>([]);
    const [upcomingOpportunities, setUpcomingOpportunities] = useState<Array<OpportunityProp>>([]);
    const [recentlyAddedOpportunities, setRecentlyAddedOpportunities] = useState<Array<OpportunityProp>>([]);

    useEffect(() => {
        Papa.parse(dataPath, {
            download: true,
            header: true,
            complete: (result) => {
                const data = result.data.map((opportunity: any) => {
                    return {
                        title: opportunity.title,
                        type: opportunity.type,
                        organization: opportunity.organization,
                        createdDate: opportunity.createdDate ? parseDateTimeString(opportunity.createdDate) : undefined,
                        deadlineDate: opportunity.deadlineDate ? new Date(opportunity.deadlineDate) : undefined,
                        description: opportunity.description,
                        pictureURL: opportunity.pictureURL,
                    }
                }) as OpportunityProp[];

                setOpportunities(data);
            },
        });
    }, []);

    useEffect(() => {
        if (opportunities.length === 0) return;

        // find and add search opportunities
        const searchOpportunities = opportunities.map((opportunity, idx) => {
            return {
                id: idx,
                name: opportunity.title
            } as OpportunitySummary
        });
        setSearchOpportunities(searchOpportunities);

        // find and add upcoming opportunities
        let upcomingOppor = opportunities.filter(opportunity => opportunity.deadlineDate && opportunity.deadlineDate >= new Date() && opportunity.createdDate instanceof Date);
        if (upcomingOppor.length > 1) {
            upcomingOppor = upcomingOppor.sort((a, b) => a.deadlineDate < b.deadlineDate ? -1 : 1);
        }
        setUpcomingOpportunities(upcomingOppor.slice(0, 10));

        // find and add recently added opportunities
        let recentlyAddedOppor = opportunities.filter(opportunity => opportunity.createdDate && opportunity.createdDate instanceof Date);
        if (recentlyAddedOppor.length > 1) {
            recentlyAddedOppor = recentlyAddedOppor.sort((a, b) => a.createdDate < b.createdDate ? -1 : 1);
        }
        setRecentlyAddedOpportunities(recentlyAddedOppor.slice(0, 10));
    }, [opportunities.length])

    const formatResult = (item: OpportunitySummary) => {
        return (
            <>
                <span style={{ display: 'block', textAlign: 'left' }}>{item.name}</span>
            </>
        )
    }


    // When the sheet is not loaded, show a loading spinner
    if (opportunities.length === 0 || searchOpportunities.length === 0) return loadingSpinner()

    return (
        <Layout className="px-8 mt-8">
            <div className="bg-gray-200 w-full pt-12 md:pt-[10vh] pb-2 md:pb-[4vh] px-16 rounded-lg shadow-md"
                style={{ backgroundImage: `url(${bannerImg})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }} >
                <div className="flex flex-col p-4 justify-center items-center h-full gap-y-4 mb-4">
                    <h1 className="text-3xl font-bold tracking-wide website_yellow drop-shadow-md">Explore New Opportunities!</h1>
                    <p className="text-gray-200 text-lg drop-shadow-md">Or</p>
                    <button className="px-4 py-2 text-md font-bold bg-gray-200/95 rounded-lg website_blue" onClick={() => handleURLClick(opportunityFormURL)}>
                        Post An Opportunity
                    </button>

                </div>
                <ReactSearchAutocomplete
                    items={searchOpportunities}
                    onSearch={() => { }}
                    onHover={() => { }}
                    onSelect={() => { }}
                    onFocus={() => { }}
                    autoFocus
                    formatResult={formatResult}
                    styling={{zIndex: 100}}
                />
            </div>

            <div className="w-full pt-10 pb-4">
                <h1 className="pb-2 font-bold text-3xl text-slate-800 text-center drop-shadow-md z-0">Upcoming Opportunties</h1>
                <div className="flex p-y-4 overflow-x-auto">
                    {upcomingOpportunities.map((opportunity, index) => {
                        return OpportunityCard(index, opportunity, "upcoming")
                    })}
                </div>
            </div>

            <div className="w-full pt-5 pb-8">
                <h1 className="pb-2 font-bold text-3xl text-slate-800 text-center drop-shadow-md">Recently Added</h1>
                <div className="flex p-y-4 overflow-x-auto">
                    {recentlyAddedOpportunities.map((opportunity, index) => {
                        return OpportunityCard(index, opportunity, "recent")
                    })}
                </div>
            </div>
        </Layout>
    );
}

export function OpportunityCard(key: number, opportunity: OpportunityProp, cardtype: "upcoming" | "recent", source?:string) {
    const maxDescriptionLength = 150;

    let image = opportunity.pictureURL;
    if (image && image.length > 0) {
        image = 'https://drive.google.com/uc?export=view&id=' + image.substring(image.indexOf('id=') + 3, image.length)
    } else {
        image = bannerImg;
    }

    let defaultClass = "flex flex-col flex-shrink-0 w-full sm:w-1/2 md:w-1/3 px-4 py-8"
    if(source === "opportunity") defaultClass = "flex flex-col py-4 "

    return (
        <div className={defaultClass} key={key}>
            <button className='w-full h-full rounded-lg shadow-md border-0 flex flex-col'>
                <div className="bg-gray-200 h-64 w-full rounded-lg shadow-sm overflow-hidden"
                    style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }} />
                <div className="flex flex-col p-4">
                    <h1 className="text-xl font-semibold text-slate-800 py-3">{opportunity.title}</h1>
                    <p className="bg-slate-200/50 py-2 rounded-lg mb-5 text-sm">
                        {cardtype === "upcoming"
                            ? "Deadline : " + formatDate(opportunity.deadlineDate)
                            : "Added on " + formatDate(opportunity.createdDate)
                        }
                    </p>
                    <p className="text-gray-800 text-justify px-4 pb-2 text-sm">{
                        opportunity.description.length > maxDescriptionLength
                            ? opportunity.description.substring(0, maxDescriptionLength) + " . . ."
                            : opportunity.description
                    }</p>
                </div>
            </button>
        </div>
    )
}
