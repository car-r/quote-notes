export default function AddBookCard() {
    return (
        <div className="flex flex-col justify-center min-h-full bg-stone-800 p-4 border border-stone-800 outline-dashed rounded-md text-stone-300/60 hover:outline-blue-400 hover:text-stone-100">
            <div className="pb-2 flex flex-col align-middle">
                <div className=" flex  justify-center items-center py-20 sm:py-40 ">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="font-bold uppercase">
                    New Book
                    </p> 
                </div> 
            </div>
        </div>
    )
}