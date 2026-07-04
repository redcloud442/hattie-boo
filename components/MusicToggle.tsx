"use client";

import { useRef, useState } from "react";
import { MusicIcon, MuteIcon } from "@/components/icons";

// Soft background music toggle — OFF by default. Expects an audio file at
// /public/music.mp3 (optional). If the file is missing, the toggle simply
// does nothing rather than erroring.
export function MusicToggle({ src = "/music.wav" }: { src?: string }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  function toggle() {
    const el = audioRef.current;
    if (!el) return;
    if (playing) {
      el.pause();
      setPlaying(false);
    } else {
      void el.play().then(
        () => setPlaying(true),
        () => setPlaying(false),
      );
    }
  }

  return (
    <>
      <audio ref={audioRef} src={src} loop preload="none" />
      <button
        type="button"
        onClick={toggle}
        aria-pressed={playing}
        aria-label={playing ? "Turn music off" : "Turn music on"}
        className="fixed bottom-4 right-4 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-rose-deep shadow-[0_10px_24px_-10px_rgba(214,31,117,0.6)] ring-2 ring-blush backdrop-blur transition-transform hover:scale-105 active:scale-95"
      >
        {playing ? (
          <MusicIcon width={22} height={22} />
        ) : (
          <MuteIcon width={22} height={22} />
        )}
      </button>
    </>
  );
}
