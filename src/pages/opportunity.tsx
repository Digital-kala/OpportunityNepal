import Papa from 'papaparse';
import { Layout } from "../template";
import { FiSearch } from 'react-icons/fi';
import { useEffect, useState } from "react";
import { parseDateTimeString } from './utils';
import { loadingSpinner } from "../components/LoadingSpinner";
import { OpportunityCard, OpportunityProp, dataPath } from "./home";

export function Opportunity() {
    const [opportunities, setOpportunities] = useState<Array<OpportunityProp>>([]);
    const [filteredOpportunities, setFilteredOpportunities] = useState<Array<OpportunityProp>>([]);

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

        setFilteredOpportunities(opportunities);
    }, [opportunities.length])


    // When the sheet is not loaded, show a loading spinner
    if (opportunities.length === 0) return loadingSpinner()

    return (
        <Layout className="px-8">
            <div className="w-full flex flex-row">
                <div className="w-1/3 space-y-6 pt-8">

                    <div className="flex flex-row gap-3 w-full">
                        <input type="text" className="bg-transparent rounded-lg py-2 px-4 min-w-[70%]" style={{ border: '1px solid lightgray' }} placeholder="Search for opportunities" />
                        <button className="bg-gray-300 rounded-lg px-3 py-2"><FiSearch /></button>
                    </div>

                    <div className="w-full space-y-3">
                        <h3 className="font-semibold text-slate-400">Filter</h3>

                        <div className="w-fit py-2 px-4">

                            <div className="flex flex-row gap-3">
                                <input type="checkbox" id="national-checkbox" value="national"/>
                                <label htmlFor="national-checkbox" className="text-gray-700">National</label>
                            </div>

                            <div className="flex flex-row gap-3">
                                <input type="checkbox" id="international-checkbox" value="national"/>
                                <label htmlFor="international-checkbox" className="text-gray-700">International</label>
                            </div>
                        </div>


                    </div>
                </div>

                <div className="w-full pt-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
                    {filteredOpportunities.map((opportunity, index) => {
                        return OpportunityCard(index, opportunity, "upcoming", "opportunity")
                    })}
                    </div>
                </div>
            </div>
        </Layout>
    );
}