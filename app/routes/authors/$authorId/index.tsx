import { prisma } from "~/db.server"
import { requireUserId } from "~/session.server";
import AuthorRouteStatsCard from "~/components/AuthorRouteStatsCard";
import { useLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = async ({params, request}) => {
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
                where: {userId: userId},
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

export function ErrorBoundary({ error }: { error: Error }) {
    console.error(error);
  
    return (
        <div className="flex flex-col pt-6 md:pt-10 md:max-w-5xl pb-6">
            <div className='flex flex-col justify-center px-4 py-10 border border-red-500 text-red-500 rounded-lg text-center w-full'>
                <p className="text-sm font-semibold tracking-wide">{`Looks like an error: ${error}`}</p>
            </div>
        </div>
    );
}