

export default function SecondaryAddBtn({children}: any) {
    return (
        <div className="flex items-center gap-2 text-sm text-blue-400 md:text-base px-2 py-2 border-2 border-blue-400 bg-transparent hover:bg-blue-500 hover:border-blue-500 hover:text-white rounded text-center cursor-pointer">
            <p className="">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 ">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>

            </p>
            {children}
        </div>
    )
}