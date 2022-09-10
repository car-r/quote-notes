export default function PageTitle({children}: any) {
    return (
        <div className="pb-6 ">
            <h3 className="text-2xl tracking-wide font-semibold pb-2 border-stone-800 border-b-2">
                {children}
            </h3>
        </div>
    )
}