import { Link, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/server-runtime";
import { useEffect, useState } from "react";

// export const loader = async () => {
//     const res = await fetch(`https://openlibrary.org/isbn/0964385619}.json`)
//     return json(await res.json());
// }

export default function BookIdCard({data}: any) {
    // const [edit, setEdit] = useState(false)
    // const [openLibData, setOpenLibData] = useState([])
    // const loader = useLoaderData()
    // console.log('bookIdCard loader -> ',loader)


    // useEffect(() => {
        
    //     fetch(`https://openlibrary.org/isbn/${data.data.ISBN}.json`)
    //         .then(response => response.json())
    //         .then(response => setOpenLibData(response))


    // }, [data.data.ISBN])

    console.log('BookIdCard -> ', data)
    return (
        <div className="flex flex-col p-4 bg-stone-800 rounded-lg">
            <div className="flex flex-col pb-3">
                <img src={data.data.imgUrl} alt={data.data.title}
                    onError={(e: any) => e.target.src = 'https://neelkanthpublishers.com/assets/bookcover_thumb.png'}
                    className="object-fit md:max-w-xs " />
            </div>
             <div>
                <div className="flex ">
                    <p className="font-bold w-10/12">
                        {data.data.title}
                    </p>
                    {/* <div className="flex text-xs justify-end" onClick={() => setEdit(!edit)}>
                        <Link to={`/books/${data.data.id}/edit`}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 hover:text-white mr-1">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                            </svg>
                        </Link>
                    </div> */}
                </div>
                <div className="flex">
                    <Link to={`/authors/${data.data.authorId}`}>
                        <p className="text-sm font-thin tracking-wider hover:text-stone-100">
                            {data.data.author.name}
                        </p>
                    </Link>
                </div>
                {/* {data.res.number_of_pages > 0
                 ?
                    <div className="text-sm  mt-2 pt-2">
                        <div className="grid grid-cols-3 gap-2 px-2 ">
                            <div className="flex flex-col items-center justify-center border-r border-r-stone-600">
                                <p className="text-sm font-thin">Pages</p>
                                <p className="text-xs">{data.res.number_of_pages}</p>
                            </div>
                            <div className="flex flex-col items-center justify-center border-r border-r-stone-600">
                                <p className="text-sm font-thin">Year</p>
                                <p className="text-xs">{data.res.publish_date}</p>
                            </div>
                            <div className="flex flex-col items-center justify-center">
                                <p className="text-sm font-thin">Publisher</p>
                                <p className="text-xs">{data.res.publishers[0]}</p>
                            </div>
                        </div>
                    </div>
                : null
                } */}
            </div>
        </div>
    )
}