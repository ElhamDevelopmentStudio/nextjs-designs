import {
  useScroll,
  useTransform,
  useMotionValue,
  AnimatePresence,
  motion as fmotion,
} from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/utils/cn";
import style from "./css/parallax-hero.module.css";

type ParallaxScrollProps = {
  images: string[];
  className?: string;
};

export const ParallaxScroll: React.FC<ParallaxScrollProps> = ({
  images,
  className,
}) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [intensify, setIntensify] = useState(false);

  // Existing motion values
  const scrollYProgress = useScroll({
    container: gridRef,
    offset: ["start start", "end start"],
  }).scrollYProgress;
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // New effect: scale transformation based on scroll
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouseX.set(event.clientX / window.innerWidth - 0.5);
      mouseY.set(event.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  const yTransform = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const xTransform = useTransform(mouseX, [-0.5, 0.5], [-100, 100]);
  const rotateTransform = useTransform(mouseY, [-0.5, 0.5], [-10, 10]);
  const filterEffect = intensify ? "brightness(100%) contrast(150%)" : "none";

  const third = Math.ceil(images.length / 3);
  const firstPart = images.slice(0, third);
  const secondPart = images.slice(third, 2 * third);
  const thirdPart = images.slice(2 * third);

  return (
    <div className={style.fullContainer}>
      <div
        className={cn(
          "h-[40rem] items-start overflow-y-auto w-full",
          className
        )}
        ref={gridRef}
      >
        <fmotion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute top-5 left-5 z-50 bg-gray-800 text-white px-4 py-2 rounded-md"
          onClick={() => setIntensify(!intensify)}
        >
          {intensify ? "Normalize" : "Intensify"}
        </fmotion.button>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start max-w-5xl mx-auto gap-10 py-40 px-10">
          {firstPart
            .concat(secondPart)
            .concat(thirdPart)
            .map((image, idx) => (
              <motion.div
                key={idx}
                style={{
                  y: yTransform,
                  x: xTransform,
                  rotate: rotateTransform,
                  scale: scale, // Apply scale transformation
                  filter: filterEffect,
                }}
              >
                <Image
                  src={image}
                  className="h-80 w-full object-cover object-left-top rounded-lg"
                  height={400}
                  width={400}
                  alt={`thumbnail-${idx}`}
                />
              </motion.div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ParallaxScroll;
