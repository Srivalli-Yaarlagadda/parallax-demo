import { FrostedNavbar } from "../components/FrostedNavbar/FrostedNavbar";
import type { FrostedNavLink, FrostedNavLogo, FrostedNavCta } from "../components/FrostedNavbar/types";
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

const logo: FrostedNavLogo = {
  logoImageUrl: "/logoeg.png",
};
const links: FrostedNavLink[] = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Gallery", href: "#gallery" },
  { label: "Blogs", href: "#blog" },
  { label: "Brands", href: "#brands" },
];
const cta: FrostedNavCta = { label: "Contact", href: "#contact" };

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
        <p className="mt-2 text-neutral-600">Section content goes here.</p>
      </div>
    </section>
  );
}

export default function FrostedNavbarPage() {
  return (
    <>
      <FrostedNavbar logo={logo} links={links} cta={cta} />
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