import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import logoImg from '../assets/logo.png';

export function SplashScreen({ onComplete }) {
  const container = useRef(null);
  const logoRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      }
    });
    
    // Logo pops in
    tl.from(logoRef.current, {
      scale: 0.5,
      opacity: 0,
      duration: 0.8,
      ease: 'back.out(1.5)'
    });
    
    // Text slides up and fades in
    tl.from(textRef.current, {
      y: 20,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out'
    }, '-=0.4'); // Start slightly before logo finishes

    // Hold for a moment
    tl.to({}, { duration: 1.5 });

    // Fade everything out
    tl.to(container.current, {
      opacity: 0,
      duration: 0.6,
      ease: 'power2.inOut'
    });

  }, { scope: container });

  return (
    <div
      ref={container}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center w-full h-full overflow-hidden bg-[#FAF9F6]"
    >
      <div className="flex flex-col items-center gap-4 relative z-10">
        <img
          ref={logoRef}
          src={logoImg}
          alt="Siddipet Poultry Eggs Logo"
          className="w-32 h-32 md:w-40 md:h-40 object-contain drop-shadow-xl"
        />
        <h1 
          ref={textRef}
          className="text-2xl md:text-3xl font-sans font-extrabold text-gray-900 tracking-tight"
        >
          Siddipet Poultry Eggs
        </h1>
      </div>
      
      {/* Subtle decorative background circles */}
      <div className="absolute top-1/4 -left-20 w-64 h-64 bg-[#F5B041]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-red-500/5 rounded-full blur-3xl pointer-events-none"></div>
    </div>
  );
}
