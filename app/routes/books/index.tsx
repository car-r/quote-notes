import { Link, useLoaderData } from "@remix-run/react"
// import AddContentBtn from "~/components/Buttons/AddBookBtn"
// import ContentCard from "~/components/BookCard"
import PageTitle from "~/components/PageTitle"
import { prisma } from "~/db.server"
import { requireUserId } from "~/session.server";
import BookCard from "~/components/BookCard"
import AddBookBtn from "~/components/Buttons/AddBookBtn";

export const loader = async ({request}: any) => {
    const userId = await requireUserId(request);
    const data = await prisma.book.findMany(
        {where: {userId: userId},
        include: {
            author: true,
            quote: true
        }
        }
    )

    const groupBook = await prisma.quote.groupBy({
        where: {userId: userId},
        by: ['bookId'],
        _count: {_all: true}
        
    })

    return {data, groupBook}
}

export default function BookIndex() {
    const data = useLoaderData()
    const bookCount = data.data.length
    console.log(data, bookCount)
    return (
        <div className="flex flex-col pt-6 md:pt-10 max-w-5xl">
            {bookCount > 0 ?
                <PageTitle children={`${bookCount} Books`} btn={<AddBookBtn />}/>
                :
                <PageTitle children={`Book`} btn={<AddBookBtn />}/>
            }
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 pb-1">
                {data.data.map((book: any) => (
                    <Link to={`/books/${book.id}`} key={book.id} className="flex">
                        <BookCard book={book}/>
                    </Link>
                ))}
            </div>
        </div>
    )
}