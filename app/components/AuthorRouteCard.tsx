// import { Link } from "@remix-run/react";
// import { useState } from "react";

const imageOnErrorHandler = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    event.currentTarget.src = 'https://neelkanthpublishers.com/assets/bookcover_thumb.png';
    event.currentTarget.className = "error";
};

export type Author = {
    author: {
        author: {
            id: string
            name: string
            imgUrl: string
            userId: string
        }
    }
}

export default function AuthorRouteCard({author}: Author) {
    // const [edit, setEdit] = useState(false)
    console.log('authorroutecard', author)
    return (
        <div className="flex flex-col rounded-lg w-full items-center border-2 border-stone-800 h-72">
            <div className="bg-stone-800 h-28 w-full p-4 rounded-t-md">
                {/* <div className="flex text-xs justify-end " onClick={() => setEdit(!edit)}>
                    {!edit ? 
                    <Link to={`/authors/${author.author.id}/edit`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 hover:text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                        </svg>
                    </Link>
                    :
                    <Link to={`/authors/${author.author.id}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 hover:text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                        </svg>
                    </Link>
                    }
                </div> */}
            </div>
            <img 
                src={author.author.imgUrl} 
                className="w-32 h-32 xs:w-40 xs:h-40 object-cover max-w-72 rounded-full absolute mt-12 xs:mt-8 " 
                alt={author.author.name}
                onError={imageOnErrorHandler}
            />
            <p className="mt-auto text-base pb-6">{author.author.name}</p>
        </div>
    )
}