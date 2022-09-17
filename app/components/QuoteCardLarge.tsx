import { Form, Link } from "@remix-run/react";

export default function QuoteCardLarge({quote}: any) {
    console.log('quotecardlarge -->', quote)
    return (
        <div className="md:col-span-2">
            <div className="p-4 md:p-10  border border-stone-800 bg-stone-800 rounded-md text-stone-300/60">
                <Form method="post">
                    <div onClick={() => console.log('clicked')} className="flex justify-end mb-1">   
                        <div className="flex flex-col mb-1">
                        <input type="hidden" name="id" value={quote.id}/>
                        {quote.quote.isFavorited === "isFavorited" ? <input type="hidden" name="isFavorited" value="notFavorited"/> : <input type="hidden" name="isFavorited" value="isFavorited"/>}
                            <button type="submit" name="_method" value="updateFavorite">
                                {quote.quote.isFavorited === "isFavorited" ? 
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
                <p className="text-lg sm:text-xl text-center pb-6 italic font-semibold md:my-10">"{quote.quote.body}"</p>
                <div className="flex">
                    <img src={quote.quote.author.imgUrl} alt={quote.quote.author.name}
                    onError={(e: any) => e.target.src = 'https://icon-library.com/images/default-user-icon/default-user-icon-8.jpg'}
                    className="w-20 h-20 object-cover mr-4 rounded-full"/>
                    <div className="flex flex-col justify-center gap-1">
                        <p className=" hover:text-stone-100">
                            <Link to={`/authors/${quote.quote.authorId}`} className="hover:text-stone-100">
                                {quote.quote.authorName}
                            </Link>
                        </p>
                        <p className="font-thin hover:text-stone-100">
                            <Link to={`/content/${quote.quote.contentId}`}>
                                {quote.quote.content.title}
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}