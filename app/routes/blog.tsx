import { Outlet } from "@remix-run/react";
import NavBar from "~/components/LandingPage/NavBar";


export default function BlogPosts() {

    return (
        <div className="">
            <NavBar />
            <div className="mx-auto max-w-4xl px-4">
                <article 
                    className="prose max-w-none md:prose-lg lg:prose-xl prose-strong:text-stone-300 
                    prose-headings:text-stone-200 text-stone-400"
                >
                    <Outlet />
                </article>
            </div>
        </div>
    )
}