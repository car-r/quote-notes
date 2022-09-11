export default function PageTitle({children, btn}: any) {
    return (
        <div className="mb-6 flex flex-col ">
            <div className="flex justify-between pb-2 border-stone-800 border-b-2 items-center">
                <h3 className="text-lg md:text-2xl tracking-wide font-semibold ">
                    {children}
                </h3>
                <div>{btn}</div>
            </div>
        </div>
    )
}