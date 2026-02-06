"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Container from "@/components/common/Container";
import { Heading1, Paragraph } from "@/components/common/Typography";

const LandingPageHeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute("muted", "true");
    video.setAttribute("playsinline", "true");
    video.setAttribute("webkit-playsinline", "true");

    let hasPlayed = false;

    const playVideo = () => {
      if (hasPlayed || !video.paused) return;
      
      requestAnimationFrame(() => {
        if (video.paused && !hasPlayed) {
          const playPromise = video.play();
          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                hasPlayed = true;
              })
              .catch(() => {
              });
          }
        }
      });
    };

    if (video.readyState >= 3) {
      playVideo();
    }

    video.addEventListener("canplaythrough", playVideo);

    const handleVisibilityChange = () => {
      if (!document.hidden && video.paused) {
        playVideo();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      video.removeEventListener("canplaythrough", playVideo);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <div>
      <div className="p-2.5">
        <div className="w-full h-screen rounded-[20px] relative overflow-hidden bg-black">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            controls={false}
            preload="metadata"
            disablePictureInPicture
            disableRemotePlayback
            webkit-playsinline="true"
            x-webkit-airplay="deny"
            className="absolute inset-0 w-full h-full object-cover rounded-[20px] z-0 block"
            style={{ pointerEvents: "none", display: "block" }}
          >
            <source
              src="/assets/pages/landing/videos/HeroVideo001.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>

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
