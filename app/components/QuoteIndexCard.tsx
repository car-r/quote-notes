import { Form, Link } from "@remix-run/react";

export default function QuoteIndexCard({quote}: any) {
    return (
        <div className="flex flex-col p-4 border border-stone-800 bg-stone-800 rounded-md text-stone-300/60 hover:border-blue-400">   
            <div className="flex-1">
                <Form method="post">
                    <div onClick={() => console.log('clicked')} className="flex justify-end mb-1">   
                        <div className="flex flex-col">
                        <input type="hidden" name="id" value={quote.id}/>
                        {quote.isFavorited === "isFavorited" ? <input type="hidden" name="isFavorited" value="notFavorited"/> : <input type="hidden" name="isFavorited" value="isFavorited"/>}
                            <button type="submit" className="">
                                {quote.isFavorited === "isFavorited" ? 
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                    </svg>
                                    :
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-right" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                }
                            </button>
                        </div>
                    </div>
                </Form>
                <Link to={`/quotes/${quote.id}`}>
                    <div className="flex flex-col h-5/6 justify-center">
                        <p className="text-xl text-center pb-6 italic font-semibold">"{quote.body}"</p>
                        <p className="font-light mt-auto"><Link to={`/authors/${quote.authorId}`}>{quote.authorName}</Link></p>
                    </div>
                </Link>
            </div>
        </div>
    )
}