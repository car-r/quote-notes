import { Link } from "@remix-run/react";
import TopAddBtn from "./TopAddBtn";

export default function AddBookBtn() {
    return (
        <Link to='/books/new'>
            <TopAddBtn children={`Add Book`}/>
        </Link>
    )
}