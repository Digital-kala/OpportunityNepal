import { Layout } from "../template";
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { formatDate } from "./utils";
import { useEffect, useState } from "react";
import useGoogleSheets from 'use-google-sheets';

type Item = {
    name: string;
    date: Date;
    description: string;
}

export function Home() {
    const { data: sheetData, loading, error } = useGoogleSheets({
        apiKey: import.meta.env.VITE_GOOGLE_CLOUD_API_KEY,
        sheetId: import.meta.env.VITE_GOOGLE_SHEET_ID,
    });

    const [opportunities, setOpportunities] = useState<Array<Item>>([]);

    useEffect(() => {
        if(sheetData.length === 0) return;

        for(const row of sheetData[0]['data'] as Array<any>){
            const item = {
                name: row['Opportunity Title'],
                date: new Date('2022-01-01'),
                description: row['Opportunity Description:']
            }
            // make sure the opportunity is not already in the list
            if(opportunities.find(opportunity => opportunity.name === item.name)) continue;
            setOpportunities(prev => [...prev, item])
        }
    }, [sheetData])

    const handleOnSearch = (string: string, results: any) => {
        // console.log(string, results)
    }

    const handleOnHover = (result: Item) => {
        // console.log(result)
    }

    const handleOnSelect = (item: Item) => {
        // console.log(item)
    }

    const handleOnFocus = () => {
        // console.log('Focused')
    }

    const formatResult = (item: Item) => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

        return (
            <div key={item.name + ' - ' + item.description }>
                <span  key={item.name} style={{ display: 'block', textAlign: 'left' }}>
                    {item.name}
                </span>
                <span className="text-gray-500"
                    style={{ display: 'block', textAlign: 'left' }}>
                    Deadline : {formatDate(item.date)}
                </span>
            </div>
        )
    }

    if(error){
        return <div>An Error has occured.</div>
    }

    return (
        <Layout className="mx-8 mt-8">
            <div className="bg-gray-200 w-full py-12 px-16 rounded-lg">
                <div className="flex flex-col p-4 justify-center items-center h-full gap-y-2">
                    <h1 className="text-xl">Explore New Opportunities!</h1>
                    <p className="text-gray-500 text-sm">Or, post an Opportunity for free.</p>
                </div>
                <ReactSearchAutocomplete<Item>
                    items={opportunities}
                    placeholder="Search for opportunities"
                    onSearch={handleOnSearch}
                    onHover={handleOnHover}
                    onSelect={handleOnSelect}
                    onFocus={handleOnFocus}
                    formatResult={formatResult}
                    autoFocus
                />
            </div>

            <div className="w-full pb-8">
                <h1 className="pb-5">Upcoming Opportunties</h1>

                <div className="flex p-y-4 overflow-x-auto">
                    <OpportunityCard />
                    <OpportunityCard />
                    <OpportunityCard />
                    <OpportunityCard />
                    <OpportunityCard />
                </div>
            </div>


            <div className="w-full pb-8">
                <h1 className="pb-5">Recently Added</h1>

                <div className="flex p-y-4 overflow-x-auto">
                    <OpportunityCard />
                    <OpportunityCard />
                    <OpportunityCard />
                    <OpportunityCard />
                    <OpportunityCard />
                </div>
            </div>
        </Layout>
    );
}

function OpportunityCard() {
    return (
        <div className="flex flex-col flex-shrink-0 w-full sm:w-1/2 md:w-1/3 px-4">
            <div className="bg-gray-200 h-64 w-full rounded-lg"></div>
            <div className="flex flex-col p-4">
                <h1 className="text-xl">Opportunity Title</h1>
                <p className="text-gray-500">Opportunity Description</p>
                <p className="text-gray-500">Opportunity Date</p>
            </div>
        </div>
    )
}
