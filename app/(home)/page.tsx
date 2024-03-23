"use client";
import React from "react";
import HeroParallax from "@/components/ui/hero-parralax";

function HeroParallaxDemo() {
  return <HeroParallax products={products} />;
}

const products = [
  {
    title: "Kardan Programming Cotest",
    link: "https://kardan-leet-code.vercel.app",
    thumbnail: "/kardan.png",
  },
  {
    title: "Nucleus Web Studios",
    link: "https://nucleus-web-black.vercel.app",
    thumbnail: "/nucleus.png",
  },
  {
    title: "ElhamDev",
    link: "https://elhamdev.vercel.app",
    thumbnail: "/elhamdev.png",
  },

  {
    title: "Zafarkhil Tailoring",
    link: "https://tailor-front-end.vercel.app",
    thumbnail: "/zafarkhil.png",
  },
];

export default HeroParallaxDemo;
