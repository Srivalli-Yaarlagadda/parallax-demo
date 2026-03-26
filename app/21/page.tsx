import { UShapeNavbar } from "../components/UShapeNavbar";
import HeroSection from "../components/HeroSection";
import Timeline from "../components/HorizontalTimeline/timeline";
import AnimatedButtons from "../components/Animated buttons/button";
import Curvedimage from "../components/CurvedimageScrolling/Curvedimage";
import ImgSlideshow from "../components/Imagesslideshow/ImgSlideshow";
import CollectionSection from "../components/Parallaxforsections/collections";
import Contact from "../components/contact";
import HorizontalScrolling from "../components/HorizontalpinnedSection/HorizontalScrolling";
import VerticalScroll from "../components/VerticalpinnedSection/VerticalScrolling";
import FundingChart from "../components/FundingChart";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTopBtn/ScrollToTop";

const links = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Gallery", href: "#gallery" },
  { label: "Blogs", href: "#blog" },
  { label: "Brands", href: "#brands" },
];

function SectionPlaceholder({
  id,
  title,
  className = "bg-neutral-100",
}: {
  id: string;
  title: string;
  className?: string;
}) {
  return (
    <section id={id} className={`py-16 px-6 ${className}`}>
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-2xl font-semibold text-neutral-800">{title}</h2>
      </div>
    </section>
  );
}

export default function UShapeNavbarPage() {
  return (
    <>
      <UShapeNavbar
        brandName="Brand"
        logoUrl="/logoeg.png"
        logoHref="#hero"
        links={links}
        ctaLabel="Contact Us"
        ctaHref="#contact"
      />
      <div id="hero">
        <HeroSection />
      </div>
      <SectionPlaceholder id="about" title="About" />
      <div id="timeline">
        <Timeline />
      </div>
      <SectionPlaceholder id="our-team" title="Our Team" />
      <SectionPlaceholder
        id="science-technology"
        title="Science & Technology"
        className="bg-white"
      />
      <AnimatedButtons />
      <Curvedimage />
      <div id="gallery">
        <ImgSlideshow />
      </div>
      <SectionPlaceholder id="blog" title="Blogs" />
      <CollectionSection />
      <SectionPlaceholder id="brands" title="Brands" />
      <SectionPlaceholder id="careers" title="Careers" className="bg-white" />
      <SectionPlaceholder id="faq" title="FAQ" />
      <div id="contact">
        <Contact />
      </div>
      <HorizontalScrolling />
      <VerticalScroll />
      <FundingChart />
      <Footer />
      <ScrollToTop />
    </>
  );
}
