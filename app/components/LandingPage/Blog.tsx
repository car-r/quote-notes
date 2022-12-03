export default function Blog() {
    return (
        <>
            <div className="flex flex-col w-full py-36 bg-white">
                <div className="mx-auto max-w-5xl">
                    <h2 className="text-4xl text-stone-900 font-thin text-center pb-10">The Blog</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3">
                        <div className="flex flex-col py-6 border border-stone-300 rounded-lg">
                            <div className="flex flex-col gap-2 p-4">
                                <p className="font-semibold text-blue-400">5 Tips on note taking while reading</p>
                                <p className="text-base font-light">Taking notes while reading is difficult to do if you don't know how to do it. Here are 5 tips on improving your note taking skills.</p>
                                
                            </div>
                            <div className="flex gap-1 items-center mt-auto px-4">
                                <p>Read more</p>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}