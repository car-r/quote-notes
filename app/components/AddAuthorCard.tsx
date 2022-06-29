export default function AddAuthorCard() {
    return (
        <div className="flex bg-stone-800 rounded-2xl p-4 overflow-hidden hover:ring-2 ring-blue-400">
            <div className="flex w-32 h-32 outline-dashed mr-4 rounded-full bg-stone-700 justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
            </div>
            <div className="py-2">
                <p>Add Author</p>
            </div>
        </div> 
    )
}