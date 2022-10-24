import { Link } from "@remix-run/react";

export default function QuoteNoteQuoteCard({data}: any) {
    console.log('quote note quote card -->', data)
    return (
        <div className="p-4  border border-stone-800 bg-stone-800 rounded-md hover:border-blue-400 hover:text-stone-100">
            <Link to={`/quotes/${data.data.quote.id}`}>
                <p className="text-base text-center py-6 italic font-semibold">
                    {`"${data.data.quote.body}"`}
                </p>
                <div className="flex flex-col text-sm">
                    <p className="font-semibold">
                        {`${data.data.author.name}, `}
                    </p>
                    <p className="font-light">
                        {data.data.book.title}
                    </p>
                </div>
            </Link>
        </div>
    )
}