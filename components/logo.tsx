"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const LINES = ["Jimmy's Cafe", "Great Eats", "at a Good Price."];

export function Logo() {
  const [displayed, setDisplayed] = useState("");
  const state = useRef({ lineIndex: 0, charIndex: 0, erasing: false });

  const tick = useCallback(() => {
    const { lineIndex, charIndex, erasing } = state.current;
    const target = LINES[lineIndex];

    if (!erasing) {
      if (charIndex < target.length) {
        const next = charIndex + 1;
        state.current.charIndex = next;
        setDisplayed(target.slice(0, next));
        return 60;
      } else {
        state.current.erasing = true;
        return 1800;
      }
    } else {
      if (charIndex > 0) {
        const next = charIndex - 1;
        state.current.charIndex = next;
        setDisplayed(target.slice(0, next));
        return 35;
      } else {
        state.current.erasing = false;
        state.current.lineIndex = (lineIndex + 1) % LINES.length;
        return 35;
      }
    }
  }, []);

  useEffect(() => {
    let id: ReturnType<typeof setTimeout>;
    const schedule = () => {
      const delay = tick();
      id = setTimeout(schedule, delay);
    };
    schedule();
    return () => clearTimeout(id);
  }, [tick]);

  return (
    <span className="font-bold tracking-tight text-destructive">
      {displayed}
      <span className="animate-pulse">|</span>
    </span>
  );
}
