"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const supportsCursor = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!supportsCursor) return;

    const wrap = wrapRef.current;
    const ring = ringRef.current;
    if (!wrap || !ring) return;

    document.documentElement.classList.add("custom-cursor-active");

    const isInteractive = (target: EventTarget | null) =>
      target instanceof Element && !!target.closest("a, button");

    const onMove = (e: MouseEvent) => {
      wrap.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      wrap.style.opacity = "1";
    };
    const onOver = (e: MouseEvent) => {
      if (isInteractive(e.target)) ring.classList.add("is-hover");
    };
    const onOut = (e: MouseEvent) => {
      if (isInteractive(e.target)) ring.classList.remove("is-hover");
    };
    const onDown = () => ring.classList.add("is-active");
    const onUp = () => ring.classList.remove("is-active");
    const onLeaveWindow = () => {
      wrap.style.opacity = "0";
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeaveWindow);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeaveWindow);
    };
  }, []);

  return (
    <div ref={wrapRef} className="custom-cursor-wrap" aria-hidden>
      <div ref={ringRef} className="custom-cursor-ring">
        <div className="custom-cursor-dot pulse-dot" />
      </div>
    </div>
  );
}
