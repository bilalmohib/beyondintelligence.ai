"use client";

import { useState, useEffect, useRef, useCallback } from "react";

export const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState<{
        width: number | undefined;
        height: number | undefined;
    }>({
        width: undefined,
        height: undefined,
    });

    const rafRef = useRef<number | null>(null);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const updateSize = useCallback(() => {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
        });
    }, []);

    useEffect(() => {
        if (typeof window === "undefined") return;

        // Set initial size immediately
        updateSize();

        const handleResize = () => {
            // Cancel any pending updates
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);

            // Debounce: wait 150ms after last resize event, then update in rAF
            timeoutRef.current = setTimeout(() => {
                rafRef.current = requestAnimationFrame(updateSize);
            }, 150);
        };

        window.addEventListener("resize", handleResize, { passive: true });

        return () => {
            window.removeEventListener("resize", handleResize);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [updateSize]);

    return windowSize;
};
