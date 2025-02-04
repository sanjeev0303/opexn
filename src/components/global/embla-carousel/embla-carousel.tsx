"use client";

import { cn } from "@/lib/utils";
import { EmblaCarouselType, EmblaEventType, EmblaOptionsType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import React, { useCallback, useEffect, useRef } from "react";
// import { Button } from "../ui/button";
import { usePrevNextButtons } from "./embla-carousel-arrow-buttons";
import { useAutoplay } from "./embla-carousel-autoplay";
import { useAutoplayProgress } from "./embla-carousel-autoplay-progress";
import ClassNames from "embla-carousel-class-names";
import { Button } from "@/components/ui/button";

type PropType = {
  slides: {
    src: StaticImageData;
    heading: string;
    subHeading: string;
  }[];
  options?: EmblaOptionsType;
};
const TWEEN_FACTOR_BASE = 0.2;

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const progressNode = useRef<HTMLDivElement>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay({ playOnInit: true, delay: 3000 }), ClassNames()]);
  const tweenFactor = useRef(0);
  const tweenNodes = useRef<HTMLElement[]>([]);

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi);

  const { autoplayIsPlaying, toggleAutoplay, onAutoplayButtonClick } = useAutoplay(emblaApi);

  const { showAutoplayProgress } = useAutoplayProgress(emblaApi, progressNode);

  const setTweenNodes = useCallback((emblaApi: EmblaCarouselType): void => {
    tweenNodes.current = emblaApi.slideNodes().map((slideNode) => {
      return slideNode.querySelector(".embla__parallax__layer") as HTMLElement;
    });
  }, []);

  const setTweenFactor = useCallback((emblaApi: EmblaCarouselType) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length;
  }, []);

  const tweenParallax = useCallback((emblaApi: EmblaCarouselType, eventName?: EmblaEventType) => {
    const engine = emblaApi.internalEngine();
    const scrollProgress = emblaApi.scrollProgress();
    const slidesInView = emblaApi.slidesInView();
    const isScrollEvent = eventName === "scroll";

    emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
      let diffToTarget = scrollSnap - scrollProgress;
      const slidesInSnap = engine.slideRegistry[snapIndex];

      slidesInSnap.forEach((slideIndex) => {
        if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

        if (engine.options.loop) {
          engine.slideLooper.loopPoints.forEach((loopItem) => {
            const target = loopItem.target();

            if (slideIndex === loopItem.index && target !== 0) {
              const sign = Math.sign(target);

              if (sign === -1) {
                diffToTarget = scrollSnap - (1 + scrollProgress);
              }
              if (sign === 1) {
                diffToTarget = scrollSnap + (1 - scrollProgress);
              }
            }
          });
        }

        const translate = diffToTarget * (-1 * tweenFactor.current) * 100;
        const tweenNode = tweenNodes.current[slideIndex];
        tweenNode.style.transform = `translateX(${translate}%)`;
      });
    });
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    setTweenNodes(emblaApi);
    setTweenFactor(emblaApi);
    tweenParallax(emblaApi);

    emblaApi
      .on("reInit", setTweenNodes)
      .on("reInit", setTweenFactor)
      .on("reInit", tweenParallax)
      .on("scroll", tweenParallax)
      .on("slideFocus", tweenParallax);
  }, [emblaApi, tweenParallax]);

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((slide, index) => (
            <div className="embla__slide" key={index}>
              {/* <div className="embla__slide__number">
              </div> */}
              <div className="embla__parallax">
                <div className="embla__parallax__layer">
                  <div className="absolute left-0 top-5 w-full bg-primary/30 p-2 text-sm font-semibold text-primary-foreground md:text-base lg:text-xl">
                    <p>{slide.heading}</p>
                    <p>{slide.subHeading}</p>
                  </div>
                  <Image
                    src={slide.src}
                    width={1080}
                    height={720}
                    className="h-auto w-full select-none rounded-md object-cover"
                    priority
                    alt={slide.heading}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls">


        <div className={cn("embla__progress", !showAutoplayProgress && "embla__progress--hidden")}>
          <div className="embla__progress__bar" ref={progressNode} />
        </div>

      </div>
      <div className="embla__buttons">
        <Button
          size="icon"
          variant="outline"
          onClick={() => onAutoplayButtonClick(onPrevButtonClick)}
          disabled={prevBtnDisabled}
        >
          <ChevronLeft />
        </Button>
        <Button
          size="icon"
          variant="outline"
          onClick={() => onAutoplayButtonClick(onNextButtonClick)}
          disabled={nextBtnDisabled}
        >
          <ChevronRight />
        </Button>
        <Button
          size="icon"
          variant="outline"
          onClick={toggleAutoplay}
          type="button"
        >
          {autoplayIsPlaying ? <Pause /> : <Play />}
        </Button>
      </div>
    </div>
  );
};

export default EmblaCarousel;
