import type { LoaderFunction } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import EditUserBtn from "~/components/Buttons/EditUserBtn";
import PageTitle from "~/components/PageTitle";
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
    return (
        <div className="flex flex-col pt-6 md:pt-10 max-w-5xl">
            <PageTitle children={`Your account`} btn={<EditUserBtn />}/>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                <Outlet />
            </div>
        </div>
    )
}