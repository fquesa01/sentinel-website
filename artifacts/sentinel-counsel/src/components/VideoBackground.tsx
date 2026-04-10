import { useEffect, useRef, useState, useCallback } from "react";

interface VideoBackgroundProps {
  videos: string[];
  crossfadeDuration?: number;
  clipDuration?: number;
  onClipChange?: (index: number) => void;
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

export default function VideoBackground({
  videos,
  crossfadeDuration = 2000,
  clipDuration = 8000,
  onClipChange,
}: VideoBackgroundProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState<number | null>(null);
  const [fading, setFading] = useState(false);
  const activeRef = useRef<HTMLVideoElement>(null);
  const nextRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const reducedMotion = usePrefersReducedMotion();

  const handleClipChange = useCallback(
    (idx: number) => {
      setActiveIndex(idx);
      setNextIndex(null);
      setFading(false);
      onClipChange?.(idx);
    },
    [onClipChange],
  );

  useEffect(() => {
    onClipChange?.(0);
  }, []);

  useEffect(() => {
    if (videos.length <= 1 || reducedMotion) return;

    const cycle = () => {
      const next = (activeIndex + 1) % videos.length;
      setNextIndex(next);

      const nextVid = nextRef.current;
      if (nextVid) {
        nextVid.currentTime = 0;
        nextVid.play().catch(() => {});
      }

      setTimeout(() => {
        setFading(true);
      }, 50);

      timerRef.current = setTimeout(() => {
        handleClipChange(next);
      }, crossfadeDuration);
    };

    const interval = setInterval(cycle, clipDuration);
    return () => {
      clearInterval(interval);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [activeIndex, videos.length, crossfadeDuration, clipDuration, handleClipChange, reducedMotion]);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(10,12,16,0.4) 0%, rgba(10,12,16,0.55) 50%, rgba(10,12,16,0.7) 100%)",
          zIndex: 2,
        }}
      />

      <video
        ref={activeRef}
        key={`active-${activeIndex}`}
        src={videos[activeIndex]}
        autoPlay
        muted
        loop={videos.length === 1 || reducedMotion}
        playsInline
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%) scale(1.05)",
          minWidth: "100%",
          minHeight: "100%",
          objectFit: "cover",
          opacity: fading ? 0 : 1,
          transition: reducedMotion ? "none" : `opacity ${crossfadeDuration}ms ease-in-out`,
          willChange: "opacity",
          zIndex: 1,
        }}
        onLoadedMetadata={(e) => {
          (e.target as HTMLVideoElement).playbackRate = reducedMotion ? 0.3 : 0.6;
        }}
      />

      {nextIndex !== null && !reducedMotion && (
        <video
          ref={nextRef}
          key={`next-${nextIndex}`}
          src={videos[nextIndex]}
          autoPlay
          muted
          playsInline
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%) scale(1.05)",
            minWidth: "100%",
            minHeight: "100%",
            objectFit: "cover",
            opacity: fading ? 1 : 0,
            transition: `opacity ${crossfadeDuration}ms ease-in-out`,
            willChange: "opacity",
            zIndex: 0,
          }}
          onLoadedMetadata={(e) => {
            (e.target as HTMLVideoElement).playbackRate = 0.6;
          }}
        />
      )}
    </div>
  );
}
