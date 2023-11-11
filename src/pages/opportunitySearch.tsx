import Papa from 'papaparse';
import { Layout } from "../template";
import { FiSearch } from 'react-icons/fi';
import { useEffect, useState } from "react";
import { parseDateTimeString } from './utils';
import { loadingSpinner } from "../components/LoadingSpinner";
import { OpportunityCard, OpportunityProp, OpportunityTypes, dataPath } from "./home";


type filteringOptions = {
    searchTerm: string,
    opportunityType: Array<OpportunityTypes>,
}

export function OpportunitySearch() {
    const [opportunities, setOpportunities] = useState<Array<OpportunityProp>>([]);
    const [filteredOpportunities, setFilteredOpportunities] = useState<Array<OpportunityProp>>([]);
    const [filteringOptions, setFilteringOptions] = useState<filteringOptions>({
        searchTerm: "",
        opportunityType: [],
    });

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
                        createdDate: opportunity.createdDate ? parseDateTimeString(opportunity.createdDate) : undefined,
                        deadlineDate: opportunity.deadlineDate ? new Date(opportunity.deadlineDate) : undefined,
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

    useEffect(() => {
        if (opportunities.length === 0) return;

        const filtered = opportunities.filter((opportunity) => {
            // filter by search opportunity type if given by the user otherwise use the complete list
            if (filteringOptions.opportunityType.length >0 &&!filteringOptions.opportunityType.includes(opportunity.type)) return false;

            // filter by search term if given by the user otherwise use the complete list
            if (filteringOptions.searchTerm.length > 0 && !opportunity.title.toLowerCase().includes(filteringOptions.searchTerm.toLowerCase())) return false;

            return true;
        });

        setFilteredOpportunities(filtered);
    }, [filteringOptions])


    function onTodoChangeOpportunityType(value: string){
        const previousOpportunityType = filteringOptions.opportunityType;

        if(previousOpportunityType.includes(value as OpportunityTypes)){
            const newOpportunityType = previousOpportunityType.filter((type) => type !== value);
            setFilteringOptions({
                ...filteringOptions,
                opportunityType: newOpportunityType,
            });
        } else {
            const newOpportunityType = [...previousOpportunityType, value as OpportunityTypes];
            setFilteringOptions({
                ...filteringOptions,
                opportunityType: newOpportunityType,
            });
        }
    }

    function onTodoChangeOpportunitySearchTerm(){
        const value = (document.getElementById("searchTerm") as HTMLInputElement).value;
        setFilteringOptions({
            ...filteringOptions,
            searchTerm: value,
        });
    }


    // When the sheet is not loaded, show a loading spinner
    if (opportunities.length === 0) return loadingSpinner()

    return (
        <Layout className="px-8">
            <div className="w-full flex flex-row">
                <div className="w-1/3 space-y-6 pt-8">

                    <div className="flex flex-row gap-3 w-full">
                        <input id="searchTerm" type="text" className="bg-transparent rounded-lg py-2 px-4 min-w-[70%]" style={{ border: '1px solid lightgray' }} placeholder="Search for opportunities" />
                        <button className="bg-gray-300 rounded-lg px-3 py-2" onClick={()=>onTodoChangeOpportunitySearchTerm()} ><FiSearch /></button>
                    </div>

                    <div className="w-full space-y-3">
                        <h3 className="font-semibold text-slate-400">Filter</h3>

                        <div className="w-fit py-2 px-4">

                            <div className="flex flex-row gap-3">
                                <input type="checkbox" id="national-checkbox" value="national" onChange={e => onTodoChangeOpportunityType(e.target.value)}/>
                                <label htmlFor="national-checkbox" className="text-gray-700">National</label>
                            </div>

                            <div className="flex flex-row gap-3">
                                <input type="checkbox" id="international-checkbox" value="international" onChange={e => onTodoChangeOpportunityType(e.target.value)}/>
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