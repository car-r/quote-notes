import Footer from "~/components/Footer";
import Blog from "~/components/LandingPage/Blog";
import FeaturesSection from "~/components/LandingPage/FeaturesSection";
import HeroSection from "~/components/LandingPage/HeroSection";
import NavBar from "~/components/LandingPage/NavBar";
import Pricing from "~/components/LandingPage/Pricing";
import Reviews from "~/components/LandingPage/Reviews";

export default function Home() {
    return (
        <>
            <div className="flex flex-col w-full">
                <NavBar />
                <HeroSection />
                <FeaturesSection />
                <Pricing />
                <Reviews />
                <Blog />
                <Footer />
            </div>
        </>
    )
}