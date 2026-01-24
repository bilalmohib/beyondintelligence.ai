"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import { Heading1, Paragraph } from "@/components/common/Typography";
import { Button } from "@/components/ui/button";

function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // Force play on mount and when video can play
      const playVideo = () => {
        video.play().catch((error) => {
          console.error("Video play failed:", error);
        });
      };

      // Try to play immediately
      playVideo();

      // Also try when video is ready
      video.addEventListener('loadedmetadata', playVideo);
      video.addEventListener('canplay', playVideo);
      video.addEventListener('canplaythrough', playVideo);

      return () => {
        video.removeEventListener('loadedmetadata', playVideo);
        video.removeEventListener('canplay', playVideo);
        video.removeEventListener('canplaythrough', playVideo);
      };
    }
  }, []);

  return (
    <div className="block">
      <div className="p-2.5">
        <div className="w-full h-screen rounded-[20px] relative overflow-hidden bg-black">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            controls={false}
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover rounded-[20px] z-0 block"
            style={{ pointerEvents: 'none', display: 'block' }}
            onError={(e) => {
              console.error("Video error:", e);
              const video = e.currentTarget;
              console.error("Video error details:", {
                error: video.error,
                networkState: video.networkState,
                readyState: video.readyState,
                src: video.currentSrc
              });
            }}
            onLoadedData={() => {
              console.log("Video loaded successfully");
              const video = videoRef.current;
              if (video) {
                video.play().catch(err => console.error("Play error:", err));
              }
            }}
            onCanPlay={() => {
              const video = videoRef.current;
              if (video) {
                video.play().catch(err => console.error("Play error:", err));
              }
            }}
            onCanPlayThrough={() => {
              const video = videoRef.current;
              if (video) {
                video.play().catch(err => console.error("Play error:", err));
              }
            }}
          >
            <source src="/assets/pages/landing/videos/HeroVideo001.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <div className="absolute bottom-0 left-0 right-0 px-12.5 pb-12.5 grid grid-cols-2 justify-between">
            <div className="flex flex-col gap-4">
              <div>
                <Image src="/assets/pages/landing/images/satori_beta.svg" alt="Logo" width={162.76} height={31.11} />
              </div>
              <Heading1 className="text-white leading-[100%]! tracking-[-2%]!">
                We Protect Your Child <br />
                Before Asthma Can Hurt Them.
              </Heading1>
              <Paragraph className="text-white">
                Satori is a text-first asthma & allergy guardian — <i>no app, no passwords, no friction.</i>
              </Paragraph>
            </div>
            <div className="h-full w-full flex justify-end items-end">
              <div className="flex flex-col gap-3">
                <Paragraph className="text-white text-xs! leading-5! letter-spacing-[0%]! text-center">
                  No credit card required. <br />
                  Get immediate protection.
                </Paragraph>

                <Button className="px-5! py-3.5!">
                  Start Free 14-Day Trial
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home;
