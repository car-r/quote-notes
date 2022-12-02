

export default function SecondaryAddBtn({children}: any) {
    return (
        <button className="flex items-center gap-2 text-sm text-white md:text-base px-2 py-1 border-2 border-stone-600 bg-transparent hover:bg-stone-400/40 hover:border-stone-600 rounded text-center cursor-pointer">
            <p className="">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </p>
            {children}
        </button>
    )
}