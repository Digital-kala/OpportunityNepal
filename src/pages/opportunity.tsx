import { Layout } from "../template";

export function Opportunity() {
    return (
        <Layout>
            <div>
                Available Opportunities
            </div>
            <div className="flex flex-row gap-3">
                <input type="text" className="border-2 border-gray-300 rounded-lg p-2" placeholder="Search for opportunities" />
                <button className="bg-gray-300 rounded-lg p-2">Search</button>
            </div>
            <div className="grid grid-cols-4 gap-8">
                <OpportunityCard/>
                <OpportunityCard/>
                <OpportunityCard/>
                <OpportunityCard/>
                <OpportunityCard/>
                <OpportunityCard/>
                <OpportunityCard/>
                <OpportunityCard/>
                <OpportunityCard/>
                <OpportunityCard/>
            </div>
        </Layout>
    );
}


function OpportunityCard() {
    return (
        <div className="flex flex-col">
            <div className="bg-gray-200 h-64 w-full rounded-lg"></div>
            <div className="flex flex-col p-4">
                <h1 className="text-xl">Opportunity Title</h1>
                <p className="text-gray-500">Opportunity Description</p>
                <p className="text-gray-500">Opportunity Date</p>
            </div>
        </div>
    )
}