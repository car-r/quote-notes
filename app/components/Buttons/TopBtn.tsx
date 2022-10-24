export default function TopBtn({children}: any) {
    return (
        <div className="text-sm md:text-base px-3 py-1 border-2 border-stone-600 bg-stone-600 hover:bg-stone-400 hover:text-stone-800 hover:border-stone-400 text-white rounded text-center cursor-pointer">
            {children}
        </div>
    )
}