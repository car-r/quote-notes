import { Link } from "@remix-run/react";
import TopAddBtn from "./TopAddBtn";

export default function AddAuthorBtn() {
    return (
        <Link to='/authors/new'>
            <TopAddBtn children={`Add Author`}/>
        </Link>
    )
}