export default function TopAddBtn({children}: any) {
    return (
        <div className="flex items-center gap-2 font-semibold text-xs xs:text-sm rounded text-center cursor-pointer text-white md:text-base px-1.5 py-1 border-2 border-blue-400 bg-blue-400 hover:bg-transparent hover:text-blue-400 ">
            <p className="">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className=" w-4 h-4 xs:w-6 xs:h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </p>
            {children}
        </div>
    )
}