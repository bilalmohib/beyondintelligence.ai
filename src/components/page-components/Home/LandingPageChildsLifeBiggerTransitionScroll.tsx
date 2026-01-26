"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import Container from "@/components/common/Container";
import { Heading2 } from "@/components/common/Typography";

const SHADOW_LAYERS = [
    { width: "50%", height: "25%", blur: 80, opacity: 0.6 },
    { width: "60%", height: "30%", blur: 100, opacity: 0.4 },
    { width: "70%", height: "35%", blur: 120, opacity: 0.25 },
] as const;

const BLUE_SHADOW_COLOR = "#7CCEFF";
const IMAGE_CONTAINER_WIDTH = 911.91;
const IMAGE_CONTAINER_HEIGHT = 576.75;

const IMAGE_ASPECT_RATIO = IMAGE_CONTAINER_WIDTH / IMAGE_CONTAINER_HEIGHT;
const ANIMATION_DURATION_MS = 800;
const SCROLL_THRESHOLD = 150;
const TRANSITION_COOLDOWN_MS = 900;
const APPROACH_ZONE_PX = 600;
// Only "capture" scroll when this component is basically at the viewport edge.
const ENTRY_SNAP_OFFSET_PX = 80;
// Fast + smooth snap duration (for "buttery" entry).
const ENTRY_SNAP_SCROLL_MS = 260;

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
    const isEntering = useRef(false);
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
        const snapToSection = (section: "first" | "second", behavior: ScrollBehavior = "auto") => {
            const el = section === "first" ? section1Ref.current : section2Ref.current;
            if (!el) return;
            const top = el.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({ top, behavior });
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

            // While we are doing the short entry snap, ignore all wheel input
            // so the snap feels smooth and doesn't stutter.
            if (isEntering.current) {
                e.preventDefault();
                e.stopPropagation();
                return;
            }

            if (!isComponentInView) {
                // Scrolling UP into this component (coming from below): snap when its bottom is near viewport bottom.
                if (e.deltaY < 0) {
                    const shouldSnapFromBelow =
                        rect.bottom >= vh - ENTRY_SNAP_OFFSET_PX &&
                        rect.bottom <= vh + APPROACH_ZONE_PX &&
                        rect.top < vh;

                    if (shouldSnapFromBelow) {
                        e.preventDefault();
                        e.stopPropagation();
                        isEntering.current = true;
                        snapToSection("second", "smooth");
                        setTransitionState("second");
                        setShowOverlay(false);
                        nextEntryDirection.current = null;
                        accumulatedDelta.current = 0;
                        lastTransitionTime.current = Date.now();
                        isAnimating.current = true;
                        setTimeout(() => { isAnimating.current = false; }, TRANSITION_COOLDOWN_MS);
                        setTimeout(() => {
                            setIsComponentInView(true);
                            isEntering.current = false;
                        }, ENTRY_SNAP_SCROLL_MS);
                        return;
                    }
                }

                // Scrolling DOWN into this component (coming from above): snap once the component
                // has actually entered the viewport (so we don't steal scroll from the slider above).
                if (e.deltaY > 0) {
                    const shouldSnapFromAbove =
                        rect.top >= 0 &&
                        rect.top <= vh - ENTRY_SNAP_OFFSET_PX &&
                        rect.bottom > 0;

                    if (shouldSnapFromAbove) {
                        e.preventDefault();
                        e.stopPropagation();
                        isEntering.current = true;
                        snapToSection("first", "smooth");
                        setTransitionState("first");
                        setShowOverlay(false);
                        nextEntryDirection.current = null;
                        accumulatedDelta.current = 0;
                        lastTransitionTime.current = Date.now();
                        isAnimating.current = true;
                        setTimeout(() => { isAnimating.current = false; }, TRANSITION_COOLDOWN_MS);
                        setTimeout(() => {
                            setIsComponentInView(true);
                            isEntering.current = false;
                        }, ENTRY_SNAP_SCROLL_MS);
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
                    const container = containerRef.current;
                    if (container) {
                        const targetTop = container.offsetTop + container.offsetHeight;
                        window.scrollTo({ top: targetTop, behavior: "smooth" });
                    }
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
        top: "50%",
        transform: "translate(-50%, -50%)",
        borderRadius: "50%",
        backgroundColor: BLUE_SHADOW_COLOR,
        filter: `blur(${blur}px)`,
        opacity: isOnSecondScreen ? 0 : baseOpacity,
        transition: `opacity ${ANIMATION_DURATION_MS}ms linear`,
        zIndex: 1,
    });

    const shadowStyleAlwaysVisible = (
        width: string,
        height: string,
        blur: number,
        baseOpacity: number
    ) => ({
        position: "absolute" as const,
        width,
        height,
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        borderRadius: "50%",
        backgroundColor: BLUE_SHADOW_COLOR,
        filter: `blur(${blur}px)`,
        opacity: baseOpacity,
        zIndex: 1,
    });

    return (
        <div ref={containerRef} className="w-full relative overflow-hidden">
            <section
                ref={section1Ref}
                className="w-full relative overflow-hidden min-h-screen max-h-screen h-screen bg-background py-6"
            >
                <Container className="h-full">
                    <div className="flex flex-col items-center w-full h-full px-4 gap-16">
                        <Heading2
                            className="text-white text-center leading-[120%]! relative z-20 shrink-0"
                            style={{
                                opacity: isOnSecondScreen ? 0 : 1,
                                transition: `opacity ${ANIMATION_DURATION_MS}ms linear`,
                            }}
                        >
                            Your child&apos;s life is bigger than asthma. <br />
                            It&apos;s made of moments you never want to miss.
                        </Heading2>
                        <div
                            className="relative w-full flex-1 min-h-0"
                            style={{
                                maxWidth: `${IMAGE_CONTAINER_WIDTH}px`,
                            }}
                        >
                            {/* Shadow 1 - Top Left */}
                            <div
                                className="absolute z-0"
                                style={{
                                    top: "-10%",
                                    left: "-15%",
                                    width: "60%",
                                    height: "60%",
                                    opacity: isOnSecondScreen ? 0 : 1,
                                    transition: `opacity ${ANIMATION_DURATION_MS}ms linear`,
                                    filter: "blur(92px)",
                                }}
                            >
                                <Image
                                    src="/assets/components/transition1/shadow1Mix.svg"
                                    alt=""
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            {/* Shadow 2 - Bottom Right */}
                            <div
                                className="absolute z-0"
                                style={{
                                    bottom: "-10%",
                                    right: "-10%",
                                    width: "50%",
                                    height: "50%",
                                    opacity: isOnSecondScreen ? 0 : 1,
                                    transition: `opacity ${ANIMATION_DURATION_MS}ms linear`,
                                    filter: "blur(92px)",
                                }}
                            >
                                <Image
                                    src="/assets/components/transition1/shadow2Orange.svg"
                                    alt=""
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            {/* CSS Shadow layers for center glow */}
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
                                    src="/assets/components/transition1/image.svg"
                                    alt="Child's Life is Bigger than Asthma"
                                    fill
                                    className="object-contain"
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
                className="w-full relative overflow-hidden min-h-screen max-h-screen h-screen flex items-center justify-center bg-background py-30"
            >
                {/* Image container - same as Section 1, then blurred */}
                <div
                    className="absolute z-0 w-full h-full"
                    style={{
                        maxWidth: `${IMAGE_CONTAINER_WIDTH}px`,
                        left: "50%",
                        top: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "110%",
                        height: "110%",
                        overflow: "visible",
                    }}
                >
                    {/* Shadow 1 - Top Left */}
                    <div
                        className="absolute z-0"
                        style={{
                            top: "-5%",
                            left: "-10%",
                            width: "50%",
                            height: "50%",
                            filter: "blur(92px)",
                        }}
                    >
                        <Image
                            src="/assets/components/transition1/shadow1Mix.svg"
                            alt=""
                            fill
                            className="object-contain"
                        />
                    </div>
                    {/* Shadow 2 - Bottom Right */}
                    <div
                        className="absolute z-0"
                        style={{
                            bottom: "-5%",
                            right: "-10%",
                            width: "50%",
                            height: "50%",
                            filter: "blur(92px)",
                        }}
                    >
                        <Image
                            src="/assets/components/transition1/shadow2Orange.svg"
                            alt=""
                            fill
                            className="object-contain"
                        />
                    </div>
                    {/* CSS Shadow layers for center glow */}
                    {SHADOW_LAYERS.map((layer, index) => (
                        <div
                            key={index}
                            className="absolute rounded-full"
                            style={shadowStyleAlwaysVisible(
                                layer.width,
                                layer.height,
                                layer.blur,
                                layer.opacity
                            )}
                        />
                    ))}
                    <div
                        className="relative w-full h-full z-10"
                        style={{
                            boxShadow: "0px 4px 4px 0px #00000040",
                        }}
                    >
                        <Image
                            src="/assets/components/transition1/image.svg"
                            alt=""
                            fill
                            className="object-contain"
                            loading="eager"
                            style={{ filter: "blur(10px)", opacity: 0.7 }}
                        />
                    </div>
                </div>
                {/* Dark overlay on top of blurred image - from Figma */}
                <div
                    className="absolute inset-0 z-5"
                    style={{
                        backgroundColor: "#0b0c26",
                        opacity: 0.6,
                    }}
                />
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
                    paddingTop: "120px",
                    paddingBottom: "120px",
                }}
            >
                <div
                    className="absolute w-full h-full"
                    style={{
                        maxWidth: `${IMAGE_CONTAINER_WIDTH}px`,
                        left: "50%",
                        top: "50%",
                        transform: "translate(-50%, -50%)",
                    }}
                >
                    {SHADOW_LAYERS.map((layer, index) => (
                        <div
                            key={index}
                            className="absolute rounded-full"
                            style={shadowStyleAlwaysVisible(
                                layer.width,
                                layer.height,
                                layer.blur,
                                layer.opacity
                            )}
                        />
                    ))}
                    <div className="relative w-full h-full z-10">
                        <Image
                            src="/assets/components/transition1/image.svg"
                            alt=""
                            fill
                            className="object-contain"
                            loading="eager"
                            style={{ filter: "blur(30px)", opacity: 0.6 }}
                        />
                    </div>
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
