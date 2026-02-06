"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";
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
const BREAKPOINT_LG = 1024;

const LandingPageChildsLifeBiggerTransitionScroll = () => {
  const { setHideNavbarSectionInView } = useNavbarContext() ?? {};
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const checkViewport = () => {
      setIsMobileOrTablet(window.innerWidth < BREAKPOINT_LG);
    };
    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  // Smooth scroll progress calculation using requestAnimationFrame
  const updateScrollProgress = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    
    // Progress goes from 0 to 1 as we scroll through the container
    const scrollableHeight = viewportHeight * 2;
    const scrolled = -rect.top;
    
    let progress = 0;
    if (scrolled > 0) {
      progress = Math.min(1, scrolled / scrollableHeight);
    }
    
    setScrollProgress(progress);
    
    // Update navbar visibility during middle transition
    const isInView = rect.top < viewportHeight && rect.bottom > 0;
    setHideNavbarSectionInView?.(isInView && progress > 0.2 && progress < 0.8);
  }, [setHideNavbarSectionInView]);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      rafRef.current = requestAnimationFrame(updateScrollProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      setHideNavbarSectionInView?.(false);
    };
  }, [updateScrollProgress, setHideNavbarSectionInView]);

  // ===== APPLE-STYLE ANIMATION PHASES =====
  // Phase 1 (0 - 0.3): Section 1 fully visible
  // Phase 2 (0.3 - 0.6): Crossfade - Section 1 fades out, Section 2 fades in with text sliding down
  // Phase 3 (0.6 - 1): Section 2 fully visible, then scroll continues to next section
  
  // Section 1 opacity: Full until 0.3, then fades to 0 by 0.6
  const section1Opacity = scrollProgress <= 0.3 
    ? 1 
    : scrollProgress >= 0.6 
      ? 0 
      : 1 - ((scrollProgress - 0.3) / 0.3);
  
  // Section 2 opacity: 0 until 0.3, then fades to 1 by 0.6
  const section2Opacity = scrollProgress <= 0.3 
    ? 0 
    : scrollProgress >= 0.6 
      ? 1 
      : (scrollProgress - 0.3) / 0.3;
  
  // Text slides down: starts at -100px (above), ends at 0
  const textTranslateY = scrollProgress <= 0.3 
    ? -100 
    : scrollProgress >= 0.6 
      ? 0 
      : -100 + (100 * ((scrollProgress - 0.3) / 0.3));
  
  // First heading moves up as we scroll
  const heading1TranslateY = -scrollProgress * 100;
  
  // Image blur increases during transition
  const blurAmount = scrollProgress <= 0.3 
    ? 0 
    : scrollProgress >= 0.6 
      ? 30 
      : 30 * ((scrollProgress - 0.3) / 0.3);
  
  // Subtle scale on images
  const imageScale = 1 + scrollProgress * 0.08;

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
    opacity: baseOpacity * section1Opacity,
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
    <div 
      ref={containerRef} 
      className="w-full relative"
      style={{ 
        height: "300vh",
      }}
    >
      {/* Sticky container that stays in view while scrolling */}
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-background">
        
        {/* BASE LAYER: Blurred background image (always present, revealed when section 1 fades) */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute w-full h-full"
            style={{
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: "120%",
              height: "120%",
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
                  key={`bg-${layer.width}-${layer.height}-${layer.blur}-${layer.opacity}`}
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
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full h-full max-w-[95vw] sm:max-w-[90vw] md:max-w-[85vw] lg:max-w-[911.91px]">
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
          </div>
          {/* Dark overlay */}
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: "#0b0c26",
              opacity: 0.6,
            }}
          />
        </div>

        {/* SECTION 1: Clear images with heading (fades out) */}
        <section
          className="absolute inset-0 w-full h-full py-4 sm:py-5 md:py-6 z-10"
          style={{
            opacity: section1Opacity,
            pointerEvents: scrollProgress > 0.5 ? "none" : "auto",
          }}
        >
          <Container className="h-full">
            <div className="flex flex-col items-center w-full h-full px-3 sm:px-4 gap-6 sm:gap-10 md:gap-12 lg:gap-16">
              <Heading2
                className="text-white text-center leading-[120%]! relative z-20 shrink-0 px-2 sm:px-0"
                style={{
                  transform: `translateY(${heading1TranslateY}px)`,
                }}
              >
                Your child&apos;s life is bigger than asthma.{" "}
                <br className="hidden sm:block" />
                It&apos;s made of moments you never want to miss.
              </Heading2>
              <div 
                className="relative w-full flex-1 min-h-0 max-w-[95vw] sm:max-w-[90vw] md:max-w-[85vw] lg:max-w-[911.91px]"
                style={{
                  transform: `scale(${imageScale})`,
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
                      key={`s1-${layer.width}-${layer.height}-${layer.blur}-${layer.opacity}`}
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
                    style={{
                      filter: `blur(${blurAmount}px)`,
                    }}
                  />
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* SECTION 2: Text that slides down (fades in on top of blurred background) */}
        <div
          className="absolute inset-0 z-20 flex items-center justify-center"
          style={{
            opacity: section2Opacity,
            pointerEvents: scrollProgress < 0.3 ? "none" : "auto",
          }}
        >
          <Heading2 
            className="text-white text-center leading-[120%]! px-4 sm:px-6 md:px-8 max-w-[1200px]"
            style={{
              transform: `translateY(${textTranslateY}px)`,
            }}
          >
            But behind your family&apos;s favorite moments,{" "}
            <br className="hidden sm:block" /> the{" "}
            <span className="text-[#5754ED]">
              air can change in ways you can&apos;t see,{" "}
              <br className="hidden sm:block" />
            </span>
            often long before symptoms appear.
          </Heading2>
        </div>
      </div>
    </div>
  );
};

export default LandingPageChildsLifeBiggerTransitionScroll;
