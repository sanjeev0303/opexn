
import { EmblaOptionsType } from "embla-carousel";
// import EmblaCarousel from "../../components/embla-carousel/embla-carousel";
import EmblaCarousel from "../embla-carousel/embla-carousel";

// import { WarpBackground } from "@/components/ui/warp-background";
import "../embla-carousel/embla.css";

const OPTIONS: EmblaOptionsType = { loop: true };
const SLIDES = [
  {
    src: "/images/1.svg",
    heading: "India's First Virtual Platform for Exhibitions & Networking.",
    subHeading: "Revolutionizing the way businesses connect, showcase, and grow 100% online.",
  },
  {
    src: "/images/2.svg",
    heading: "Save Time. Save Money. Exhibit Smarter.",
    subHeading: "Seamlessly explore, network, and transact without the hassle of physical events.",
  },
  {
    src: "images/3.svg",
    heading: "One-Click Access to Deals, Samples & Offers.",
    subHeading: "Discover products, request samples, and secure exclusive deals—instantly.",
  },
  {
    src: "images/4.svg",
    heading: "Actionable Insights & Analytics for Smarter Decisions.",
    subHeading: "Track visitors, analyze trends, and optimize performance with real-time data.",
  },
  {
    src: "images/5.svg",
    heading: "Your Gateway to Sustainable, Global Exhibitions.",
    subHeading: "Connecting industries and advancing SDG goals through smarter, eco-friendly solutions.",
  },
  {
    src: "/images/6.svg",
    heading: "Your Gateway to Sustainable, Global Exhibitions.",
    subHeading: "Connecting industries and advancing SDG goals through smarter, eco-friendly solutions.",
  },
];

export const HeroSlider = () => {
  return (
    // <WarpBackground beamDuration={3} perspective={100}>
      <EmblaCarousel slides={SLIDES} options={OPTIONS} />
    // </WarpBackground>
  );
};
