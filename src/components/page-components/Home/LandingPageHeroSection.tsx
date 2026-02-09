"use client";

import Image from "next/image";
import { useRef, useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import Container from "@/components/common/Container";
import { Heading1, Paragraph } from "@/components/common/Typography";

const VIDEO_DESKTOP = "/assets/pages/landing/videos/HeroVideo001.mp4";
const VIDEO_MOBILE = "/assets/pages/landing/videos/HeroVideo001-mobile.mp4";
const VIDEO_POSTER = "/assets/pages/landing/videos/HeroVideo001-poster.jpg";
const MOBILE_BREAKPOINT = 768;

const LandingPageHeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoSrc, setVideoSrc] = useState<string>("");

  // Pick the right video source based on screen width (runs once on mount)
  useEffect(() => {
    const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
    setVideoSrc(isMobile ? VIDEO_MOBILE : VIDEO_DESKTOP);
  }, []);

  // Autoplay logic — Apple-style: simple, minimal, reliable
  const ensurePlayback = useCallback(() => {
    const video = videoRef.current;
    if (!video || !video.paused) return;
    video.play().catch(() => {});
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoSrc) return;

    // Ensure muted (required for autoplay on every browser)
    video.muted = true;

    // Try play when video has enough data
    const onCanPlay = () => ensurePlayback();
    video.addEventListener("canplay", onCanPlay);
    video.addEventListener("loadeddata", onCanPlay);

    // Try immediately if already ready
    if (video.readyState >= 2) ensurePlayback();

    // Fallback: first user interaction (covers older Android Chrome)
    const onTouch = () => {
      ensurePlayback();
      document.removeEventListener("touchstart", onTouch);
    };
    document.addEventListener("touchstart", onTouch, { passive: true });

    // Resume after tab switch
    const onVisibility = () => {
      if (!document.hidden) ensurePlayback();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      video.removeEventListener("canplay", onCanPlay);
      video.removeEventListener("loadeddata", onCanPlay);
      document.removeEventListener("touchstart", onTouch);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [videoSrc, ensurePlayback]);

  return (
    <div>
      <div className="p-2.5">
        <div className="w-full h-screen rounded-[20px] relative overflow-hidden bg-black">
          {videoSrc && (
            <video
              ref={videoRef}
              key={videoSrc}
              src={videoSrc}
              autoPlay
              loop
              muted
              playsInline
              poster={VIDEO_POSTER}
              preload="auto"
              className="absolute inset-0 w-full h-full object-cover rounded-[20px] z-0 block"
              style={{ pointerEvents: "none" }}
            />
          )}

          <Container className="absolute bottom-0 left-0 right-0 pb-24 md:pb-12.5 flex justify-end items-end h-full pt-30 md:pt-0 md:h-fit">
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
                  Satori is a text-first asthma & allergy guardian — <i>no app, no passwords, no friction.</i>
                </Paragraph>
              </div>
              <div className="h-full w-full flex justify-center md:justify-start mllg:justify-end items-start mllg:items-end">
                <div className="flex flex-col-reverse mllg:flex-col gap-3">
                  <Paragraph className="text-white text-xs! leading-5! letter-spacing-[0%]! text-center">
                    No credit card required.{" "}
                    <br className="hidden mllg:block" />
                    Get immediate protection.
                  </Paragraph>

                  <Button className="px-5! py-3.5!">
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
