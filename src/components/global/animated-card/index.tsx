"use client";

import ShimmerButton from "@/components/ui/shimmer-button";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";
import React, { useRef } from "react";

type Props = {
  // id: string
  image: string;
};

const AnimatedCard = ({ image }: Props) => {
  const frameRef = useRef<HTMLImageElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const element = frameRef.current;

    if (!element) return;

    const rect = element.getBoundingClientRect();
    const xPos = clientX - rect.left;
    const yPos = clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((yPos - centerY) / centerY) * -5;
    const rotateY = ((xPos - centerX) / centerX) * 5;

    gsap.to(element, {
      duration: 0.3,
      rotateX,
      rotateY,
      transformPerspective: 500,
      ease: "power1.inOut",
    });
  };

  const handleMouseLeave = () => {
    const element = frameRef.current;

    if (element) {
      gsap.to(element, {
        duration: 0.3,
        rotateX: 0,
        rotateY: 0,
        ease: "power1.inOut",
      });
    }
  };

  const handleClick = () => {
    redirect("/sign-in")
  };

  return (
    <div className="lg:h-[80vh] lg:w-[90vw] relative sm:mt-3 lg:px-28 lg:pt-16 lg:p-5 mt-8 md:p-5 px-5">
      <div>
        <Image
          ref={frameRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseLeave}
          onMouseEnter={handleMouseLeave}
          src={image}
          alt="exhibition"
          className="object-contain size-23 rounded-2xl"
          width={1500}
          height={500}
        />
      </div>

      <ShimmerButton className="absolute z-10 lg:bottom-10 md:bottom-8 left-1/2 -translate-x-1/2 dark:text-black"
      onClick={handleClick}
      >
        <h3 className="font-semibold text-black" >Enter Exihibition</h3>
        <ArrowRight className="ml-1 text-black" />
      </ShimmerButton>
    </div>
  );
};

export default AnimatedCard;
