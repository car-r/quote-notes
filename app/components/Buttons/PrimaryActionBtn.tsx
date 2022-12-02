export default function PrimaryActionBtn({children}: any) {
    return (
        <button 
            className="px-4 py-2 font-semibold text-white  bg-blue-400 transition-all hover:ease-in-out 
             hover:bg-blue-600 rounded text-center cursor-pointer"
        >
            {children}
        </button>
    )
}