export default function FeaturesSection() {
    return (
        <>
            <div className="py-40 bg-stone-800">
                <div className="px-4 mx-auto max-w-7xl">
                    <h2 className="text-4xl text-stone-200 font-thin text-center pb-10">Features</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        <div className="flex flex-col border border-stone-700 rounded-xl p-6">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="text-blue-400 w-8 h-8 md:w-12 md:h-12 mb-1">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                            </svg>
                            <h4 className="text-stone-50 font-semibold text-xl">Manage your library</h4>
                            <p className="pt-3 text-stone-400">Libraries are a treasure trove of information. Add books to your library and keep track of notable quotes that get your gears turning.</p>
                        </div>
                        <div className="flex flex-col border border-stone-700 rounded-xl p-6">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="text-blue-400 w-8 h-8 md:w-12 md:h-12 mb-1">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                            </svg>
                            <h4 className="text-stone-50 font-semibold text-xl">Store your notes</h4>
                            <p className="pt-3 text-stone-400">Efficiently store your book notes in one easily accessible place, making it super easy for you to find them any time you need to use them again.</p>
                        </div>
                        <div className="flex flex-col border border-stone-700 rounded-xl p-6">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="text-blue-400 w-8 h-8 md:w-12 md:h-12 mb-1">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                            </svg>
                            <h4 className="text-stone-50 font-semibold text-xl">Share your thoughts</h4>
                            <p className="pt-3 text-stone-400">QuoteNotes makes it easy to add your thoughts about your favorite quotes, providing a brief explanation of why the quote resonated with you.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}