import ShimmerButton from "@/components/ui/shimmer-button";
import { EXHIBITIONS } from "@/config/exihibitions";
import { ArrowRight } from "lucide-react";

const ExihibitionCard = () => {
  return (
    <div className="relative  flex justify-center items-center flex-col overflow-hidden">
      <h1 className="lg:text-6xl text-4xl font-bold">Exhibition Now</h1>
      <div className="">
        {EXHIBITIONS.map((item) => (
          <div key={item.id}>
            <div className="relative lg:px-24 lg:pt-16 p-5 border-white">
              <img
                src={item.image}
                alt="exhibition"
                className="object-contain z-5 size-25 rounded-2xl"
              />

              <ShimmerButton className="absolute z-10 bottom-[15%] left-1/2 -translate-x-1/2 dark:text-black">
                <h3 className="font-semibold text-black">Enter Exihibition</h3>
                <ArrowRight className="ml-1 text-black" />
              </ShimmerButton>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExihibitionCard;
