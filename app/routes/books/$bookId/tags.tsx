import { Outlet, useOutletContext } from "@remix-run/react";

export default function BookTagIndex() {
    const [search]: string = useOutletContext()
    // console.log('booktagindex seach ->', search)
    return (
        <div>
            <Outlet context={[search]}/>
        </div>
    )
}