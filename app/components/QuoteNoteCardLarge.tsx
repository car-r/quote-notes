
export default function QuoteNoteCardLarge({data}: any) {
    console.log(data)
    return (
        <div className='flex flex-col justify-center p-10 border border-stone-600 text-stone-300 rounded-sm text-center w-full'>
            <p>{data.data.body}</p>
        </div>
    )
}

