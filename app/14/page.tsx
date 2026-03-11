import Navbar14 from "../components/Navbar1/navbar14";
import HeroSection from "../components/HeroSection";
import AnimatedButtons from "../components/Animated buttons/button";
import Curvedimage from "../components/CurvedimageScrolling/Curvedimage";
import HorizontalScrolling from "../components/HorizontalpinnedSection/HorizontalScrolling";
import VerticalScroll from "../components/VerticalpinnedSection/VerticalScrolling";
import ImgSlideshow from "../components/Imagesslideshow/ImgSlideshow";
import FundingChart from "../components/FundingChart";
import ScrollToTop from "../components/ScrollToTopBtn/ScrollToTop";
import CollectionSection from "../components/Parallaxforsections/collections";
import Contact from "../components/contact";
import Timeline from "../components/HorizontalTimeline/timeline";

export default function PageNavbar12() {
  return (
    <>
      <Navbar14 />
      <HeroSection />
      <Timeline />
      <AnimatedButtons />
      <Curvedimage />
      <ImgSlideshow />
      <CollectionSection />
      <Contact />
      <HorizontalScrolling />
      <VerticalScroll />
      <FundingChart />
      <ScrollToTop />
    </>
  );
}
