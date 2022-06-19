export default function Layout({children}: any) {
    return (
        <div className="flex flex-col px-4 mx-auto text-stone-300/60">
            {children}
        </div>
    )
}