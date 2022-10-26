export default function SuccessBtn({children}: any) {
    return (
        <div 
            className="flex justify-center gap-2 px-2 py-2 font-semibold text-stone-900 bg-green-200/80 
             hover:bg-green-500/95 rounded text-center cursor-pointer"
        >
            {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg> */}
            <div>
            {children}
            </div>
        </div>
    )
}