import { Link } from "@remix-run/react";
import TopBackBtn from "./TopBackBtn";

export default function AuthorErrorBackBtn() {

    return (
        <Link to={`/authors`} >
            <TopBackBtn children={`Go Back`}/>
        </Link>
    )
}