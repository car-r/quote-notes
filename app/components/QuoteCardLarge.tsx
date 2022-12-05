
import { Form, Link } from "@remix-run/react";

const imageOnErrorHandler = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    event.currentTarget.src = 'https://neelkanthpublishers.com/assets/bookcover_thumb.png';
    event.currentTarget.className = "error";
};

export default function QuoteCardLarge({quote}: any) {

    // console.log('quotecardlarge -->', quote)

    return (
        <div className="md:col-span-2">
            <div className="p-4 md:p-10  border border-stone-800 bg-stone-800 rounded-md text-stone-300/60">
                <Form method="post">
                    <div onClick={() => console.log('clicked')} className="flex justify-end mb-1">
                        <div className="flex flex-col mb-1">
                        <input type="hidden" name="id" value={quote.quote.id}/>
                        {quote.quote.isFavorited === "isFavorited" ? <input type="hidden" name="isFavorited" value="notFavorited"/> : <input type="hidden" name="isFavorited" value="isFavorited"/>}
                            <button type="submit" name="_method" value="updateFavorite" className="hover:text-white">
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
                <p className="text-base sm:text-xl text-center pb-6 italic font-semibold my-5 md:my-10">
                    "{quote.quote.body}"
                </p>
                <div className="flex justify-between">
                    <div className="flex">
                        <img src={quote.quote.author.imgUrl} alt={quote.quote.author.name}
                        onError={imageOnErrorHandler}
                        className=" w-14 h-14 md:w-20 md:h-20 object-cover mr-4 rounded-full"
                        />
                        <div className="text-sm sm:text-base flex flex-col justify-center gap-1">
                            <p className=" hover:text-stone-100">
                                <Link to={`/authors/${quote.quote.author.id}`} className="hover:text-stone-100">
                                    {quote.quote.author.name}
                                </Link>
                            </p>
                            <p className="font-thin hover:text-stone-100">
                                <Link to={`/books/${quote.quote.book.id}`}>
                                    {quote.quote.book.title}
                                </Link>
                            </p>
                        </div>
                    </div>
                    <div className="flex h-6 mt-auto">
                        <a href={`https://twitter.com/share?text="${quote.quote.body}" - ${quote.quote.author.name}`}
                            target="_blank" rel="noreferrer" className="flex gap-1 items-center justify-center px-2 rounded-xl transition-all hover:ease-in-out bg-blue-400 hover:bg-blue-600"
                        >
                            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" id="IconChangeColor" height="200" width="200"><rect width="256" height="256" fill="none"></rect><path d="M128,88c0-22,18.5-40.3,40.5-40a40,40,0,0,1,36.2,24H240l-32.3,32.3A127.9,127.9,0,0,1,80,224c-32,0-40-12-40-12s32-12,48-36c0,0-64-32-48-120,0,0,40,40,88,48Z" fill="#ffffff" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8" id="mainIconPathAttribute"></path></svg>
                            <p className="text-xs font-semibold text-white">Tweet</p>
                        </a>
                    </div>
                </div>
                
            </div>
        </div>
    )
}