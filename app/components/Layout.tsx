import Sidebar from "./Sidebar";
import { useState } from "react";
import NavBar from "./NavBar";

export default function Layout({children}: any) {
    const [isOpen, setIsOpen] = useState(false)
    const toggle = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div className="flex flex-col md:flex md:flex-row px-4 w-full mx-auto  text-stone-300/60">
            <NavBar toggle={toggle} isOpen={isOpen}/>
            <Sidebar toggle={toggle} isOpen={isOpen}/>
            <div className="w-full">
                {children}
            </div>
        </div>
    )
}