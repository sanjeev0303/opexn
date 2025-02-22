"use client";

import { Card } from "@/components/ui/card";
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

    const rotateX = ((yPos - centerY) / centerY) * -1;
    const rotateY = ((xPos - centerX) / centerX) * 1;

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
    redirect("/sign-in");
  };

  return (
    <Card
      ref={frameRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseLeave}
      onMouseEnter={handleMouseLeave}
      className="border-none relative lg:h-[90vh] md:h-[70vh] md:w-[90vw] lg:w-[90vw] min-h-[35vh] min-w-[90vw] "
    >
      <Image
        src={image}
        alt="exhibition"
        className="absolute object-cover w-full h-full rounded-lg size-30"
        width={1500}
        height={500}
      />

      <ShimmerButton
        className="absolute z-10 left-1/2 -translate-x-1/2 bottom-4 md:bottom-8 lg:bottom-12"
        onClick={handleClick}
      >
        <h3 className="font-semibold text-black">Enter Exihibition</h3>
        <ArrowRight className="ml-1 text-black" />
      </ShimmerButton>
    </Card>
  );
};

export default AnimatedCard;
