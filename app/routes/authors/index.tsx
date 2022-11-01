
import { Link, useLoaderData } from "@remix-run/react"
import AuthorCard from "~/components/AuthorCard"
import AddAuthorBtn from "~/components/Buttons/AddAuthorBtn";
import AuthorErrorBackBtn from "~/components/Buttons/AuthorErrorBackBtn";
import PageTitle from "~/components/PageTitle"
import { prisma } from "~/db.server"
import { requireUserId } from "~/session.server";

export const loader = async ({request}: any) => {
    const userId = await requireUserId(request);
    const authors = await prisma.author.findMany({
        where: { userId: userId }
    })
    return authors    
}

export default function AuthorsIndex() {
    const authors = useLoaderData()
    const authorCount = authors.length
    console.log(authors)
    return (
        <div className="flex flex-col pt-6 md:pt-10 max-w-5xl">
            {authorCount > 0 ? 
                <PageTitle children={`${authorCount} Authors`} btn={<AddAuthorBtn />}/>
                :
                <PageTitle children={`Authors`} btn={<AddAuthorBtn />}/>
            }
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-1 ">
                {authors.map((author: any) => (
                    <Link to={`/authors/${author.id}`} key={author.id} className="">
                        <AuthorCard author={author}/>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export function ErrorBoundary({ error }: { error: Error }) {
    console.error(error);
  
    return (
        <div className="flex flex-col pt-6 md:pt-10 md:max-w-5xl pb-6">
            <PageTitle children={`Author`} btn={<AuthorErrorBackBtn />}/>
            <div className="flex flex-col w-full md:grid md:grid-cols-3">
                <div className="flex flex-col col-span-2 ">
                    <div className='flex flex-col justify-center py-10 border border-red-500 text-red-500 rounded-lg text-center w-full'>
                        <p className="text-sm font-semibold tracking-wide">{`Looks like an error: ${error}`}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}