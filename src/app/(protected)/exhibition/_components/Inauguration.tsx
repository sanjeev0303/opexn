'use client';
import { ShineBorder } from "./shine-border";
import { MagicCardDemo } from "./shop";

export function ShineBorderDemo() {
    return (
        <div className="p-2 md:p-5 ">
            <ShineBorder
                className="relative w-full h-48 md:h-96 rounded-lg mt-2 bg-slate-800 text-white flex items-center justify-center overflow-hidden"
                color={["#cc0000", "#1a0000", "#FFBE7B"]}
                borderWidth={8}
            >
                <video
                    className="w-full h-full object-cover pointer-events-none"
                    autoPlay
                    loop
                    muted
                >
                    <source src={"curtain_reveal.mp4"} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </ShineBorder>

            <div className="flex  animate-spotlight ">
            <div className="flex flex-col mt-5 md:mt-10">
                <div className="flex flex-col md:flex-row mt-5 md:mt-10 w-full justify-center gap-4 md:gap-48">
                    <MagicCardDemo text="Pavilion 1" />
                    <MagicCardDemo text="Pavilion 2" />
                </div>

                <div className=" md:mt-14 mx-auto max-w-screen-xl overflow-hidden px-4">
                    <div className="text-3xl text-white font-bold mb-10"><center>Stalls</center></div>
                    <div className="grid ml-10 grid-cols-4 md:grid-cols-8 gap-4 md:gap-20 justify-center">
                        {[...Array(64)].map((_, i) => (
                            <span
                                key={i}
                                className="w-3 h-3 mt-4 mb-2 md:w-5 md:h-5 bg-red-500 rounded-full animate-emit delay-150"
                            />
                        ))}
                                        <div style={{ width: 500, height: 500 }}></div>

                    </div>
                </div>
            </div>


            <div className="mt-20 ml-2">
                <div className="flex flex-col-reverse">
                <MagicCardDemo text="Buyer Zone" />
                <MagicCardDemo text="Join Discussion" />
                <MagicCardDemo text="Visit Exhibition" />
                </div>
            </div>
            </div>

            <style jsx global>{`
                @keyframes emit {
                    0% {
                        transform: scale(1);
                        box-shadow: 0 0 0 0 rgba(204, 0, 0, 0.5);
                    }
                    50% {
                        transform: scale(1.5);
                        box-shadow: 0 0 20px 10px rgba(204, 0, 0, 0);
                    }
                    100% {
                        transform: scale(1);
                        box-shadow: 0 0 0 0 rgba(204, 0, 0, 0);
                    }
                }
                .animate-emit {
                    animation: emit 2s infinite ease-in-out;
                }
            `}</style>
        </div>
    );
}
