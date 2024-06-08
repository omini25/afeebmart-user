import {Header} from "../components/Layouts/Header.jsx";
import {Hero} from "../components/Routes/Hero.jsx";
import {Categories} from "../components/Routes/Categories.jsx";
import BestDeals from "../components/Routes/BestDeals.jsx";
import {FeaturedProducts} from "../components/Routes/FeaturedProducts.jsx";
import {Events} from "../components/Routes/Events.jsx";
import Footer from "../components/Layouts/Footer.jsx";




export const HomePage = () => {


    return (
        <>
        <Header activeHeading={1}/>
            <Hero />
            <Categories />
            <BestDeals />
            <Events />
            <FeaturedProducts />
            <Footer />
        </>
    );
};

export default HomePage;