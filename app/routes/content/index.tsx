import { Link, useLoaderData } from "@remix-run/react"
import AddContentCard from "~/components/AddContentCard"
import ContentCard from "~/components/ContentCard"
import PageTitle from "~/components/PageTitle"
import { prisma } from "~/db.server"
import { requireUserId } from "~/session.server";

export const loader = async ({request}: any) => {
    const userId = await requireUserId(request);
    const data = await prisma.content.findMany(
        {where: {userId: userId}}
    )
    return data
}

export default function ContentIndex() {
    const data = useLoaderData()
    console.log(data)
    return (
        <div className="flex flex-col pt-6 md:pt-10 max-w-5xl">
            <PageTitle children={`Your Content`}/>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Link to={`/content/new`}
                    className="p-4 border border-stone-800 bg-stone-700 outline-dashed rounded-md text-stone-300/60 hover:outline-blue-400"
                    >
                    <AddContentCard />
                </Link>
                
                {data.map((content: any) => (
                    <Link to={`/content/${content.id}`} key={content.id}>
                        <ContentCard content={content}/>
                    </Link>
                ))}
            </div>
        </div>
    )
}