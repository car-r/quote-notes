export default function TopBtn({children}: any) {
    return (
        <div 
            className="text-sm md:text-base px-3 py-1 text-white rounded text-center cursor-pointer 
            border-2 border-stone-600 bg-transparent hover:bg-stone-400/40 hover:border-stone-600"
        >
            {children}
        </div>
    )
}