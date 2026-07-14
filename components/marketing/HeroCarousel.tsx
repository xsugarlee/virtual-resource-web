"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Slide {
  subtitle: string;
  title: string;
  desc: string;
  buttonText: string;
}

interface HeroCarouselProps {
  readonly images: string[];
  readonly slides: Slide[];
}

export default function HeroCarousel({ images, slides }: HeroCarouselProps) {
  const [current, setCurrent] = useState(0);
  const total = slides.length;

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + total) % total);
  }, [total]);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % total);
  }, [total]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, 5000);
    return () => clearInterval(timer);
  }, [total]);

  return (
    <section className="relative w-full overflow-hidden" style={{ height: "500px" }}>
      {/* 背景图 */}
      {images.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
          style={{
            backgroundImage: `url('${src}')`,
            opacity: current === i ? 1 : 0,
          }}
        />
      ))}

      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 p-2 z-20"
        aria-label="上一张"
      >
        <ChevronLeft size={28} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 p-2 z-20"
        aria-label="下一张"
      >
        <ChevronRight size={28} />
      </button>

      {/* 文字内容 */}
      <div
        key={current}
        className="relative h-full flex flex-col items-center justify-center text-black px-7 z-10 transition-all duration-500"
      >
        <p className="text-xs uppercase tracking-[3px] mb-3">
          {slides[current].subtitle}
        </p>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4">
          {slides[current].title}
        </h1>
        <p className="text-lg text-gray-700 mb-10">
          {slides[current].desc}
        </p>
        <button className="relative overflow-hidden border border-black px-8 py-2 rounded text-black group">
          <span className="relative z-10 text-sm">
            {slides[current].buttonText || "立即探索"}
          </span>
          <span className="absolute inset-0 bg-black/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
        </button>
      </div>
    </section>
  );
}