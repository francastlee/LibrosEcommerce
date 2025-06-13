'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import {
  AlertCircle,
  CheckCircle,
  Info,
  X
} from 'lucide-react';

const styleMap = {
  error: 'bg-red-100 border-red-400 text-red-700',
  success: 'bg-green-100 border-green-400 text-green-700',
  info: 'bg-blue-100 border-blue-400 text-blue-700',
};

const iconMap = {
  error: <AlertCircle className="w-5 h-5" />,
  success: <CheckCircle className="w-5 h-5" />,
  info: <Info className="w-5 h-5" />,
};

export default function Alert({ message, onClose, type = 'error', duration = 4000 }) {
  const alertRef = useRef(null);

  useEffect(() => {
    if (message && alertRef.current) {
      gsap.fromTo(
        alertRef.current,
        { opacity: 0, x: 100 },
        { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out' }
      );

      const timer = setTimeout(() => {
        gsap.to(alertRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.4,
          ease: 'power2.in',
          onComplete: onClose,
        });
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [message, onClose, duration]);

  if (!message) return null;

  return (
    <div
      ref={alertRef}
      className={`fixed top-5 right-5 z-50 px-4 py-3 rounded shadow-md flex items-center gap-2 border ${styleMap[type]}`}
      role="alert"
    >
      {iconMap[type]}
      <span className="mr-2">{message}</span>
      <button
        onClick={() => {
          gsap.to(alertRef.current, {
            opacity: 0,
            y: -20,
            duration: 0.3,
            ease: 'power2.in',
            onComplete: onClose,
          });
        }}
        className="text-inherit font-bold hover:opacity-70 transition"
        aria-label="Cerrar alerta"
      >
        <X className="w-4 h-4 cursor-pointer" />
      </button>
    </div>
  );
}
