import React from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/legacy/image";
import Link from "next/link";
import { MotionValue } from "framer-motion";

export const HeroParallax = ({
  products,
}: {
  products: {
    title: string;
    link: string;
    thumbnail: string;
  }[];
}) => {
  const firstRow = products.slice(0, 2);
  const secondRow = products.slice(2, 4);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const springConfig = { stiffness: 300, damping: 30 };
  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -50]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 50]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-500, 0]),
    springConfig
  ); // Adjust this [-50, 0] to move product cards up and down

  return (
    <div
      ref={ref}
      className="h-[200vh] py-10 antialiased relative flex flex-col items-start [perspective:1000px] [transform-style:preserve-3d]"
    >
      <Header />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className="self-stretch mt-[200px]" // Negative margin brings product cards up behind the hero text; adjust this value as needed
      >
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
          {firstRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row space-x-20">
          {secondRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={product.title}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export const Header = () => {
  return (
    <div className="max-w-7xl mx-auto py-10 px-4 w-full text-left">
      <h1 className="text-2xl md:text-7xl font-bold text-black">
        The Ultimate <br /> Development Studio
      </h1>
      <p className="max-w-2xl text-base md:text-xl mt-8 text-black">
        We build beautiful products with the latest technologies and frameworks.
        We are a team of passionate developers and designers that love to build
        amazing products.
      </p>
    </div>
  );
};

export const ProductCard = ({
  product,
  translate,
}: {
  product: {
    title: string;
    link: string;
    thumbnail: string;
  };
  translate: MotionValue<number>;
}) => {
  return (
    <motion.div
      style={{ x: translate }}
      whileHover={{ y: -20 }}
      className="group h-96 w-[30rem] relative flex-shrink-0"
    >
      <Link href={product.link} className="block hover:shadow-2xl">
        <Image
          src={product.thumbnail}
          layout="fill"
          className="object-cover absolute inset-0 "
          alt={product.title || "Product image"}
        />
      </Link>
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover:opacity-50 bg-black pointer-events-none"></div>{" "}
      {/* Dark filter toned down */}
      <h3 className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 text-white shadow-black text-sm ">
        {product.title}
      </h3>
    </motion.div>
  );
};

export default HeroParallax;
