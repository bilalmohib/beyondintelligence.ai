"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import Container from "@/components/common/Container";
import { Heading2 } from "@/components/common/Typography";

const SHADOW_LAYERS = [
    { width: "95%", height: "85%", blur: 100, opacity: 0.5 },
    { width: "130%", height: "100%", blur: 120, opacity: 0.35 },
    { width: "170%", height: "120%", blur: 140, opacity: 0.2 },
] as const;

const BLUE_SHADOW_COLOR = "#7CCEFF";
const IMAGE_CONTAINER_WIDTH = 800.1121826171875;
const IMAGE_CONTAINER_HEIGHT = 525.9652099609375;
const ANIMATION_DURATION_MS = 800;
const SCROLL_THRESHOLD = 150;
const TRANSITION_COOLDOWN_MS = 900;
const APPROACH_ZONE_PX = 600;

type TransitionState = "first" | "second" | "exiting";
type EntryDirection = "from_above" | "from_below" | null;

const LandingPageChildsLifeBiggerTransitionScroll = () => {
    const [transitionState, setTransitionState] = useState<TransitionState>("first");
    const [isComponentInView, setIsComponentInView] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false);
    const accumulatedDelta = useRef(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const section1Ref = useRef<HTMLDivElement>(null);
    const section2Ref = useRef<HTMLDivElement>(null);
    const lastTransitionTime = useRef(0);
    const isAnimating = useRef(false);
    const nextEntryDirection = useRef<EntryDirection>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) {
                        setShowOverlay(false);
                        setIsComponentInView(false);
                        accumulatedDelta.current = 0;
                        isAnimating.current = false;
                        if (containerRef.current) {
                            const rect = containerRef.current.getBoundingClientRect();
                            nextEntryDirection.current = rect.bottom < 0 ? "from_below" : "from_above";
                        }
                    }
                });
            },
            { threshold: 0 }
        );
        const el = containerRef.current;
        if (el) observer.observe(el);
        return () => { if (el) observer.unobserve(el); };
    }, []);

    useEffect(() => {
        if (isComponentInView && transitionState !== "exiting") {
            document.body.style.overflow = "hidden";
            document.documentElement.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
            document.documentElement.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
            document.documentElement.style.overflow = "";
        };
    }, [isComponentInView, transitionState]);

    useEffect(() => {
        const snapToSection = (section: "first" | "second") => {
            const el = section === "first" ? section1Ref.current : section2Ref.current;
            if (!el) return;
            const top = el.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({ top, behavior: "auto" });
        };

        const scrollToSeparatedSecond = () => {
            setShowOverlay(false);
            document.body.style.overflow = "";
            document.documentElement.style.overflow = "";
            const el = section2Ref.current;
            if (!el) return;
            const top = el.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({ top, behavior: "smooth" });
            setTimeout(() => {
                document.body.style.overflow = "hidden";
                document.documentElement.style.overflow = "hidden";
            }, 900);
        };

        const handleWheel = (e: WheelEvent) => {
            const el = containerRef.current;
            if (!el) return;

            const rect = el.getBoundingClientRect();
            const vh = window.innerHeight;

            if (!isComponentInView) {
                if (e.deltaY < 0) {
                    const approachingFromBelow = rect.bottom > -APPROACH_ZONE_PX && rect.top < vh;
                    if (approachingFromBelow) {
                        e.preventDefault();
                        e.stopPropagation();
                        snapToSection("second");
                        document.body.style.overflow = "hidden";
                        document.documentElement.style.overflow = "hidden";
                        setIsComponentInView(true);
                        setTransitionState("second");
                        setShowOverlay(false);
                        nextEntryDirection.current = null;
                        accumulatedDelta.current = 0;
                        lastTransitionTime.current = Date.now();
                        isAnimating.current = true;
                        setTimeout(() => { isAnimating.current = false; }, TRANSITION_COOLDOWN_MS);
                        return;
                    }
                }
                if (e.deltaY > 0) {
                    const approachingFromAbove = rect.top > vh && rect.top < vh + APPROACH_ZONE_PX;
                    if (approachingFromAbove) {
                        e.preventDefault();
                        e.stopPropagation();
                        snapToSection("first");
                        document.body.style.overflow = "hidden";
                        document.documentElement.style.overflow = "hidden";
                        setIsComponentInView(true);
                        setTransitionState("first");
                        setShowOverlay(false);
                        nextEntryDirection.current = null;
                        accumulatedDelta.current = 0;
                        lastTransitionTime.current = Date.now();
                        isAnimating.current = true;
                        setTimeout(() => { isAnimating.current = false; }, TRANSITION_COOLDOWN_MS);
                        return;
                    }
                }
            }

            if (!isComponentInView || transitionState === "exiting") return;

            e.preventDefault();
            e.stopPropagation();

            const now = Date.now();
            if (isAnimating.current || now - lastTransitionTime.current < TRANSITION_COOLDOWN_MS) return;

            accumulatedDelta.current += Math.abs(e.deltaY);
            if (accumulatedDelta.current < SCROLL_THRESHOLD) return;

            accumulatedDelta.current = 0;
            lastTransitionTime.current = now;
            isAnimating.current = true;

            if (e.deltaY > 0) {
                if (transitionState === "first") {
                    setTransitionState("second");
                    setShowOverlay(true);
                    setTimeout(() => {
                        isAnimating.current = false;
                        scrollToSeparatedSecond();
                    }, TRANSITION_COOLDOWN_MS);
                } else if (transitionState === "second") {
                    setTransitionState("exiting");
                    setShowOverlay(false);
                    nextEntryDirection.current = "from_below";
                    document.body.style.overflow = "";
                    document.documentElement.style.overflow = "";
                    const r = containerRef.current?.getBoundingClientRect();
                    if (r) window.scrollBy({ top: r.height - r.top + 50, behavior: "smooth" });
                    setTimeout(() => { isAnimating.current = false; }, 500);
                }
            } else if (e.deltaY < 0) {
                if (transitionState === "second") {
                    setShowOverlay(false);
                    setTimeout(() => {
                        setTransitionState("first");
                        isAnimating.current = false;
                        document.body.style.overflow = "";
                        document.documentElement.style.overflow = "";
                        snapToSection("first");
                        requestAnimationFrame(() => {
                            document.body.style.overflow = "hidden";
                            document.documentElement.style.overflow = "hidden";
                        });
                    }, ANIMATION_DURATION_MS);
                } else if (transitionState === "first") {
                    setTransitionState("exiting");
                    nextEntryDirection.current = "from_above";
                    document.body.style.overflow = "";
                    document.documentElement.style.overflow = "";
                    const r = containerRef.current?.getBoundingClientRect();
                    if (r) window.scrollBy({ top: -r.top - 50, behavior: "smooth" });
                    setTimeout(() => { isAnimating.current = false; }, 100);
                }
            }
        };

        window.addEventListener("wheel", handleWheel, { passive: false });
        return () => window.removeEventListener("wheel", handleWheel);
    }, [isComponentInView, transitionState]);

    const isOnSecondScreen = transitionState === "second";

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
        opacity: isOnSecondScreen ? 0 : baseOpacity,
        transition: `opacity ${ANIMATION_DURATION_MS}ms linear`,
        zIndex: 1,
    });

    return (
        <div ref={containerRef} className="w-full relative overflow-hidden">
            {/* Section 1: First screen */}
            <section
                ref={section1Ref}
                className="w-full relative overflow-hidden py-30 min-h-screen max-h-screen h-screen"
                style={{ backgroundColor: "#0B0C26" }}
            >
                <Container className="h-full">
                    <div className="flex flex-col justify-center items-center w-full h-full px-4" style={{ gap: 64 }}>
                        <Heading2
                            className="text-white text-center leading-[120%]! relative z-20"
                            style={{
                                opacity: isOnSecondScreen ? 0 : 1,
                                transition: `opacity ${ANIMATION_DURATION_MS}ms linear`,
                            }}
                        >
                            Your child&apos;s life is bigger than asthma. <br />
                            It&apos;s made of moments you never want to miss.
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
                </Container>
            </section>

            {/* Section 2: Second screen – blurred image behind text */}
            <section
                ref={section2Ref}
                className="w-full relative overflow-hidden min-h-screen max-h-screen h-screen flex items-center justify-center"
                style={{ backgroundColor: "#0B0C26" }}
            >
                {/* Blurred collage positioned in center, same size as first screen */}
                <div
                    className="absolute z-0"
                    style={{
                        width: IMAGE_CONTAINER_WIDTH,
                        height: IMAGE_CONTAINER_HEIGHT,
                        left: "50%",
                        top: "50%",
                        transform: "translate(-50%, -50%)",
                    }}
                >
                    <Image
                        src="/assets/components/transition1/image.png"
                        alt=""
                        fill
                        className="object-cover"
                        style={{ filter: "blur(24px)", opacity: 0.6 }}
                    />
                </div>
                <Heading2
                    className="text-white text-center leading-[120%]! relative z-20 px-8 max-w-[1200px]"
                >
                    But behind your family&apos;s favorite moments, <br /> the{" "}
                    <span className="text-[#5754ED]">
                        air can change in ways you can&apos;t see, <br />
                    </span>
                    often long before symptoms appear.
                </Heading2>
            </section>

            {/* Overlay: during transition (first→second) – blurred image + text */}
            <div
                className="fixed inset-0 z-30 flex items-center justify-center pointer-events-none"
                style={{
                    backgroundColor: "#0B0C26",
                    opacity: showOverlay ? 1 : 0,
                    transition: `opacity ${ANIMATION_DURATION_MS}ms linear`,
                }}
            >
                {/* Blurred collage positioned in center, same size as first screen */}
                <div
                    className="absolute"
                    style={{
                        width: IMAGE_CONTAINER_WIDTH,
                        height: IMAGE_CONTAINER_HEIGHT,
                        left: "50%",
                        top: "50%",
                        transform: "translate(-50%, -50%)",
                    }}
                >
                    <Image
                        src="/assets/components/transition1/image.png"
                        alt=""
                        fill
                        className="object-cover"
                        style={{ filter: "blur(24px)", opacity: 0.6 }}
                    />
                </div>
                <Heading2
                    className="text-white text-center leading-[120%]! relative z-10 px-8"
                    style={{
                        transform: showOverlay ? "translateY(0)" : "translateY(-150px)",
                        opacity: showOverlay ? 1 : 0,
                        transition: `transform ${ANIMATION_DURATION_MS}ms linear, opacity ${ANIMATION_DURATION_MS}ms linear`,
                        maxWidth: "1200px",
                    }}
                >
                    But behind your family&apos;s favorite moments, <br /> the{" "}
                    <span className="text-[#5754ED]">
                        air can change in ways you can&apos;t see, <br />
                    </span>
                    often long before symptoms appear.
                </Heading2>
            </div>
        </div>
    );
};

export default LandingPageChildsLifeBiggerTransitionScroll;
