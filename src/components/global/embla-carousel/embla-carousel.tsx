"use client";

import clsx from "clsx";
import {
  EmblaCarouselType,
  EmblaEventType,
  EmblaOptionsType,
} from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import ClassNames from "embla-carousel-class-names";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import Image from "next/image";
import React, { useCallback, useEffect, useRef } from "react";
import { usePrevNextButtons } from "./embla-carousel-arrow-buttons";
import { useAutoplay } from "./embla-carousel-autoplay";
import { useAutoplayProgress } from "./embla-carousel-autoplay-progress";
import { motion } from "motion/react";
import { div } from "motion/react-client";

type PropType = {
  slides: {
    id: number;
    src: string;
    heading: string;
    subHeading: string;
  }[];
  options?: EmblaOptionsType;
};
const TWEEN_FACTOR_BASE = 0.2;

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const progressNode = useRef<HTMLDivElement>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({ playOnInit: true, delay: 3000 }),
    ClassNames(),
  ]);
  const tweenFactor = useRef(0);
  const tweenNodes = useRef<HTMLElement[]>([]);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const { autoplayIsPlaying, toggleAutoplay, onAutoplayButtonClick } =
    useAutoplay(emblaApi);

  const { showAutoplayProgress } = useAutoplayProgress(emblaApi, progressNode);

  const setTweenNodes = useCallback((emblaApi: EmblaCarouselType): void => {
    tweenNodes.current = emblaApi.slideNodes().map((slideNode) => {
      return slideNode.querySelector(".embla__parallax__layer") as HTMLElement;
    });
  }, []);

  const setTweenFactor = useCallback((emblaApi: EmblaCarouselType) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length;
  }, []);

  const tweenParallax = useCallback(
    (emblaApi: EmblaCarouselType, eventName?: EmblaEventType) => {
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
    },
    []
  );

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
    <div className="h-screen w-full relative">
      <div className={clsx("embla", "absolute top-28")}>
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {slides.map((item) => (
              <div
                className={clsx("embla__slide", "px-24 group/card group/text")}
                key={item.id}
              >
                <div className="embla__parallax">
                  <div className={clsx("embla__parallax__layer")}>
                    <img
                      className="embla__slide__img embla__parallax__img"
                      src={item.src}
                      alt="Your alt text"
                    />

                    <div className="absolute w-full h-full top-0 left-0 transition duration-500 group-hover/card:bg-black opacity-60"></div>

                    <div
                      className="absolute opacity-0 top-28 left-2 text-xl text-white
        group-hover/text:opacity-[100%]
        "
                    >
                      {item.subHeading}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="embla__buttons">
          <button
            onClick={() => onAutoplayButtonClick(onPrevButtonClick)}
            disabled={prevBtnDisabled}
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => onAutoplayButtonClick(onNextButtonClick)}
            disabled={nextBtnDisabled}
          >
            <ChevronRight size={24} />
          </button>
          <button onClick={toggleAutoplay} type="button">
            {autoplayIsPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmblaCarousel;
