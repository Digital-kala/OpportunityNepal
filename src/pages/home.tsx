import Papa from 'papaparse';
import ReactSearchBox from "react-search-box";
import { Layout } from "../template";
import { useEffect, useState } from "react";
import { loadingSpinner } from "../components/LoadingSpinner";
import { formatDate } from "./utils";
import {BiSearch} from "react-icons/bi";


type OpportunitySummary = {
    key: string;
    value: string;
}

type OpportunityProp = {
    title: string;
    type: string;
    organization: string;
    createdDate: Date;
    deadlineDate: Date;
    description: string;
    pictureURL: string;
}

const dataPath = process.env.NODE_ENV === 'development' ?
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
                        createdDate: opportunity.createdDate ? new Date(opportunity.createdDate) : undefined,
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
        const searchOpportunities = opportunities.map((opportunity) => {
            return {
                key: opportunity.title,
                value: opportunity.title,
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


    // When the sheet is not loaded, show a loading spinner
    if (opportunities.length === 0 || searchOpportunities.length === 0) return loadingSpinner()

    return (
        <Layout className="px-8 mt-8">
            <div className="bg-gray-200 w-full py-12 px-16 rounded-lg">
                <div className="flex flex-col p-4 justify-center items-center h-full gap-y-2">
                    <h1 className="text-xl">Explore New Opportunities!</h1>
                    <p className="text-gray-500 text-sm">Or, post an Opportunity for free.</p>

                </div>

                <ReactSearchBox
                        placeholder="Search for Opportunities"
                        data={searchOpportunities}
                        onSelect={(record: any) => { }}
                        onFocus={() => { }}
                        onChange={(value) => { }}
                        autoFocus
                        leftIcon={<BiSearch/>}
                        iconBoxSize="48px"
                        fuseConfigs={{ threshold: 0.05 }}
                        type='text'
                    />
            </div>


            <div className="w-full pb-8">
                <h1 className="pb-5">Upcoming Opportunties</h1>
                <div className="flex p-y-4 overflow-x-auto">
                    {upcomingOpportunities.map((opportunity, index) => {
                        return OpportunityCard(index, opportunity, "upcoming")
                    })}
                </div>
            </div>


            <div className="w-full pb-8">
                <h1 className="pb-5">Recently Added</h1>
                <div className="flex p-y-4 overflow-x-auto">
                    {recentlyAddedOpportunities.map((opportunity, index) => {
                        return OpportunityCard(index, opportunity, "recent")
                    })}
                </div>
            </div>
        </Layout>
    );
}

function OpportunityCard(key: number, opportunity: OpportunityProp, cardtype: "upcoming" | "recent") {
    const maxDescriptionLength = 80;

    let image = opportunity.pictureURL;
    if (image && image.length > 0) {
        image = 'https://drive.google.com/uc?export=view&id=' + image.substring(image.indexOf('id=') + 3, image.length)
    }

    return (
        <div className="flex flex-col flex-shrink-0 w-full sm:w-1/2 md:w-1/3 px-4" key={key}>

            {opportunity.pictureURL ? <img src={image} alt={opportunity.title} className="bg-gray-200 h-64 w-full rounded-lg object-cover" /> : <div className="bg-gray-200 h-64 w-full rounded-lg" />}
            <div className="flex flex-col p-4">
                <h1 className="text-xl">{opportunity.title}</h1>
                {
                    cardtype === "upcoming"
                        ? <p className="text-gray-500 pb-5">Deadline : {opportunity.deadlineDate && formatDate(opportunity.deadlineDate)}</p>
                        : <p className="text-gray-500 pb-5">Added on {opportunity.createdDate && formatDate(opportunity.createdDate)}</p>
                }
                <p className="text-gray-500 text-justify">{
                    opportunity.description.length > maxDescriptionLength
                        ? opportunity.description.substring(0, maxDescriptionLength) + "..."
                        : opportunity.description
                }</p>
            </div>
        </div>
    )
}
