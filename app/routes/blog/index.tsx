import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import * as postA from "./5-tips-to-remember-what-you-read.mdx"

function postFromModule(mod: any) {
    return {
      slug: mod.filename.replace(/\.mdx?$/, ""),
      ...mod.attributes.meta,
    };
}

export async function loader() {
    // Return metadata about each of the posts for display on the index page.
    // Referencing the posts here instead of in the Index component down below
    // lets us avoid bundling the actual posts themselves in the bundle for the
    // index page.
    return json([
      postFromModule(postA),
    ]);
  }

export default function BlogIndex() {
    const posts = useLoaderData();
    console.log('blog index ->', posts)
    return (
        <>
            {/* <div className="flex flex-col mx-auto max-w-4xl py-20">
                {posts.map((post: any) => (
                    <div  key={post.slug} className="border-b border-b-stone-700">
                        <Link to={`/blog/${post.slug}`} className="flex flex-col md:flex-row text-stone-200 justify-center prose-img:mb-0 md:gap-10" >
                            <img src={post.featureImage} alt="" className="md:w-1/2"/>
                            <div className="">
                                <p className="">{post.title}</p>
                                <p></p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div> */}
            <div className="prose md:prose-lg lg:prose-xl flex flex-col mx-auto max-w-4xl py-20 prose-img:mb-0 prose-img:mt-0 prose-a:no-underline">
                {posts.map((post: any) => (
                    <div  key={post.slug} className=" pb-8 border-b border-b-stone-700">
                        <Link to={`/blog/${post.slug}`} className="flex flex-col md:flex-row text-stone-200 justify-center md:gap-8" >
                            <img src={post.featureImage} alt="" className="md:w-1/2 rounded-lg"/>
                            <div className="flex flex-col">
                                <p className="mb-0 pb-0 md:pt-4 font-semibold hover:text-blue-400">{post.title}</p>
                                {/* <p className="mt-1 mb-1 text-base">{post.pubDate}</p> */}
                                <p className=" font-light text-sm md:text-base mb-0">{post.description}</p>
                                <p className="flex items-center gap-2 text-base text-blue-400 underline underline-offset-4 hover:text-blue-500">
                                    Read more
                                </p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </>
    )
}