import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import moment from "moment";
import { getUserById } from "~/models/user.server";
import { requireUserId } from "~/session.server";

export const loader: LoaderFunction = async ({request}) => {
    const userId = await requireUserId(request);
    const user = await getUserById(userId)
    return {user}
}

export default function User() {
    const user = useLoaderData()
    console.log(user)
    return(
        <div className="flex flex-col gap-1 bg-stone-800 p-4 rounded-lg max-w-2xl">
            <div className="flex flex-col py-3 border-b border-stone-700 w-full">
                <p className="text-sm font-semibold tracking-wider uppercase">email</p>
                <p className="truncate ..."><span className="font-thin text-lg">{user.user.email}</span></p>
            </div>
            <div className="flex flex-col py-3 border-b border-stone-700 w-full last:border-0">
                <p className="text-sm font-semibold tracking-wider uppercase">User created</p>
                <p><span className="font-thin text-lg">{moment(user.user.createdAt).format('MMM DD, YYYY')}</span></p>
            </div>
        </div>
    )
}