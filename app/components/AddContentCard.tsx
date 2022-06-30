export default function AddContentCard() {
    return (
        <div className="flex flex-col justify-center min-h-full">
            <div className="pb-2 flex flex-col align-middle">
                <div className="bg-stone-700 flex  justify-center items-center py-20 sm:py-40 hover:text-blue-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="font-bold">
                    New Content
                    </p> 
                </div> 
            </div>
        </div>
    )
}