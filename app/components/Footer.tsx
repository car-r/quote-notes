
export default function Footer() {
    const year = new Date()

    return (
        <footer className='mt-6 bg-stone-900 flex justify-center border-t border-stone-800 text-stone-300/60'>
            <p className='py-10'>
                QuoteNotes |<span className='pl-1'>{year.getFullYear()}</span>
            </p>
        </footer>
    )
}