import Link from "next/link";
import Hero from "@/components/Hero";
import InfoBoxes from "@/components/InfoBoxes";
import HomeProperties from "@/components/HomeProperities";

import connectdb from "@/config/database";


const HomePage = () => {
    connectdb();
    console.log(process.env.MONGODB_URI)
    return ( <div>
        <Hero />
        <InfoBoxes />
        <HomeProperties />
    </div> );
}

export default HomePage;