export default function PrimaryActionBtn({children}: any) {
    return (
        <div 
            className="px-4 py-2 font-semibold text-stone-900 border-2 border-blue-400 bg-blue-400 
            hover:border-blue-500/95 hover:bg-blue-500/95 rounded text-center cursor-pointer"
        >
            {children}
        </div>
    )
}