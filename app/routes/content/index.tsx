import { Link, useLoaderData } from "@remix-run/react"
import AddContentCard from "~/components/AddContentCard"
import { prisma } from "~/db.server"

export const loader = async () => {
    const data = prisma.content.findMany()
    return data
}

export default function ContentIndex() {
    const data = useLoaderData()
    console.log(data)
    return (
        <div className="flex flex-col pt-10 max-w-4xl">
            <div className="pb-6">
                <h3 className="text-2xl tracking-wide font-semibold pb-2 border-stone-800 border-b-2">
                Your Content
                </h3>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Link to={`/content/new`}
                    className="p-4 border border-stone-800 bg-stone-700 outline-dashed hover:outline-dashed-blue-400 rounded-md text-stone-300/60"
                    >
                    <AddContentCard />
                </Link>
                
                {data.map((content: any) => (
                    <Link to={`/content/${content.id}`} key={content.id}
                    className="p-4 border border-stone-800 bg-stone-800 rounded-md text-stone-300/60 hover:border-blue-400"
                    >
                        <div className="pb-2">
                            <img src={content.imgUrl} alt={content.title} 
                                className="object-fit max-w-96"
                            />
                        </div>
                        <div>
                            <p className="font-bold">
                                {content.title}
                            </p>     
                            <p className="text-sm font-thin tracking-wider">
                                {content.authorName}
                            </p>               
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}