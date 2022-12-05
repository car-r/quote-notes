
export type StatsCard = {
    data: {
        author: {
            _count: {
                book: number
                quote: number
                quoteNote: number
            }
        }
    }
}

export default function AuthorRouteStatsCard({data}: StatsCard) {
    const quotes = {title: 'Quotes', count: data.author._count.quote}
    const books = {title: 'Books', count: data.author._count.book}
    const notes = {title: 'Notes', count: data.author._count.quoteNote}
    const detailArray = [books, quotes, notes]
    console.log('stats card', data)
    return (
        <div className="flex flex-col sm:h-full sm:justify-center border-2 border-stone-800 p-4 rounded-lg">
            <div className="mb-0">
                {detailArray.map((detail) => (
                    <div key={detail.title} className="flex flex-col py-3 border-b border-stone-700 w-full last:border-0 ">
                        <p className="text-sm font-semibold tracking-wider uppercase">{detail.title}</p>
                        <p><span className="font-thin text-2xl">{detail.count}</span></p>
                    </div>
                ))}
            </div>
        </div>
    )
}