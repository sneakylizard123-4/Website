"use client";

import { useEffect, useRef, useState } from "react";

const PHRASES = [
  "Embedded systems engineer.",
  "PCB designer.",
  "Firmware developer.",
  "Cybersecurity enthusiast.",
  "I build things.",
];

export function Typewriter() {
  const [text, setText] = useState("");
  const indexRef = useRef(0);
  const charRef = useRef(0);
  const deletingRef = useRef(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    function type() {
      const current = PHRASES[indexRef.current];

      if (deletingRef.current) {
        charRef.current--;
        setText(current.substring(0, charRef.current));
      } else {
        charRef.current++;
        setText(current.substring(0, charRef.current));
      }

      let delay = deletingRef.current ? 25 : 55 + Math.random() * 40;

      if (!deletingRef.current && charRef.current === current.length) {
        delay = 2500;
        deletingRef.current = true;
      } else if (deletingRef.current && charRef.current === 0) {
        deletingRef.current = false;
        indexRef.current = (indexRef.current + 1) % PHRASES.length;
        delay = 400;
      }

      timeout = setTimeout(type, delay);
    }

    timeout = setTimeout(type, 1200);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <span>
      {text}
      <span className="inline-block w-[2px] animate-blink align-text-bottom text-primary">
        |
      </span>
    </span>
  );
}
