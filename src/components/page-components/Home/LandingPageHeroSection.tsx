"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Container from "@/components/common/Container";
import { useRef, useEffect, useLayoutEffect, useState, useCallback } from "react";
import { Heading1, Paragraph } from "@/components/common/Typography";

const VIDEO_DESKTOP = "/assets/pages/landing/videos/HeroVideo001.mp4";
const VIDEO_MOBILE = "/assets/pages/landing/videos/HeroVideo001-mobile.mp4";
const VIDEO_POSTER = "/assets/pages/landing/videos/HeroVideo001-poster.jpg";
const MOBILE_BREAKPOINT = 768;

const LandingPageHeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const isPlayingRef = useRef(false);
  const playLock = useRef(false);

  // Always render desktop video on server to avoid hydration mismatch.
  // After hydration, we check actual viewport and swap source if needed.
  const [videoSrc, setVideoSrc] = useState(VIDEO_DESKTOP);

  // Check viewport and update source after mount (client-side only)
  useEffect(() => {
    const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
    const correctSrc = isMobile ? VIDEO_MOBILE : VIDEO_DESKTOP;
    if (videoSrc !== correctSrc) {
      setVideoSrc(correctSrc);
    }
  }, [videoSrc]);

  const markPlaying = useCallback(() => {
    if (!isPlayingRef.current) {
      isPlayingRef.current = true;
      setIsPlaying(true);
    }
  }, []);

  // Safe play with locking to prevent concurrent calls
  const safePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video || isPlayingRef.current || playLock.current) return;

    if (!video.paused && video.currentTime > 0) {
      markPlaying();
      return;
    }

    video.muted = true;
    video.volume = 0;
    playLock.current = true;

    const playPromise = video.play();
    if (playPromise) {
      playPromise
        .then(() => {
          playLock.current = false;
          markPlaying();
          console.log("[Video] Autoplay succeeded");
        })
        .catch((err) => {
          playLock.current = false;
          console.log("[Video] Autoplay blocked:", err.name, err.message);
        });
    } else {
      playLock.current = false;
    }
  }, [markPlaying]);

  // Click handler for manual play
  const handlePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    
    video.muted = true;
    video.volume = 0;
    
    const p = video.play();
    if (p) {
      p.then(() => {
        markPlaying();
      }).catch((e) => {
        console.error("[Video] Manual play failed:", e);
      });
    }
  }, [markPlaying]);

  // Ref callback - runs synchronously when video element mounts
  const videoRefCallback = useCallback((video: HTMLVideoElement | null) => {
    if (!video) return;
    videoRef.current = video;

    // Set muted IMMEDIATELY in the ref callback (synchronous, before React commits)
    video.muted = true;
    video.defaultMuted = true;
    video.volume = 0;

    // For Safari: also set as attributes
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");
  }, []);

  // Use layoutEffect for synchronous initialization before paint
  useLayoutEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure muted is set before first paint
    video.muted = true;
    video.defaultMuted = true;
    video.volume = 0;

    // Try to play immediately (some browsers allow this)
    safePlay();
  }, [safePlay]);

  // Main effect for event listeners and retries
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let cancelled = false;

    // ---- Play state listener (single consolidated handler) ----
    const onPlayEvent = () => markPlaying();
    video.addEventListener("playing", onPlayEvent);

    // ---- Keep muted ----
    const ensureMuted = () => {
      video.muted = true;
      video.volume = 0;
    };
    video.addEventListener("volumechange", ensureMuted);

    // ---- Try play when ready ----
    const onReady = () => {
      if (!cancelled) safePlay();
    };
    video.addEventListener("canplay", onReady);

    // If already ready
    if (video.readyState >= 3) {
      safePlay();
    }

    // ---- Single retry with delay ----
    const retryTimer = setTimeout(() => {
      if (!cancelled) safePlay();
    }, 500);

    // ---- IntersectionObserver (single threshold) ----
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !cancelled) safePlay();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(video);

    // ---- User interaction unlock for Safari ----
    const onFirstInteraction = () => {
      if (!cancelled) {
        safePlay();
        document.removeEventListener("click", onFirstInteraction);
        document.removeEventListener("touchstart", onFirstInteraction);
      }
    };
    document.addEventListener("click", onFirstInteraction, { passive: true, once: true });
    document.addEventListener("touchstart", onFirstInteraction, { passive: true, once: true });

    // ---- Resize (debounced) ----
    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (cancelled) return;
        const mobile = window.innerWidth < MOBILE_BREAKPOINT;
        const newSrc = mobile ? VIDEO_MOBILE : VIDEO_DESKTOP;
        if (video.src && !video.src.endsWith(newSrc)) {
          video.muted = true;
          video.volume = 0;
          video.src = newSrc;
          setTimeout(safePlay, 200);
        }
      }, 250);
    };
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      cancelled = true;
      clearTimeout(retryTimer);
      clearTimeout(resizeTimer);
      observer.disconnect();
      video.removeEventListener("playing", onPlayEvent);
      video.removeEventListener("volumechange", ensureMuted);
      video.removeEventListener("canplay", onReady);
      document.removeEventListener("click", onFirstInteraction);
      document.removeEventListener("touchstart", onFirstInteraction);
      window.removeEventListener("resize", onResize);
    };
  }, [safePlay, markPlaying]);

  return (
    <div>
      <div className="p-2.5">
        <div
          ref={containerRef}
          className="w-full h-screen rounded-[20px] relative overflow-hidden bg-black"
          onClick={handlePlay}
          style={{ cursor: isPlaying ? "default" : "pointer" }}
        >
          {/* Video element with all Safari-required attributes inline */}
          <video
            ref={videoRefCallback}
            src={videoSrc}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster={VIDEO_POSTER}
            className="absolute inset-0 w-full h-full object-cover rounded-[20px] z-0"
            style={{ display: "block" }}
            // Force these as attributes for Safari
            {...({ "webkit-playsinline": "" } as React.VideoHTMLAttributes<HTMLVideoElement>)}
          />

          <Container className="absolute bottom-0 left-0 right-0 pb-24 md:pb-12.5 flex justify-end items-end h-full pt-30 md:pt-0 md:h-fit z-2">
            <div className="grid grid-cols-1 mllg:grid-cols-2 gap-10 mllg:gap-0 w-full justify-between">
              <div className="flex flex-col gap-4">
                <div className="flex justify-center md:justify-start">
                  <Image
                    src="/assets/pages/landing/images/satori_beta.svg"
                    alt="Logo"
                    width={162.76}
                    height={31.11}
                    className="w-28 md:w-34 mllg:w-[162.76px] h-auto mllg:h-[31.11px]"
                  />
                </div>
                <Heading1 className="text-white text-center md:text-left leading-tight md:leading-[100%]! tracking-normal md:tracking-[-2%]!">
                  We Protect Your Child <br className="hidden md:block" />
                  Before Asthma Can Hurt Them.
                </Heading1>
                <Paragraph className="text-white text-center md:text-left whitespace-nowrap">
                  Satori is a text-first asthma & allergy guardian —{" "}
                  <i>no app, no passwords, no friction.</i>
                </Paragraph>
              </div>
              <div className="h-full w-full flex justify-center md:justify-start mllg:justify-end items-start mllg:items-end">
                <div className="flex flex-col-reverse mllg:flex-col gap-3">
                  <Paragraph className="text-white text-xs! leading-5! letter-spacing-[0%]! text-center">
                    No credit card required.{" "}
                    <br className="hidden mllg:block" />
                    Get immediate protection.
                  </Paragraph>

                  <Button
                    className="px-5! py-3.5!"
                    onClick={() => {
                      window.open("/signup/start", "_blank");
                    }}
                  >
                    Start Free 14-Day Trial
                  </Button>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default LandingPageHeroSection;
