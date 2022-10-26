export default function TopAddBtn({children}: any) {
    return (
        <div className="flex items-center gap-2 font-semibold text-sm rounded text-center cursor-pointer text-stone-900 md:text-base px-2 py-1 border border-blue-400 bg-blue-400 hover:bg-transparent hover:text-blue-400 ">
            <p className="">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </p>
            {children}
        </div>
    )
}