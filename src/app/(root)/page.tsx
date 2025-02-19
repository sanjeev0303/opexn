import ExihibitionCard from "@/components/global/exihibition-card";
import { HeroSlider } from "@/components/global/home";
import React from "react";

type Props = {};

const HomePage = () => {
  return (
    <section>
      <HeroSlider />
      <ExihibitionCard />
    </section>
  );
};

export default HomePage;
