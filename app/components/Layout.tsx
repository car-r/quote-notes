import Sidebar from "./Sidebar";
import { useState } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";

export default function Layout({children}: any) {
    const [isOpen, setIsOpen] = useState(false)
    const toggle = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div>
        <div className="flex flex-col min-h-screen lg:flex lg:flex-row px-4 w-full mx-auto text-stone-300/60">
            <NavBar toggle={toggle} isOpen={isOpen}/>

            <Sidebar toggle={toggle} isOpen={isOpen}/>

            <div className="w-full overflow-auto px-1">
                {children}
            </div>

            
        </div>
        <Footer />
        </div>
    )
}