import Sidebar from "./Sidebar";

export default function Layout({children}: any) {
    return (
        <div className="flex px-4 w-full mx-auto  text-stone-300/60">
            <Sidebar />
            <div className="w-full">
                {children}
            </div>
        </div>
    )
}