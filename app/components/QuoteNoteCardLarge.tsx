export type QuoteNote = {
    quoteNote: {
        quoteNote: {
            body: string
        }
    }
}
export default function QuoteNoteCardLarge({quoteNote}: QuoteNote) {
    console.log('quotenotecardlarge',quoteNote)
    return (
        <div className='flex flex-col justify-center p-10 border border-stone-600 text-stone-300 rounded-sm text-center w-full'>
            <p>{quoteNote.quoteNote.body}</p>
        </div>
    )
}

