import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import logoImg from '../assets/logo.png';
import henImg  from '../assets/hen.png';

/*
  SEQUENCE:
  1. Hen walks in from RIGHT → centres on screen
  2. Egg appears from BEHIND the hen (hen's rear/right side), starts small
  3. Egg rolls out forward, grows naturally as it clears hen
  4. Hen walks off to LEFT
  5. Egg glides to screen centre, scales up nicely
  6. Egg settles → 3-knock crack sequence
  7. Shell pieces fly apart elegantly
  8. Warm glow + logo scales up with shine
  9. Brand text, hold, fade
*/

export function SplashScreen({ onComplete }) {
  const wrapRef   = useRef(null);

  // Hen
  const henRef    = useRef(null);   // x walk
  const henBodyRef = useRef(null);  // y bob

  // Egg – sits behind hen (zIndex 3 < hen zIndex 5)
  const eggRef    = useRef(null);
  const eggShadRef = useRef(null);

  // SVG refs inside egg
  const eggSvgRef = useRef(null);
  const c1 = useRef(null), c2 = useRef(null), c3 = useRef(null);

  // Shell pieces removed per client request

  // Reveal
  const glowRef   = useRef(null);
  const logoRef   = useRef(null);
  const shineRef  = useRef(null);
  const partRefs  = useRef([]);
  const textRef   = useRef(null);
  const tagRef    = useRef(null);

  useGSAP(() => {
    // ── set EVERYTHING invisible immediately ──────────────────────────
    gsap.set(henRef.current,    { x: '110vw', opacity: 0 });
    gsap.set(eggRef.current,    { opacity: 0, scale: 0.28, x: 60, y: 60 });
    gsap.set(eggShadRef.current,{ opacity: 0 });
    // crack paths: hidden + dashoffset so they animate correctly
    gsap.set([c1.current, c2.current, c3.current],
      { opacity: 0, strokeDashoffset: 80 });

    gsap.set(glowRef.current,  { opacity: 0, scale: 0 });
    gsap.set(logoRef.current,  { opacity: 0, scale: 0 });
    gsap.set(shineRef.current, { x: '-130%', opacity: 0 });
    gsap.set([textRef.current, tagRef.current], { opacity: 0, y: 18 });
    partRefs.current.forEach(p => { if (p) gsap.set(p, { opacity: 0 }); });

    const tl = gsap.timeline({
      onComplete: () => { if (onComplete) onComplete(); }
    });

    /* ════════════════════════════════════════════════════════════════
       PHASE 1 — Hen walks in from RIGHT → centre  (0 → 1.4s)
    ════════════════════════════════════════════════════════════════ */
    tl.to(henRef.current,
      { x: 0, opacity: 1, duration: 1.1, ease: 'power2.out' }, 0
    );
    // Walking body bob during entry
    tl.to(henBodyRef.current,
      { y: -7, duration: 0.19, ease: 'sine.inOut', yoyo: true, repeat: 11 }, 0
    );
    // Hen settles — proud shake
    tl.to(henBodyRef.current, { y: 0, duration: 0.12 }, 1.12);
    tl.to(henRef.current,
      { rotation: 1.8, duration: 0.2, ease: 'sine.inOut', yoyo: true, repeat: 2 }, 1.14
    );
    tl.to(henRef.current, { rotation: 0, duration: 0.12 }, 1.54);

    /* ════════════════════════════════════════════════════════════════
       PHASE 2 — Egg appears from BEHIND hen (hen rear = right side)
       Starts small, rolls out forward  (1.6 → 2.8s)
    ════════════════════════════════════════════════════════════════ */
    // Hen squats slightly
    tl.to(henBodyRef.current,
      { y: 12, scaleY: 0.88, duration: 0.3, ease: 'power1.inOut' }, 1.6
    );
    // Subtle strain jitter
    tl.to(henRef.current,
      { x: '+=4', duration: 0.09, ease: 'power1.inOut', yoyo: true, repeat: 3 }, 1.92
    );

    // Egg fades in small, behind hen (zIndex 3), at hen's rear (right side)
    tl.to(eggRef.current, { opacity: 1, duration: 0.2 }, 2.05);

    // Egg rolls out forward+down — grows as it clears hen's body
    tl.to(eggRef.current, {
      x: 0, y: 80, scale: 0.75,
      duration: 0.55, ease: 'power2.out'
    }, 2.1);

    // Hen stands back up proud
    tl.to(henBodyRef.current,
      { y: 0, scaleY: 1, duration: 0.3, ease: 'back.out(1.8)' }, 2.65
    );
    tl.to(henBodyRef.current,
      { rotation: -5, duration: 0.2, ease: 'sine.inOut', yoyo: true, repeat: 1 }, 2.8
    );

    // Shadow appears under egg
    tl.to(eggShadRef.current, { opacity: 0.22, duration: 0.3 }, 2.2);

    /* ════════════════════════════════════════════════════════════════
       PHASE 3 — Hen exits LEFT  (3.0 → 3.8s)
    ════════════════════════════════════════════════════════════════ */
    // Walking bob resumes
    tl.to(henBodyRef.current,
      { y: -7, duration: 0.19, ease: 'sine.inOut', yoyo: true, repeat: 9 }, 3.0
    );
    tl.to(henRef.current,
      { x: '-110vw', opacity: 0, duration: 0.95, ease: 'power2.in' }, 3.0
    );

    /* ════════════════════════════════════════════════════════════════
       PHASE 4 — Egg moves to exact screen centre, grows cinematic
       (3.3 → 4.2s)
    ════════════════════════════════════════════════════════════════ */
    // Egg rises to screen centre — eggRef at top:18%, moving y:35vh lands at ~53% from top
    tl.to(eggRef.current, {
      y: '35vh', scale: 1.25,
      duration: 0.7, ease: 'power2.inOut'
    }, 3.3);
    tl.to(eggShadRef.current, { opacity: 0, duration: 0.4 }, 3.3);

    // Natural wobble after settling
    tl.to(eggRef.current, { rotation: -4, duration: 0.16, ease: 'power2.out' }, 4.05);
    tl.to(eggRef.current, { rotation: 3, duration: 0.13 }, 4.21);
    tl.to(eggRef.current, { rotation: 0, duration: 0.1 }, 4.34);

    // Anticipation glow
    tl.to(glowRef.current,
      { opacity: 0.4, scale: 1.1, duration: 0.45, ease: 'power2.out' }, 4.1
    );

    /* ════════════════════════════════════════════════════════════════
       PHASE 5 — Crack: 3 elegant knocks  (4.5 → 5.8s)
    ════════════════════════════════════════════════════════════════ */
    // Knock 1
    tl.to(eggRef.current,
      { x: -7, rotation: -4, duration: 0.07, yoyo: true, repeat: 1 }, 4.5
    );
    tl.to(c1.current,
      { strokeDashoffset: 0, opacity: 1, duration: 0.22, ease: 'power3.out' }, 4.64
    );
    // Knock 2
    tl.to(eggRef.current,
      { x: 8, rotation: 5, duration: 0.08, yoyo: true, repeat: 1 }, 5.05
    );
    tl.to(c2.current,
      { strokeDashoffset: 0, opacity: 1, duration: 0.2, ease: 'power3.out' }, 5.19
    );
    // Knock 3 — violent
    tl.to(eggRef.current,
      { x: -9, rotation: -6, duration: 0.07, yoyo: true, repeat: 1 }, 5.5
    );
    tl.to(c3.current,
      { strokeDashoffset: 0, opacity: 1, duration: 0.16 }, 5.64
    );
    tl.to(eggRef.current,
      { scaleX: 1.3, scaleY: 0.7, duration: 0.1, ease: 'power3.in', yoyo: true, repeat: 1 }, 5.7
    );

    /* ════════════════════════════════════════════════════════════════
       PHASE 6 — Shell shatters + glow  (5.85 → 6.6s)
    ════════════════════════════════════════════════════════════════ */
    tl.to(eggSvgRef.current, { opacity: 0, duration: 0.12 }, 5.85);
    // Glow expands
    tl.to(glowRef.current,
      { scale: 4.5, opacity: 0.85, duration: 0.3, ease: 'power3.out' }, 5.82
    );
    tl.to(glowRef.current,
      { scale: 7, opacity: 0, duration: 0.5, ease: 'power2.in' }, 6.12
    );
    // Shell pieces removed

    /* ════════════════════════════════════════════════════════════════
       PHASE 7 — Logo reveal  (5.95 → 7.2s)
    ════════════════════════════════════════════════════════════════ */
    // Particles burst
    partRefs.current.forEach((p, i) => {
      if (!p) return;
      const a = (i / partRefs.current.length) * 360;
      const r = a * Math.PI / 180;
      const d = 60 + (i % 4) * 20;
      tl.fromTo(p,
        { x: 0, y: 0, scale: 0, opacity: 0.95 },
        { x: Math.cos(r)*d, y: Math.sin(r)*d - 15,
          scale: 0.45+(i%3)*0.3, opacity: 0,
          duration: 0.8+(i%3)*0.15, ease: 'power2.out' }, 5.96
      );
    });
    // Logo pops in
    tl.to(logoRef.current,
      { scale: 1, opacity: 1, duration: 0.62, ease: 'back.out(1.9)' }, 6.0
    );
    // Warm glow ring behind logo
    tl.fromTo(logoRef.current,
      { filter: 'drop-shadow(0 0 2px rgba(255,180,0,0))' },
      { filter: 'drop-shadow(0 0 28px rgba(255,200,55,0.72))',
        duration: 0.5, ease: 'power2.out' }, 6.22
    );
    tl.to(logoRef.current,
      { filter: 'drop-shadow(0 4px 14px rgba(0,0,0,0.12))',
        duration: 0.9, ease: 'power2.inOut' }, 6.72
    );
    // Shine sweep
    tl.to(shineRef.current,
      { x: '130%', opacity: 0.7, duration: 0.62, ease: 'power2.inOut' }, 6.3
    );
    tl.to(shineRef.current, { opacity: 0, duration: 0.1 }, 6.92);
    // Gentle logo float
    tl.to(logoRef.current,
      { y: -8, duration: 0.85, ease: 'sine.inOut', yoyo: true, repeat: 2 }, 6.85
    );

    /* ════════════════════════════════════════════════════════════════
       PHASE 8 — Text  (6.25 → 7.0s)
    ════════════════════════════════════════════════════════════════ */
    tl.to(textRef.current,
      { y: 0, opacity: 1, letterSpacing: '0.05em',
        duration: 0.52, ease: 'power3.out' }, 6.25
    );
    tl.to(tagRef.current,
      { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }, 6.72
    );

    // Hold 2s → fade out
    tl.to({}, { duration: 2.0 }, 7.6);
    tl.to(wrapRef.current,
      { opacity: 0, y: -22, duration: 0.52, ease: 'power2.inOut' }, 9.6
    );

  }, { scope: wrapRef });

  const PARTS = 14;

  return (
    <div ref={wrapRef} style={{
      position: 'fixed', inset: 0, zIndex: 100, overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(168deg, #FFFDF5 0%, #FFF9E5 42%, #FEF3C7 78%, #FDE68A 100%)',
    }}>
      {/* ambient soft glows */}
      <div style={{
        position:'absolute', top:'-6%', left:'-6%',
        width:380, height:380, borderRadius:'50%',
        background:'rgba(255,238,145,0.22)', filter:'blur(72px)', pointerEvents:'none'
      }} />
      <div style={{
        position:'absolute', bottom:'-6%', right:'-6%',
        width:360, height:360, borderRadius:'50%',
        background:'rgba(253,215,88,0.20)', filter:'blur(66px)', pointerEvents:'none'
      }} />
      {/* cinematic vignette */}
      <div style={{
        position:'absolute', inset:0, pointerEvents:'none',
        background:'radial-gradient(ellipse at 50% 50%, transparent 48%, rgba(155,108,18,0.14) 100%)'
      }} />

      {/* ══════════════════════════════════════════════════════════════
          HEN  — centred vertically in lower half, walks R→L
      ══════════════════════════════════════════════════════════════ */}
      <div ref={henRef} style={{
        position:'absolute',
        top:'15%', left:'50%',
        transform:'translateX(-50%)',
        width: 200,
        zIndex: 5,
        transformOrigin: 'bottom center',
      }}>
        <div ref={henBodyRef} style={{ transformOrigin:'bottom center' }}>
          {/* Shadow under hen */}
          <div style={{
            position:'absolute', bottom:-2, left:'50%',
            transform:'translateX(-50%)',
            width:145, height:14, borderRadius:'50%',
            background:'rgba(90,60,12,0.18)', filter:'blur(8px)',
          }} />
          <img src={henImg} alt="Farm Hen" style={{
            width:'100%', objectFit:'contain', display:'block',
            transformOrigin:'bottom center',
          }} />
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          EGG — starts behind hen (zIndex 3), small, at hen's rear
          Hen faces left so rear = right side → x:55 offset
      ══════════════════════════════════════════════════════════════ */}
      <div ref={eggRef} style={{
        position:'absolute',
        top:'18%', left:'50%',
        /* GSAP.set positions: scale:0.28 x:60 y:60 = small, at hen's rear-right */
        zIndex: 3,    /* BEHIND the hen (zIndex 5) */
      }}>
        {/* Egg SVG */}
        <div ref={eggSvgRef} style={{ position:'relative' }}>
          <svg width="100" height="126" viewBox="0 0 100 126"
            style={{ display:'block', filter:'drop-shadow(0 10px 22px rgba(170,130,20,0.30))' }}>
            <defs>
              <radialGradient id="eggBody" cx="34%" cy="25%" r="74%">
                <stop offset="0%"   stopColor="#FFFFFF" />
                <stop offset="35%"  stopColor="#FFFEF5" />
                <stop offset="80%"  stopColor="#F4EED6" />
                <stop offset="100%" stopColor="#E5CE80" />
              </radialGradient>
              <radialGradient id="eggSpec" cx="26%" cy="20%" r="30%">
                <stop offset="0%"   stopColor="rgba(255,255,255,0.95)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0)" />
              </radialGradient>
            </defs>
            <ellipse cx="50" cy="70" rx="40" ry="52" fill="url(#eggBody)" />
            <ellipse cx="50" cy="70" rx="40" ry="52" fill="url(#eggSpec)" />
            <ellipse cx="50" cy="70" rx="40" ry="52" fill="none"
              stroke="rgba(195,178,105,0.28)" strokeWidth="1.2" />
            {/* crack lines — animate via strokeDashoffset */}
            <path ref={c1} d="M50,26 L45,46 L52,54 L46,70"
              fill="none" stroke="rgba(88,58,8,0.72)" strokeWidth="1.8"
              strokeDasharray="80" strokeLinecap="round" />
            <path ref={c2} d="M60,42 L52,54 L60,62 L53,78"
              fill="none" stroke="rgba(88,58,8,0.52)" strokeWidth="1.5"
              strokeDasharray="70" strokeLinecap="round" />
            <path ref={c3} d="M38,50 L46,58 L40,70"
              fill="none" stroke="rgba(88,58,8,0.40)" strokeWidth="1.3"
              strokeDasharray="55" strokeLinecap="round" />
          </svg>
        </div>
        {/* ↑ eggSvgRef closes here — glow/particles/logo must be OUTSIDE it */}

        {/* Warm inner glow — anticipation + reveal */}
        <div ref={glowRef} style={{
          position:'absolute', top:'50%', left:'50%',
          transform:'translate(-50%,-50%)',
          width:150, height:150, borderRadius:'50%',
          background:'radial-gradient(circle, rgba(255,235,90,0.96) 0%, rgba(255,190,40,0.48) 44%, transparent 72%)',
          pointerEvents:'none', zIndex:1,
        }} />

        {/* Particles */}
        {Array.from({ length: PARTS }).map((_, i) => (
          <div key={i} ref={el => { partRefs.current[i] = el; }} style={{
            position:'absolute', top:'50%', left:'50%',
            transform:'translate(-50%,-50%)',
            width: i%3===0?8:i%3===1?6:4,
            height: i%3===0?8:i%3===1?6:4,
            borderRadius:'50%',
            background: i%3===0 ? 'rgba(255,200,48,0.92)' : i%3===1 ? 'rgba(255,230,108,0.85)' : 'rgba(255,250,200,0.8)',
            pointerEvents:'none', zIndex:2,
          }} />
        ))}

      </div>

      {/* Egg shadow */}
      <div ref={eggShadRef} style={{
        position:'absolute', top:'18%', left:'50%',
        transform:'translateX(-50%)',
        width:72, height:11, borderRadius:'50%',
        background:'rgba(90,60,12,0.22)', filter:'blur(5px)',
        zIndex:2,
      }} />

      {/* ══════════════════════════════════════════
          LOGO — true screen centre, independent
          (NOT inside eggRef so it never moves)
      ════════════════════════════════════════════ */}
      <div ref={logoRef} style={{
        position:'absolute', top:'50%', left:'50%',
        transform:'translate(-50%,-50%)',
        width:140, height:140,
        overflow:'hidden', borderRadius:'50%',
        zIndex:12,
      }}>
        <img src={logoImg} alt="Siddipet Poultry Eggs"
          style={{ width:'100%', height:'100%', objectFit:'contain', display:'block' }} />
        <div ref={shineRef} style={{
          position:'absolute', inset:0,
          background:'linear-gradient(108deg, transparent 28%, rgba(255,255,255,0.76) 50%, transparent 72%)',
          pointerEvents:'none',
        }} />
      </div>

      {/* ══════════════════════════════════════════════════════════════
          BRAND TEXT
      ══════════════════════════════════════════════════════════════ */}
      <div style={{
        position:'absolute', bottom:'9%', left:'50%',
        transform:'translateX(-50%)',
        textAlign:'center', zIndex:12, whiteSpace:'nowrap',
      }}>
        <h1 ref={textRef} style={{
          opacity:0, margin:0,
          fontFamily:"'Georgia','Times New Roman',serif",
          fontWeight:800,
          fontSize:'clamp(1.15rem,5vw,1.52rem)',
          color:'#5C3409',
          letterSpacing:'0.18em',
          lineHeight:1.2,
        }}>
          Siddipet Poultry Eggs
        </h1>
        <p ref={tagRef} style={{
          opacity:0, margin:'7px 0 0',
          color:'#8B5E14', fontSize:'0.67rem',
          letterSpacing:'0.18em', fontWeight:700, textTransform:'uppercase',
        }}>
          Farm Fresh · Naturally Nutritious
        </p>
      </div>
    </div>
  );
}
