import { Layout } from "../template";

export function Home() {
    return (
        <Layout>
            <div className="bg-gray-200 h-64 w-full rounded-lg">
                <div className="flex flex-col p-4 justify-center items-center h-full gap-y-2">
                    <h1 className="text-xl">Explore New Opportunities!</h1>
                    <p className="text-gray-500">Or, post an Opportunity for free.</p>
                    <div className="flex flex-row gap-3">
                        <input type="text" className="border-2 border-gray-300 rounded-lg p-2" placeholder="Search for opportunities" />
                        <button className="bg-gray-300 rounded-lg p-2">Search</button>
                    </div>
                </div>
            </div>

            <div className="w-full pb-8">
                <h1 className="pb-5">Upcoming Opportunties</h1>

                <div className="flex space-x-4 p-4 overflow-x-auto">
                    <OpportunityCard />
                    <OpportunityCard />
                    <OpportunityCard />
                    <OpportunityCard />
                    <OpportunityCard />
                </div>
            </div>


            <div className="w-full pb-8">
                <h1 className="pb-5">Recently Added</h1>

                <div className="flex space-x-4 p-4 overflow-x-auto">
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
        <div className="flex flex-col flex-shrink-0 w-1/3">
            <div className="bg-gray-200 h-64 w-full rounded-lg"></div>
            <div className="flex flex-col p-4">
                <h1 className="text-xl">Opportunity Title</h1>
                <p className="text-gray-500">Opportunity Description</p>
                <p className="text-gray-500">Opportunity Date</p>
            </div>
        </div>
    )
}
