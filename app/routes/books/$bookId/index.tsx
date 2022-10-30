import { prisma } from "~/db.server"
import { requireUserId } from "~/session.server";
import { useLoaderData } from "@remix-run/react";
import BookIdCard from "~/components/BookIdCard";



export const loader = async ({params, request}: any) => {
    // const userId = await requireUserId(request);

    const data = await prisma.book.findUnique({
        where: {id: params.bookId},
        include: {
            author: true
        }
    })

    if (!data) {
        throw new Response("Can't find book.", {
            status: 404,
        })
    }

    // const response = await fetch(`https://openlibrary.org/isbn/${data.ISBN}.json`)
    // const res = response.json()
        // .then((response) => response.json())
        // .then((openLibrary) => console.log(openLibrary))

    

    // const data = await prisma.user.findUnique({
    //     where: { id: userId },
    //     include: {
    //         _count: {
    //           select: {

    //             book: true,
    //             quoteNote: true
    //           }
    //         },
    //         book: {
    //             where: { id: params.bookId},
    //             include: {
    //                 author: true,
    //             }
    //         }
    //       }
    // })

    return {data}
}

export default function BookIdHome() {
    const data = useLoaderData()
    console.log('bookId index --> ', data)
    return (
        <div>
            <BookIdCard data={data}/>
        </div>
    )
}