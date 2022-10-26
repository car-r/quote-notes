export default function TopBackBtn({children}: any) {
    return (
        <div 
            className="flex gap-2 text-sm md:text-base px-2 py-1 text-white rounded text-center cursor-pointer 
            border-2 border-stone-600 bg-transparent hover:bg-stone-400/40 hover:border-stone-600"
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>

            {children}
        </div>
    )
}