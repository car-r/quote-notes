export default function QuoteNote({note}: any) {
    return (
        <div className='p-4 border border-stone-600 text-stone-300 rounded-sm hover:bg-stone-600 text-center w-full'>
            {note.body}
        </div>
    )
}