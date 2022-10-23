import { prisma } from "~/db.server"
import { requireUserId } from "~/session.server";
import AuthorRouteStatsCard from "~/components/AuthorRouteStatsCard";
import { useLoaderData } from "@remix-run/react";

export const loader = async ({params, request}: any) => {
    const userId = await requireUserId(request);

    const author = await prisma.author.findUnique({
        where: { id: params.authorId },
        include: {
            _count: {
              select: {
                quote: true,
                book: true,
                quoteNote: true
              }
            },
            book: {
                include: {
                    author: true,
                }
            },
            quote: {
                where: {isFavorited: {equals: 'isFavorited'}}
            }
          }
    })

    return {author}
}

export default function AuthorIdHome() {
    const data = useLoaderData()
    
    return (
        <div>
            <AuthorRouteStatsCard data={data}/>
        </div>
    )
}