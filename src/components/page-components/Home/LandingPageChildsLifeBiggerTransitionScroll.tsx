"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavbarContext } from "@/contexts/NavbarContext";
import Container from "@/components/common/Container";
import { Heading2 } from "@/components/common/Typography";

const SHADOW_LAYERS = [
  { width: "50%", height: "25%", blur: 80, opacity: 0.6 },
  { width: "60%", height: "30%", blur: 100, opacity: 0.4 },
  { width: "70%", height: "35%", blur: 120, opacity: 0.25 },
] as const;

const SHADOW_LAYERS_MOBILE = [
  { width: "50%", height: "25%", blur: 40, opacity: 0.6 },
  { width: "60%", height: "30%", blur: 50, opacity: 0.4 },
  { width: "70%", height: "35%", blur: 60, opacity: 0.25 },
] as const;

const BLUE_SHADOW_COLOR = "#7CCEFF";
const ANIMATION_DURATION_MS = 800;
const SCROLL_THRESHOLD = 150;
const TRANSITION_COOLDOWN_MS = 900;
const APPROACH_ZONE_PX_DESKTOP = 600;
const APPROACH_ZONE_PX_TABLET = 400;
const APPROACH_ZONE_PX_MOBILE = 250;
// Only "capture" scroll when this component is basically at the viewport edge.
const ENTRY_SNAP_OFFSET_PX_DESKTOP = 80;
const ENTRY_SNAP_OFFSET_PX_TABLET = 60;
const ENTRY_SNAP_OFFSET_PX_MOBILE = 40;
// Fast + smooth snap duration (for "buttery" entry).
const ENTRY_SNAP_SCROLL_MS = 260;

const BREAKPOINT_LG = 1024;
const BREAKPOINT_MD = 768;

type TransitionState = "first" | "second" | "exiting";
type EntryDirection = "from_above" | "from_below" | null;

const getResponsiveScrollValues = (width: number) => {
  const isMobile = width < BREAKPOINT_MD;
  const isTablet = width >= BREAKPOINT_MD && width < BREAKPOINT_LG;
  return {
    entrySnapOffset: isMobile
      ? ENTRY_SNAP_OFFSET_PX_MOBILE
      : isTablet
      ? ENTRY_SNAP_OFFSET_PX_TABLET
      : ENTRY_SNAP_OFFSET_PX_DESKTOP,
    approachZone: isMobile
      ? APPROACH_ZONE_PX_MOBILE
      : isTablet
      ? APPROACH_ZONE_PX_TABLET
      : APPROACH_ZONE_PX_DESKTOP,
  };
};

