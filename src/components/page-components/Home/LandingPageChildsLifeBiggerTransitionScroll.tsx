"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";
import { useNavbarContext } from "@/contexts/NavbarContext";
import Container from "@/components/common/Container";
import { Heading2 } from "@/components/common/Typography";

const SHADOW_LAYERS = [
  { width: "55%", height: "30%", blur: 70, opacity: 1 },
  { width: "65%", height: "35%", blur: 90, opacity: 0.85 },
  { width: "75%", height: "40%", blur: 110, opacity: 0.65 },
] as const;

const SHADOW_LAYERS_MOBILE = [
  { width: "55%", height: "30%", blur: 35, opacity: 1 },
  { width: "65%", height: "35%", blur: 45, opacity: 0.85 },
  { width: "75%", height: "40%", blur: 55, opacity: 0.65 },
] as const;

const BLUE_SHADOW_COLOR = "#4AEAEF";
const BASE_GLOW_OPACITY_MULTIPLIER = 0.5;
const BASE_SHADOW_IMAGE_OPACITY = 0.6;
const BASE_SHADOW_BLUR_MULTIPLIER = 0.9;
const BASE_DARK_OVERLAY_OPACITY = 0.7;
const BREAKPOINT_LG = 1024;

const IMG_DIR =
  "/assets/pages/landing/images/LandingPageChildsLifeBiggerTransitionScroll";
const IMAGES = {
  desktop: {
    collage: `${IMG_DIR}/image.svg`,
    shadow1: `${IMG_DIR}/shadow1Mix.svg`,
    shadow2: `${IMG_DIR}/shadow2Orange.svg`,
  },
  mobile: {
    collage: `${IMG_DIR}/image-mobile.webp`,
    shadow1: `${IMG_DIR}/shadow1Mix-mobile.webp`,
    shadow2: `${IMG_DIR}/shadow2Orange-mobile.webp`,
  },
} as const;

/* ------------------------------------------------------------------ */
/*  Lerp helper – clamp progress within a sub-range to 0..1           */
/* ------------------------------------------------------------------ */
const remap = (v: number, lo: number, hi: number) =>
  Math.max(0, Math.min(1, (v - lo) / (hi - lo)));

