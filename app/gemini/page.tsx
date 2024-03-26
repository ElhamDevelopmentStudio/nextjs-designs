"use client";
import React, { useEffect, useRef } from "react";
import { motion, useMotionValue } from "framer-motion";
import { GoogleGeminiEffect } from "../../components/ui/google-gemini-effect";

function GoogleGeminiEffectDemo() {
  // Create motion values for each path
  const pathLengthFirst = useMotionValue(0);
  const pathLengthSecond = useMotionValue(0);
  const pathLengthThird = useMotionValue(0);
  const pathLengthFourth = useMotionValue(0);
  const pathLengthFifth = useMotionValue(0);

  // Using useRef to track the start time which can be reset
  const startTimeRef = useRef(performance.now());
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    const startAnimation = () => {
      startTimeRef.current = performance.now();

      const animate = (currentTime: number) => {
        const timeElapsed = currentTime - startTimeRef.current;
        const progress = Math.min(timeElapsed / 3000, 1); // Duration of animation in milliseconds

        // Update motion values based on progress
        pathLengthFirst.set(Math.min(0.2 + progress * 1, 1));
        pathLengthSecond.set(Math.min(0.15 + progress * 1, 1));
        pathLengthThird.set(Math.min(0.1 + progress * 1, 1));
        pathLengthFourth.set(Math.min(0.05 + progress * 1, 1));
        pathLengthFifth.set(Math.min(0 + progress * 1, 1));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    };

    // Start the animation initially
    startAnimation();

    // Set an interval to reset the animation every 30 seconds
    intervalRef.current = window.setInterval(() => {
      // Reset the motion values to start the animation from scratch
      pathLengthFirst.set(0);
      pathLengthSecond.set(0);
      pathLengthThird.set(0);
      pathLengthFourth.set(0);
      pathLengthFifth.set(0);

      // Start the animation again
      startAnimation();
    }, 30000); // Reset every 30 seconds

    // Clean up on component unmount
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, [
    pathLengthFirst,
    pathLengthSecond,
    pathLengthThird,
    pathLengthFourth,
    pathLengthFifth,
  ]);

  return (
    <div className="bg-black dark:border dark:border-white/[0.1] rounded-md relative overflow-clip">
      <GoogleGeminiEffect
        pathLengths={[
          pathLengthFirst,
          pathLengthSecond,
          pathLengthThird,
          pathLengthFourth,
          pathLengthFifth,
        ]}
        title="Kardan Networking Contest"
        description="The first networking contest in Afghanistan."
      />
    </div>
  );
}

export default GoogleGeminiEffectDemo;