const LandingPageChildsLifeBiggerTransitionScroll = () => {
  const { setHideNavbarSectionInView } = useNavbarContext() ?? {};
  const [transitionState, setTransitionState] =
    useState<TransitionState>("first");
  const [isComponentInView, setIsComponentInView] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const accumulatedDelta = useRef(0);
  const lastDeltaSign = useRef<-1 | 0 | 1>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
  const lastTransitionTime = useRef(0);
  const isAnimating = useRef(false);
  const isEntering = useRef(false);
  const overflowRelockTimeout = useRef<number | null>(null);
  const transitionStateRef = useRef<TransitionState>(transitionState);
  const isComponentInViewRef = useRef(isComponentInView);
  const nextEntryDirection = useRef<EntryDirection>(null);

  const clearOverflowRelockTimeout = useCallback(() => {
    if (overflowRelockTimeout.current !== null) {
      window.clearTimeout(overflowRelockTimeout.current);
      overflowRelockTimeout.current = null;
    }
  }, []);

  useEffect(() => {
    transitionStateRef.current = transitionState;
    isComponentInViewRef.current = isComponentInView;
  }, [transitionState, isComponentInView]);

  useEffect(() => {
    const checkViewport = () => {
      setIsMobileOrTablet(window.innerWidth < BREAKPOINT_LG);
      setIsTouchDevice(window.matchMedia("(pointer: coarse)").matches);
    };
    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  useEffect(() => {
    setHideNavbarSectionInView?.(isComponentInView);
    return () => setHideNavbarSectionInView?.(false);
  }, [isComponentInView, setHideNavbarSectionInView]);

  const isTouchDeviceRef = useRef(false);
  useEffect(() => {
    isTouchDeviceRef.current = isTouchDevice;
  }, [isTouchDevice]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            setShowOverlay(false);
            setIsComponentInView(false);
            accumulatedDelta.current = 0;
            isAnimating.current = false;
            clearOverflowRelockTimeout();
            if (containerRef.current) {
              const rect = containerRef.current.getBoundingClientRect();
              nextEntryDirection.current =
                rect.bottom < 0 ? "from_below" : "from_above";
            }
          } else if (isTouchDeviceRef.current) {
            // On touch devices, user scrolls normally - mark as in view for navbar hide
            setIsComponentInView(true);
          }
        });
      },
      { threshold: 0 }
    );
    const el = containerRef.current;
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, [clearOverflowRelockTimeout]);

  useEffect(() => {
    /* Only hide overflow when in "first" state - allows scrollbar when on second screen */
    /* On touch devices, never lock overflow - let user scroll normally through both sections */
    if (!isTouchDevice && isComponentInView && transitionState === "first") {
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
  }, [isComponentInView, transitionState, isTouchDevice]);

  useEffect(() => {
    const snapToSection = (
      section: "first" | "second",
      behavior: ScrollBehavior = "auto"
    ) => {
      const el =
        section === "first" ? section1Ref.current : section2Ref.current;
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
      // Use an immediate snap here to avoid fighting the user's scroll direction
      // (smooth scrolling can look like "scroll up makes it go down").
      window.scrollTo({ top, behavior: "auto" });
      // IMPORTANT: this relock must be cancellable; otherwise it can fire after exit
      // and trap the user (can't scroll up/down).
      clearOverflowRelockTimeout();
      overflowRelockTimeout.current = window.setTimeout(() => {
        /* Only relock when in "first" state - keep scrollbar visible on second screen */
        /* Never relock on touch devices - they scroll normally */
        const shouldLock =
          !isTouchDeviceRef.current &&
          isComponentInViewRef.current &&
          transitionStateRef.current === "first";
        if (!shouldLock) return;
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

      const { entrySnapOffset, approachZone } = getResponsiveScrollValues(
        window.innerWidth
      );

      if (!isComponentInView) {
        // Scrolling UP into this component (coming from below): snap when its bottom is near viewport bottom.
        if (e.deltaY < 0) {
          const shouldSnapFromBelow =
            rect.bottom >= vh - entrySnapOffset &&
            rect.bottom <= vh + approachZone &&
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
            lastDeltaSign.current = 0;
            lastTransitionTime.current = Date.now();
            isAnimating.current = true;
            setTimeout(() => {
              isAnimating.current = false;
            }, TRANSITION_COOLDOWN_MS);
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
            rect.top <= vh - entrySnapOffset &&
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
            lastDeltaSign.current = 0;
            lastTransitionTime.current = Date.now();
            isAnimating.current = true;
            setTimeout(() => {
              isAnimating.current = false;
            }, TRANSITION_COOLDOWN_MS);
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
      if (
        isAnimating.current ||
        now - lastTransitionTime.current < TRANSITION_COOLDOWN_MS
      )
        return;

      // Accumulate only in a single direction. Trackpad momentum can briefly flip deltaY,
      // which previously caused accidental opposite transitions.
      const sign: -1 | 0 | 1 = e.deltaY === 0 ? 0 : e.deltaY > 0 ? 1 : -1;
      if (sign !== 0 && sign !== lastDeltaSign.current) {
        accumulatedDelta.current = 0;
        lastDeltaSign.current = sign;
      }
      accumulatedDelta.current += Math.abs(e.deltaY);
      if (accumulatedDelta.current < SCROLL_THRESHOLD) return;

      accumulatedDelta.current = 0;
      lastDeltaSign.current = 0;
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
          clearOverflowRelockTimeout();
          document.body.style.overflow = "";
          document.documentElement.style.overflow = "";
          accumulatedDelta.current = 0;
          lastDeltaSign.current = 0;
          const container = containerRef.current;
          if (container) {
            const targetTop = container.offsetTop + container.offsetHeight;
            window.scrollTo({ top: targetTop, behavior: "smooth" });
          }
          setTimeout(() => {
            isAnimating.current = false;
          }, 500);
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
            accumulatedDelta.current = 0;
            lastDeltaSign.current = 0;
          }, ANIMATION_DURATION_MS);
        } else if (transitionState === "first") {
          setTransitionState("exiting");
          nextEntryDirection.current = "from_above";
          clearOverflowRelockTimeout();
          document.body.style.overflow = "";
          document.documentElement.style.overflow = "";
          accumulatedDelta.current = 0;
          lastDeltaSign.current = 0;
          const r = containerRef.current?.getBoundingClientRect();
          if (r) window.scrollBy({ top: -r.top - 50, behavior: "smooth" });
          setTimeout(() => {
            isAnimating.current = false;
          }, 100);
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      clearOverflowRelockTimeout();
    };
  }, [isComponentInView, transitionState, clearOverflowRelockTimeout]);

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
        className="w-full relative overflow-hidden min-h-screen max-h-screen h-screen bg-background py-4 sm:py-5 md:py-6"
      >
        <Container className="h-full">
          <div className="flex flex-col items-center w-full h-full px-3 sm:px-4 gap-6 sm:gap-10 md:gap-12 lg:gap-16">
            <Heading2
              className="text-white text-center leading-[120%]! relative z-20 shrink-0 px-2 sm:px-0"
              style={{
                opacity: isOnSecondScreen ? 0 : 1,
                transition: `opacity ${ANIMATION_DURATION_MS}ms linear`,
              }}
            >
              Your child&apos;s life is bigger than asthma.{" "}
              <br className="hidden sm:block" />
              It&apos;s made of moments you never want to miss.
            </Heading2>
            <div className="relative w-full flex-1 min-h-0 max-w-[95vw] sm:max-w-[90vw] md:max-w-[85vw] lg:max-w-[911.91px]">
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
                  filter: isMobileOrTablet ? "blur(48px)" : "blur(92px)",
                }}
              >
                <Image
                  src="/assets/pages/landing/images/LandingPageChildsLifeBiggerTransitionScroll/shadow1Mix.svg"
                  alt="shadow 1 mix"
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
                  filter: isMobileOrTablet ? "blur(48px)" : "blur(92px)",
                }}
              >
                <Image
                  src="/assets/pages/landing/images/LandingPageChildsLifeBiggerTransitionScroll/shadow2Orange.svg"
                  alt="shadow 2 orange"
                  fill
                  className="object-contain"
                />
              </div>
              {/* CSS Shadow layers for center glow */}
              {(isMobileOrTablet ? SHADOW_LAYERS_MOBILE : SHADOW_LAYERS).map(
                (layer) => (
                  <div
                    key={`${layer.width}-${layer.height}-${layer.blur}-${layer.opacity}`}
                    className="absolute rounded-full"
                    style={shadowStyle(
                      layer.width,
                      layer.height,
                      layer.blur,
                      layer.opacity
                    )}
                  />
                )
              )}
              <div className="relative z-10 w-full h-full">
                <Image
                  src="/assets/pages/landing/images/LandingPageChildsLifeBiggerTransitionScroll/image.svg"
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
        className="w-full relative overflow-hidden min-h-screen max-h-screen h-screen flex items-center justify-center bg-background py-8 sm:py-12 md:py-16 lg:py-30"
      >
        {/* Image container - same as Section 1, then blurred */}
        <div
          className="absolute z-0 w-full h-full max-w-[95vw] sm:max-w-[90vw] md:max-w-[85vw] lg:max-w-[911.91px]"
          style={{
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
              filter: isMobileOrTablet ? "blur(48px)" : "blur(92px)",
            }}
          >
            <Image
              src="/assets/pages/landing/images/LandingPageChildsLifeBiggerTransitionScroll/shadow1Mix.svg"
              alt="shadow 1 mix"
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
              filter: isMobileOrTablet ? "blur(48px)" : "blur(92px)",
            }}
          >
            <Image
              src="/assets/pages/landing/images/LandingPageChildsLifeBiggerTransitionScroll/shadow2Orange.svg"
              alt="shadow 2 orange"
              fill
              className="object-contain"
            />
          </div>
          {/* CSS Shadow layers for center glow */}
          {(isMobileOrTablet ? SHADOW_LAYERS_MOBILE : SHADOW_LAYERS).map(
            (layer) => (
              <div
                key={`${layer.width}-${layer.height}-${layer.blur}-${layer.opacity}`}
                className="absolute rounded-full"
                style={shadowStyleAlwaysVisible(
                  layer.width,
                  layer.height,
                  layer.blur,
                  layer.opacity
                )}
              />
            )
          )}
          <div
            className="relative w-full h-full z-10"
            style={{
              boxShadow: "0px 4px 4px 0px #00000040",
            }}
          >
            <Image
              src="/assets/pages/landing/images/LandingPageChildsLifeBiggerTransitionScroll/image.svg"
              alt="Child's Life is Bigger than Asthma"
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
        <Heading2 className="text-white text-center leading-[120%]! relative z-20 px-4 sm:px-6 md:px-8 max-w-[1200px]">
          But behind your family&apos;s favorite moments,{" "}
          <br className="hidden sm:block" /> the{" "}
          <span className="text-[#5754ED]">
            air can change in ways you can&apos;t see,{" "}
            <br className="hidden sm:block" />
          </span>
          often long before symptoms appear.
        </Heading2>
      </section>

      {/* Overlay: during transition (first→second) – blurred image + text */}
      <div
        className="fixed inset-0 z-30 flex items-center justify-center pointer-events-none pt-8 pb-8 sm:pt-12 sm:pb-12 md:pt-16 md:pb-16 lg:pt-[120px] lg:pb-[120px]"
        style={{
          backgroundColor: "#0B0C26",
          opacity: showOverlay ? 1 : 0,
          transition: `opacity ${ANIMATION_DURATION_MS}ms linear`,
        }}
      >
        <div
          className="absolute w-full h-full max-w-[95vw] sm:max-w-[90vw] md:max-w-[85vw] lg:max-w-[911.91px]"
          style={{
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          {(isMobileOrTablet ? SHADOW_LAYERS_MOBILE : SHADOW_LAYERS).map(
            (layer) => (
              <div
                key={`${layer.width}-${layer.height}-${layer.blur}-${layer.opacity}`}
                className="absolute rounded-full"
                style={shadowStyleAlwaysVisible(
                  layer.width,
                  layer.height,
                  layer.blur,
                  layer.opacity
                )}
              />
            )
          )}
          <div className="relative w-full h-full z-10">
            <Image
              src="/assets/pages/landing/images/LandingPageChildsLifeBiggerTransitionScroll/image.svg"
              alt="Child's Life is Bigger than Asthma"
              fill
              className="object-contain"
              loading="eager"
              style={{ filter: "blur(30px)", opacity: 0.6 }}
            />
          </div>
        </div>
        <Heading2
          className="text-white text-center leading-[120%]! relative z-10 px-4 sm:px-6 md:px-8 max-w-[1200px]"
          style={{
            transform: showOverlay
              ? "translateY(0)"
              : isMobileOrTablet
              ? "translateY(-80px)"
              : "translateY(-150px)",
            opacity: showOverlay ? 1 : 0,
            transition: `transform ${ANIMATION_DURATION_MS}ms linear, opacity ${ANIMATION_DURATION_MS}ms linear`,
          }}
        >
          But behind your family&apos;s favorite moments,{" "}
          <br className="hidden sm:block" /> the{" "}
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
