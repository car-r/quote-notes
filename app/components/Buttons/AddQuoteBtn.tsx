import { Link } from "@remix-run/react";
import TopAddBtn from "./TopAddBtn";

export default function AddQuoteBtn() {
    return (
        <Link to='/quotes/new'>
            <TopAddBtn children={`Add Quote`}/>
        </Link>
    )
}