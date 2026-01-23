"use client";

import { useRef, useEffect } from "react";

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
        <div className="border border-red-600 border-solid w-full h-screen rounded-[20px] relative overflow-hidden bg-black">
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
        </div>
      </div>
    </div>
  );
}
export default Home;
