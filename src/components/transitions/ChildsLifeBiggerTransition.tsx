"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Heading2 } from "@/components/common/Typography";

const SHADOW_LAYERS = [
    { width: "95%", height: "85%", blur: 100, opacity: 0.5 },
    { width: "130%", height: "100%", blur: 120, opacity: 0.35 },
    { width: "170%", height: "120%", blur: 140, opacity: 0.2 },
] as const;

const TRANSITION_DELAY_MS = 2000;
const ANIMATION_DURATION_MS = 800;
const BLUE_SHADOW_COLOR = "#7CCEFF";
const IMAGE_CONTAINER_WIDTH = 800.1121826171875;
const IMAGE_CONTAINER_HEIGHT = 525.9652099609375;

const ChildsLifeBiggerTransition = () => {
    const [isTransitioned, setIsTransitioned] = useState(false);

    useEffect(() => {
        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "";
            document.documentElement.style.overflow = "";
        };
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsTransitioned(true);
        }, TRANSITION_DELAY_MS);

        return () => clearTimeout(timer);
    }, []);

    const shadowStyle = (
        width: string,
        height: string,
        blur: number,
        baseOpacity: number
    ) => ({
        position: "absolute" as const,
        width,
        height,
        left: "50%",
        top: "60%",
        transform: "translate(-50%, -50%)",
        borderRadius: "50%",
        backgroundColor: BLUE_SHADOW_COLOR,
        filter: `blur(${blur}px)`,
        opacity: isTransitioned ? 0 : baseOpacity,
        transition: `opacity ${ANIMATION_DURATION_MS}ms linear`,
        zIndex: 1,
    });

    return (
        <div
            className="bg-white w-full relative overflow-hidden"
            style={{ height: "100vh", maxHeight: "100vh", minHeight: "100vh" }}
        >
            <div className="flex flex-col justify-center items-center gap-3 w-full h-full px-4">
                <Heading2
                    className="text-input-text text-center leading-[120%]! relative z-20"
                    style={{
                        opacity: isTransitioned ? 0 : 1,
                        transition: `opacity ${ANIMATION_DURATION_MS}ms linear`,
                    }}
                >
                    Your child's life is bigger than asthma. <br />
                    It's made of moments you never want to miss.
                </Heading2>

                <div
                    className="relative"
                    style={{
                        width: IMAGE_CONTAINER_WIDTH,
                        height: IMAGE_CONTAINER_HEIGHT,
                    }}
                >
                    {SHADOW_LAYERS.map((layer, index) => (
                        <div
                            key={index}
                            className="absolute rounded-full"
                            style={shadowStyle(
                                layer.width,
                                layer.height,
                                layer.blur,
                                layer.opacity
                            )}
                        />
                    ))}

                    <div className="relative z-10 w-full h-full">
                        <Image
                            src="/assets/components/transition1/image.png"
                            alt="Child's Life is Bigger than Asthma"
                            fill
                            className="object-cover"
                            loading="eager"
                        />
                    </div>
                </div>
            </div>

            <div
                className="fixed inset-0 z-30 flex items-center justify-center"
                style={{
                    backgroundColor: "rgba(255, 255, 255, 0.85)",
                    backdropFilter: "blur(14px)",
                    WebkitBackdropFilter: "blur(14px)",
                    opacity: isTransitioned ? 1 : 0,
                    transition: `opacity ${ANIMATION_DURATION_MS}ms linear`,
                    pointerEvents: isTransitioned ? "auto" : "none",
                }}
            >
                <Heading2
                    className="text-input-text text-center leading-[120%]! px-8"
                    style={{
                        transform: isTransitioned ? "translateY(0)" : "translateY(-150px)",
                        opacity: isTransitioned ? 1 : 0,
                        transition: `transform ${ANIMATION_DURATION_MS}ms linear, opacity ${ANIMATION_DURATION_MS}ms linear`,
                        maxWidth: "1200px",
                    }}
                >
                    But behind your family's favorite moments, <br /> the{" "}
                    <span className="text-[#095788]">
                        air can change in ways you can't see, <br />
                    </span>
                    often long before symptoms appear.
                </Heading2>
            </div>
        </div>
    );
};

export default ChildsLifeBiggerTransition;