const LandingPageChildsLifeBiggerTransitionScroll = () => {
  const { setHideNavbarSectionInView } = useNavbarContext() ?? {};
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

  /* ---- refs for direct DOM manipulation (no React re-render) ---- */
  const containerRef = useRef<HTMLDivElement>(null);
  const section1Ref = useRef<HTMLElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
  const heading1Ref = useRef<HTMLDivElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const blurOverlayRef = useRef<HTMLDivElement>(null);
  const baseLayerRef = useRef<HTMLDivElement>(null);
  const shadowGlowRefs = useRef<HTMLDivElement[]>([]);
  const rafRef = useRef<number | null>(null);
  const lastNavHidden = useRef(false);

  /* ---- viewport check ---- */
  useEffect(() => {
    const check = () => {
      setIsMobileOrTablet(window.innerWidth < BREAKPOINT_LG);
    };
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  /* ---- scroll handler – ZERO setState, direct DOM writes ---- */
  const lastProgress = useRef<number>(-1);
  const tick = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight;
    const scrolled = -rect.top;
    const progress = Math.max(0, Math.min(1, scrolled / (vh * 2)));

    // Skip redundant updates (Safari optimization)
    if (Math.abs(progress - lastProgress.current) < 0.001) return;
    lastProgress.current = progress;

    /* derived values */
    const s1Opacity = 1 - remap(progress, 0.3, 0.6);
    const s2Opacity = remap(progress, 0.3, 0.6);
    const textY = -100 + 100 * remap(progress, 0.3, 0.6);
    const h1Y = -progress * 100;
    const scale = 1 + progress * 0.08;

    /* Section 1 */
    if (section1Ref.current) {
      const s = section1Ref.current.style;
      s.opacity = String(s1Opacity);
      s.pointerEvents = progress > 0.5 ? "none" : "auto";
    }
    /* Heading 1 translate */
    if (heading1Ref.current) {
      heading1Ref.current.style.transform = `translate3d(0,${h1Y}px,0)`;
    }
    /* Image scale - use scale3d for better Safari GPU acceleration */
    if (imageWrapRef.current) {
      imageWrapRef.current.style.transform = `scale3d(${scale},${scale},1) translateZ(0)`;
    }
    /* Blur overlay (pre-blurred image revealed via opacity) */
    if (blurOverlayRef.current) {
      blurOverlayRef.current.style.opacity = String(remap(progress, 0.25, 0.55));
    }
    /* Base layer – hidden at start, revealed as section 1 fades */
    if (baseLayerRef.current) {
      baseLayerRef.current.style.opacity = String(remap(progress, 0.2, 0.5));
    }
    /* Section 2 */
    if (section2Ref.current) {
      const s = section2Ref.current.style;
      s.opacity = String(s2Opacity);
      s.pointerEvents = progress < 0.3 ? "none" : "auto";
      s.transform = `translate3d(0,${textY}px,0)`;
    }
    /* Shadow glow opacity follows section 1 */
    for (const div of shadowGlowRefs.current) {
      if (div) div.style.opacity = String(Number(div.dataset.baseOpacity ?? 0) * s1Opacity);
    }

    /* Navbar visibility */
    const isInView = rect.top < vh && rect.bottom > 0;
    const shouldHide = isInView && progress > 0.2 && progress < 0.8;
    if (shouldHide !== lastNavHidden.current) {
      lastNavHidden.current = shouldHide;
      setHideNavbarSectionInView?.(shouldHide);
    }
  }, [setHideNavbarSectionInView]);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => {
          tick();
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    // Initial call
    requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      setHideNavbarSectionInView?.(false);
    };
  }, [tick, setHideNavbarSectionInView]);

  const imgs = isMobileOrTablet ? IMAGES.mobile : IMAGES.desktop;

  const shadowStyleStatic = (
    width: string,
    height: string,
    blur: number,
    opacity: number,
  ) => ({
    position: "absolute" as const,
    width,
    height,
    left: "50%",
    top: "50%",
    transform: "translate3d(-50%, -50%, 0)",
    borderRadius: "50%",
    backgroundColor: BLUE_SHADOW_COLOR,
    filter: `blur(${blur}px)`,
    opacity,
    zIndex: 1,
    backfaceVisibility: "hidden" as const,
    WebkitBackfaceVisibility: "hidden" as const,
    willChange: "opacity",
  });

  const shadowStyleBase = (
    width: string,
    height: string,
    blur: number,
    opacity: number,
  ) => ({
    ...shadowStyleStatic(width, height, blur, opacity * BASE_GLOW_OPACITY_MULTIPLIER),
  });

  const layers = isMobileOrTablet ? SHADOW_LAYERS_MOBILE : SHADOW_LAYERS;
  const blurPx = isMobileOrTablet ? 48 : 92;

  return (
    <div
      ref={containerRef}
      className="w-full relative"
      style={{ 
        height: "300vh",
        // Safari scroll performance optimization
        transform: "translate3d(0,0,0)",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        willChange: "transform"
      }}
    >
      {/* Sticky container */}
      <div 
        className="sticky top-0 w-full h-screen overflow-hidden bg-background"
        style={{
          transform: "translate3d(0,0,0)",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          willChange: "transform",
          contain: "layout style paint"
        }}
      >

        {/* BASE LAYER – blurred background (hidden at start, revealed when Section 1 fades) */}
        <div 
          ref={baseLayerRef} 
          className="absolute inset-0 z-0" 
          style={{ 
            opacity: 0, 
            willChange: "opacity",
            transform: "translate3d(0,0,0)",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden"
          }}
        >
          <div
            className="absolute"
            style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)", width: "120%", height: "120%" }}
          >
            {/* Shadow 1 - Top Left */}
            <div
              className="absolute z-0"
              style={{ 
                top: "-10%", 
                left: "-15%", 
                width: "60%", 
                height: "60%", 
                filter: `blur(${Math.round(blurPx * BASE_SHADOW_BLUR_MULTIPLIER)}px)`, 
                opacity: BASE_SHADOW_IMAGE_OPACITY, 
                transform: "translate3d(0,0,0)",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                willChange: "opacity"
              }}
            >
              <Image src={imgs.shadow1} alt="" fill className="object-contain" aria-hidden />
            </div>
            {/* Shadow 2 - Bottom Right */}
            <div
              className="absolute z-0"
              style={{ 
                bottom: "-10%", 
                right: "-15%", 
                width: "60%", 
                height: "60%", 
                filter: `blur(${Math.round(blurPx * BASE_SHADOW_BLUR_MULTIPLIER)}px)`, 
                opacity: BASE_SHADOW_IMAGE_OPACITY, 
                transform: "translate3d(0,0,0)",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                willChange: "opacity"
              }}
            >
              <Image src={imgs.shadow2} alt="" fill className="object-contain" aria-hidden />
            </div>
            {/* CSS Shadow layers (always-visible glow) */}
            {layers.map((layer) => (
              <div
                key={`bg-${layer.blur}`}
                className="absolute rounded-full"
                style={shadowStyleBase(layer.width, layer.height, layer.blur, layer.opacity)}
              />
            ))}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full h-full max-w-[95vw] sm:max-w-[90vw] md:max-w-[85vw] lg:max-w-[911.91px]">
                <Image
                  src={imgs.collage}
                  alt="Child's Life is Bigger than Asthma"
                  fill
                  className="object-contain"
                  loading="eager"
                  style={{ 
                    filter: "blur(10px)", 
                    opacity: 0.7, 
                    transform: "translate3d(0,0,0)",
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden"
                  }}
                />
              </div>
            </div>
          </div>
          {/* Dark overlay */}
          <div className="absolute inset-0" style={{ backgroundColor: "#0b0c26", opacity: BASE_DARK_OVERLAY_OPACITY }} />
        </div>

        {/* SECTION 1 – clear images + heading (fades out via ref) */}
        <section
          ref={section1Ref}
          className="absolute inset-0 w-full h-full pt-16 sm:pt-20 md:pt-24 lg:pt-28 pb-4 sm:pb-5 md:pb-6 z-10"
          style={{ 
            willChange: "opacity",
            transform: "translate3d(0,0,0)",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden"
          }}
        >
          <Container className="h-full">
            <div className="flex flex-col items-center w-full h-full px-3 sm:px-4 gap-6 sm:gap-10 md:gap-12 lg:gap-16">
              <div 
                ref={heading1Ref} 
                style={{ 
                  willChange: "transform",
                  transform: "translate3d(0,0,0)",
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden"
                }}
              >
                <Heading2
                  className="text-white text-center leading-[120%]! relative z-20 shrink-0 px-2 sm:px-0"
                >
                  Your child&apos;s life is bigger than asthma.{" "}
                  <br className="hidden sm:block" />
                  It&apos;s made of moments you never want to miss.
                </Heading2>
              </div>
              <div
                ref={imageWrapRef}
                className="relative w-full flex-1 min-h-0 max-w-[95vw] sm:max-w-[90vw] md:max-w-[85vw] lg:max-w-[911.91px]"
                style={{ 
                  willChange: "transform",
                  transform: "translate3d(0,0,0)",
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden"
                }}
              >
                {/* Shadow 1 */}
                <div
                  className="absolute z-0"
                  style={{ 
                    top: "-15%", 
                    left: "-20%", 
                    width: "70%", 
                    height: "70%", 
                    filter: `blur(${Math.round(blurPx * 0.65)}px)`, 
                    opacity: 1, 
                    transform: "translate3d(0,0,0)",
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    willChange: "opacity"
                  }}
                >
                  <Image src={imgs.shadow1} alt="" fill className="object-contain" aria-hidden />
                </div>
                {/* Shadow 2 */}
                <div
                  className="absolute z-0"
                  style={{ 
                    bottom: "-15%", 
                    right: "-15%", 
                    width: "60%", 
                    height: "60%", 
                    filter: `blur(${Math.round(blurPx * 0.65)}px)`, 
                    opacity: 1, 
                    transform: "translate3d(0,0,0)",
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    willChange: "opacity"
                  }}
                >
                  <Image src={imgs.shadow2} alt="" fill className="object-contain" aria-hidden />
                </div>
                {/* Glow layers (fade with section 1) */}
                {layers.map((layer, i) => (
                  <div
                    key={`s1-${layer.blur}`}
                    ref={(el) => { if (el) shadowGlowRefs.current[i] = el; }}
                    data-base-opacity={layer.opacity}
                    className="absolute rounded-full"
                    style={shadowStyleStatic(layer.width, layer.height, layer.blur, layer.opacity)}
                  />
                ))}
                {/* Clear collage image */}
                <div 
                  className="relative z-10 w-full h-full"
                  style={{
                    transform: "translate3d(0,0,0)",
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden"
                  }}
                >
                  <Image
                    src={imgs.collage}
                    alt="Child's Life is Bigger than Asthma"
                    fill
                    className="object-contain"
                    loading="eager"
                    style={{ transform: "translate3d(0,0,0)" }}
                  />
                </div>
                {/* Pre-blurred overlay – crossfades in via opacity (GPU-composited) */}
                <div
                  ref={blurOverlayRef}
                  className="absolute inset-0 z-20"
                  style={{ 
                    opacity: 0, 
                    willChange: "opacity", 
                    transform: "translate3d(0,0,0)",
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden"
                  }}
                >
                  <Image
                    src={imgs.collage}
                    alt=""
                    fill
                    className="object-contain"
                    aria-hidden
                    style={{ 
                      filter: "blur(30px)", 
                      transform: "translate3d(0,0,0)",
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden"
                    }}
                  />
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* SECTION 2 – text slides down (fades in via ref) */}
        <div
          ref={section2Ref}
          className="absolute inset-0 z-20 flex items-center justify-center"
          style={{ 
            opacity: 0, 
            willChange: "transform, opacity",
            transform: "translate3d(0,0,0)",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden"
          }}
        >
          <Heading2 className="text-white text-center leading-[120%]! px-4 sm:px-6 md:px-8 max-w-[1200px]">
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
