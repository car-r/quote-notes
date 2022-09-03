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

    const groupContent = await prisma.quote.groupBy({
        where: {userId: userId},
        by: ['contentId'],
        _count: {_all: true}
        
    })

    return {data, groupContent}
}

export default function ContentIndex() {
    const data = useLoaderData()
    const contentCount = data.data.length
    console.log(data, contentCount)
    return (
        <div className="flex flex-col pt-6 md:pt-10 max-w-5xl">
            {contentCount > 0 ?
                <PageTitle children={`${contentCount} Content`}/>
                :
                <PageTitle children={`Content`}/>
            }
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                <Link to={`/content/new`}>
                    <AddContentCard />
                </Link>
                {data.data.map((content: any) => (
                    <Link to={`/content/${content.id}`} key={content.id}>
                        <ContentCard content={content}/>
                    </Link>
                ))}
            </div>
        </div>
    )
}