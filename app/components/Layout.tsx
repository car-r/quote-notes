import Sidebar from "./Sidebar";

export default function Layout({children}: any) {
    return (
        <div className="flex px-4 mx-auto border border-blue-800 text-stone-300/60">
            <Sidebar />
            {children}
        </div>
    )
}