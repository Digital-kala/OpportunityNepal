import { Layout } from "../template";
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { formatDate } from "./utils";

type Item = {
    name: string;
    date: Date;
}

export function Home() {
    const items: Item[] = [
        {
            name: 'Python',
            date: new Date(2022, 1, 1),
        },
        {
            name: 'C++',
            date: new Date(2022, 1, 1),
        },
        {
            name: 'Javascript',
            date: new Date(2022, 1, 1),
        },
        {
            name: 'Java',
            date: new Date(2022, 1, 1),
        },
    ]

    const handleOnSearch = (string: string, results: any) => {
        console.log(string, results)
    }

    const handleOnHover = (result: Item) => {
        console.log(result)
    }

    const handleOnSelect = (item: Item) => {
        console.log(item)
    }

    const handleOnFocus = () => {
        console.log('Focused')
    }

    const formatResult = (item: Item) => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

        return (
            <>
                <span style={{ display: 'block', textAlign: 'left' }}>
                    {item.name}
                </span>
                <span className="text-gray-500"
                    style={{ display: 'block', textAlign: 'left' }}>
                    Deadline : {formatDate(item.date)}
                </span>
            </>
        )
    }

    return (
        <Layout>
            <div className="bg-gray-200 w-full py-12 px-16 rounded-lg">
                <div className="flex flex-col p-4 justify-center items-center h-full gap-y-2">
                    <h1 className="text-xl">Explore New Opportunities!</h1>
                    <p className="text-gray-500 text-sm">Or, post an Opportunity for free.</p>
                </div>
                <ReactSearchAutocomplete<Item>
                    items={items}
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
