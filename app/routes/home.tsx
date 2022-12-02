import FeaturesSection from "~/components/LandingPage/FeaturesSection";
import HeroSection from "~/components/LandingPage/HeroSection";
import NavBar from "~/components/LandingPage/NavBar";

export default function Home() {
    return (
        <>
            <div className="flex flex-col w-full">
                <NavBar />
                <HeroSection />
                <FeaturesSection />
            </div>
        </>
    )
}