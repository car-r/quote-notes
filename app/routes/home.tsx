import FeaturesSection from "~/components/LandingPage/FeaturesSection";
import HeroSection from "~/components/LandingPage/HeroSection";
import NavBar from "~/components/LandingPage/NavBar";
import Pricing from "~/components/LandingPage/Pricing";

export default function Home() {
    return (
        <>
            <div className="flex flex-col w-full">
                <NavBar />
                <HeroSection />
                <FeaturesSection />
                <Pricing />
            </div>
        </>
    )
}