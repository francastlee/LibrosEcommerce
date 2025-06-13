'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function AnimatedTitle() {
  const [letrasVisibles, setLetrasVisibles] = useState([]);
  const ecommerceRef = useRef(null);

  useEffect(() => {
    const texto = 'Libros';
    const letras = texto.split('');

    letras.forEach((letra, i) => {
      setTimeout(() => {
        setLetrasVisibles(prev => [...prev, letra]);
      }, i * 80);
    });

    setTimeout(() => {
      gsap.to(ecommerceRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
      });
    }, letras.length * 80 + 200);
  }, []);

  return (
    <h1 className="text-4xl font-bold text-center text-white mb-6 drop-shadow leading-tight">
      <span className="inline whitespace-nowrap mr-2">
        {letrasVisibles.map((letra, i) => (
          <span key={i} className="inline-block transition-opacity duration-100">
            {letra}
          </span>
        ))}
      </span>
      <span
        ref={ecommerceRef}
        className="inline text-[#DCC48E] opacity-0 -translate-y-2"
      >
        Ecommerce
      </span>
    </h1>
  );
}
