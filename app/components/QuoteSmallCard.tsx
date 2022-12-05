// import type { Quote } from "@prisma/client";

export type Quote = {
    quote: {
        body: string
        id: string
        authorId: string
        bookId: string
        isFavorited: string
        userId: string
    }
}


export default function QuoteSmallCard({quote}: Quote) {
    // console.log('quotecardsmall ->', quote)
    return (
        <div className="p-4 h-40 my-2 border border-stone-800 bg-stone-800 rounded-md text-stone-300/60 hover:ring-2 hover:ring-blue-400 hover:text-stone-100">
            <div className="flex flex-col min-h-full">
                <div className="flex flex-col flex-1 min-h-full justify-center">
                    <div className="w-64 text-clip">
                        <p className="text-sm text-center italic font-semibold ">"{quote.body}"</p>
                    </div>
                </div>
            </div>
        </div> 
    )
}