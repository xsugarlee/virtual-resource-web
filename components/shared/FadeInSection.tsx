"use client";

import { useRef, useEffect, type ReactNode } from "react";

interface FadeInSectionProps {
  readonly children: ReactNode;
  readonly className?: string;
}

export default function FadeInSection({ children, className = "" }: FadeInSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("opacity-100", "translate-y-0");
          observer.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={`max-w-7xl mx-auto px-6 py-20 border-t border-gray-100 opacity-0 translate-y-8 transition-all duration-700 ease-out ${className}`}
    >
      {children}
    </section>
  );
}