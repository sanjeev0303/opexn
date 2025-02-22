"use client"

import { EXHIBITIONS } from "@/config/exihibitions";
import AnimatedCard from "../animated-card";
import AnimatedTitle from "../animated-title";



const ExihibitionCard = () => {
  return (
     <div className='w-screen min-h-screen bg-slate-200 text-black'>
        <div className=" flex justify-center items-center flex-col overflow-x-hidden">
       <AnimatedTitle
          title={`Exhibhtion Now`}
          containerClass="mt-10 sm:mt-14 !text-black text-center"
        />
      <div className="mt-10 mb-2 lg:mb-4 flex flex-col gap-8 lg:gap-y-10">
        {EXHIBITIONS.map((item) => (
          <div key={item.id}>
            <AnimatedCard
            image={item.image}
            />
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default ExihibitionCard;
