'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function AnimatedTitle() {
  const [show, setShow] = useState(false);
  const ecommerceRef = useRef(null);
  const text = 'Libros';

  useEffect(() => {
    setShow(true);

    setTimeout(() => {
      gsap.to(ecommerceRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
      });
    }, text.length * 80 + 200);
  }, []);

  return (
    <h1 className="text-4xl font-bold text-center text-white mb-6 drop-shadow leading-tight">
      <span className="inline whitespace-nowrap mr-2">
        {show &&
          text.split('').map((letter, i) => (
            <span
              key={i}
              className="inline-block opacity-0"
              style={{ animation: `fadeInLetter 0.1s ease ${i * 80}ms forwards` }}
            >
              {letter}
            </span>
          ))}
      </span>
      <span
        ref={ecommerceRef}
        className="inline text-[#DCC48E] opacity-0 -translate-y-2"
      >
        Ecommerce
      </span>

      <style jsx>{`
        @keyframes fadeInLetter {
          to {
            opacity: 1;
          }
        }
      `}</style>
    </h1>
  );
}
