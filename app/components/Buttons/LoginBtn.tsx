export default function LoginBtn({children}: any) {
    return (
        <button 
            className="px-4 py-2 w-20 font-semibold text-white border border-blue-400 hover:bg-blue-400/30 transition-all hover:ease-in-out 
             hover:bg-blue-400 rounded text-center cursor-pointer"
        >
            {children}
        </button>
    )
}